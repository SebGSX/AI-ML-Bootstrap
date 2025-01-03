# © 2024 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import grpc
import signal

from src.engine import inference_engine_pb2, inference_engine_pb2_grpc
from src.servicer.model_configuration import ModelConfiguration
from src.servicer.stopping_words_criteria import StoppingWordsCriteria
from grpc import Server
from transformers import BatchEncoding, PreTrainedModel, PreTrainedTokenizer, StoppingCriteriaList


class InferenceServicer(inference_engine_pb2_grpc.InferenceServiceServicer):
    """Represents an inference servicer."""

    _config: ModelConfiguration
    _grpc_server: Server = None
    _model: PreTrainedModel = None
    _tokenizer: PreTrainedTokenizer = None

    is_running: bool = False
    """A boolean indicating whether the servicer is running."""

    def __init__(
            self,
            model: PreTrainedModel,
            tokenizer: PreTrainedTokenizer,
            config: ModelConfiguration,
            grpc_server: Server):
        """Initializes a new instance of the InferenceServicer class.
        :param model: A PreTrainedModel representing the machine learning model with which to conduct inference.
        :param tokenizer: A PreTrainedTokenizer representing the model's associated tokenizer.
        :param config: A ModelConfiguration representing the model's configuration.
        :param grpc_server: A Server representing the gRPC server.
        """

        self._config = config
        self._grpc_server = grpc_server
        self._model = model
        self._tokenizer = tokenizer

    def GetResponse(self, request: inference_engine_pb2.Request, context: grpc.ServicerContext) \
            -> inference_engine_pb2.Response:
        """Gets a response generated by means of inference from the active model.
        :param request: A Request representing a request for the inference engine.
        :param context: A ServicerContext representing the gRPC context used to handle the request.
        :return: A Response representing a response from the inference engine.
        """

        if not self.is_running:
            context.abort(grpc.StatusCode.UNAVAILABLE, "The inference servicer is not running.")
            return inference_engine_pb2.Response()

        request_text: str = f"{self._config.HUMAN_ID}: {request.text}\n{self._config.AI_ID}:"
        inputs: BatchEncoding = self._tokenizer(
            request_text,
            return_tensors="pt").to(self._model.device)

        outputs = self._model.generate(
            **inputs,
            max_new_tokens=100,
            do_sample=False,
            temperature=0.8,
            pad_token_id=self._tokenizer.eos_token_id,
            stopping_criteria=StoppingCriteriaList([StoppingWordsCriteria(
                self._tokenizer,
                [self._config.HUMAN_ID])]))

        response: str = self._tokenizer.decode(outputs[0], skip_special_ids=True)
        response = response.replace(request_text + " ", "")
        response = response.replace("\n" + self._config.HUMAN_ID + ":", "")

        return inference_engine_pb2.Response(text=response)

    def run(self, port: int):
        """Runs the inference servicer.
        :param port: An integer representing the port number to use for the gRPC server.
        """

        if 1024 > port or port > 65535:
            raise ValueError("The port parameter must be greater than 1,023 and less than 65,536")

        self._grpc_server.add_insecure_port(f"[::]:{port}")
        inference_engine_pb2_grpc.add_InferenceServiceServicer_to_server(
            self,
            self._grpc_server)

        def shutdown_signal_handler(*_):
            """Handles shutdown signals.
            :param _: Ignore all parameters.
            """

            print("Shutdown signal received.")
            self.shutdown()

        print("Adding signal handlers...")
        signal.signal(signal.SIGINT, shutdown_signal_handler)
        signal.signal(signal.SIGTERM, shutdown_signal_handler)

        print("Server starting...")
        self._grpc_server.start()

        self.is_running = True

        print("Server started. Press Ctrl+C to stop.")
        self._grpc_server.wait_for_termination()

    def shutdown(self):
        """Gracefully shuts down the inference servicer."""

        print("Shutting down the inference servicer and saving changes to the inference model...")
        self.is_running = False
        self._grpc_server.stop(0)
        print("Shutdown successful.")
