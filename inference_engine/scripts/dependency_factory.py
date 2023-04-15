# © 2023 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import grpc
import multiprocessing
import torch
from concurrent import futures
from grpc import Server
from inference_servicer import InferenceServicer, ModelConfiguration
from transformers import AutoTokenizer, AutoModelForCausalLM, PreTrainedModel, PreTrainedTokenizer


class DependencyFactory:
    """A simple factory for initializing dependencies."""

    @staticmethod
    def initialize_grpc_server(worker_threads: int) -> Server:
        """Initializes a gRPC server.
        :param worker_threads: An integer representing the maximum number of worker threads.
        :returns: A Server representing the gRPC server.
        """

        if 0 > worker_threads or multiprocessing.cpu_count() < worker_threads:
            raise ValueError(
                "The worker_threads parameter must be greater than 0 and less than the maximum CPU threads.")

        return grpc.server(futures.ThreadPoolExecutor(max_workers=worker_threads))

    @staticmethod
    def initialize_inference_servicer(
            model: PreTrainedModel,
            tokenizer: PreTrainedTokenizer,
            model_config: ModelConfiguration,
            grpc_server: Server) -> InferenceServicer:
        """Initializes an inference servicer.
        :param model: A PreTrainedModel representing the machine learning model with which to conduct inference.
        :param tokenizer: A PreTrainedTokenizer representing the model's associated tokenizer.
        :param model_config: A ModelConfiguration representing the model's configuration.
        :param grpc_server: A Server representing the gRPC server.
        :returns: An InferenceServicer representing the servicer.
        """

        if model is None:
            raise ValueError("The model parameter must not be None.")
        if tokenizer is None:
            raise ValueError("The tokenizer parameter must not be None.")
        if model_config is None:
            raise ValueError("The model_config parameter must not be None.")
        if grpc_server is None:
            raise ValueError("The grpc_server parameter must not be None.")

        return InferenceServicer(model, tokenizer, model_config, grpc_server)

    @staticmethod
    def initialize_model(model_config: ModelConfiguration) -> PreTrainedModel:
        """Initializes a model using the configuration provided.
        :param model_config: A ModelConfiguration representing the model's configuration.
        :returns: A PreTrainedModel representing the model.
        """

        if model_config is None:
            raise ValueError("The model_config parameter must not be None.")

        if not torch.cuda.is_available():
            raise EnvironmentError("CUDA is unavailable.")

        print("Model initializing...")

        model: PreTrainedModel = AutoModelForCausalLM.from_pretrained(
            model_config.MODEL_NAME,
            cache_dir=model_config.cache_dir,
            device_map="auto",
            load_in_8bit=True)

        print("Model initialized.")

        return model

    @staticmethod
    def initialize_tokenizer(config: ModelConfiguration) -> PreTrainedTokenizer:
        """Initializes a tokenizer for a model using the model configuration provided.
        :param config: A ModelConfiguration representing the model configuration for which to create a tokenizer.
        :returns: A PreTrainedTokenizer representing the tokenizer.
        """

        print("Tokenizer initializing...")

        tokenizer: PreTrainedTokenizer = AutoTokenizer.from_pretrained(
            config.MODEL_NAME,
            cache_dir=config.cache_dir)

        print("Tokenizer initialized.")

        return tokenizer
