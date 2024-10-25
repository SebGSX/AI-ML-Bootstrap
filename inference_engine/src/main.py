# © 2024 Seb Garrioch. All rights reserved.
# Published under the MIT License.
from dependency_factory import DependencyFactory
from src.servicer import ModelConfiguration
from grpc import Server
from transformers import PreTrainedModel, PreTrainedTokenizer

if __name__ == "__main__":
    # Get dependencies.
    _grpc_server: Server = DependencyFactory.initialize_grpc_server(24)
    _model_config: ModelConfiguration = ModelConfiguration(".model-cache")
    _model: PreTrainedModel = DependencyFactory.initialize_model(_model_config)
    _tokenizer: PreTrainedTokenizer = DependencyFactory.initialize_tokenizer(_model_config)
    _inference_servicer = DependencyFactory.initialize_inference_servicer(
        _model,
        _tokenizer,
        _model_config,
        _grpc_server)

    # Run service.
    _inference_servicer.run(50000)
