# © 2025 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import grpc
import pytest

from pytest_mock import MockerFixture
from src.servicer import InferenceServicer, ModelConfiguration, StoppingWordsCriteria
from src.engine import inference_engine_pb2
from transformers import PreTrainedModel, PreTrainedTokenizer


def arrange_inference_servicer(mocker: MockerFixture) -> InferenceServicer:
    """Arranges an InferenceServicer object.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    :returns: An InferenceServicer representing the arranged class for testing.
    """

    model_mock = mocker.MagicMock(spec=PreTrainedModel)
    tokenizer_mock = mocker.MagicMock(spec=PreTrainedTokenizer)
    server_mock = mocker.MagicMock(spec=grpc.Server)

    model_config: ModelConfiguration = ModelConfiguration("./some/cache/dir/")

    return InferenceServicer(model_mock, tokenizer_mock, model_config, server_mock)


def test_get_response_when_not_running(mocker: MockerFixture):
    """Tests that InferenceServicer.GetResponse aborts servicer context when not running.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    inference_servicer: InferenceServicer = arrange_inference_servicer(mocker)
    inference_servicer.is_running = False

    request: inference_engine_pb2.Request = inference_engine_pb2.Request(text="Hi AI!")
    servicer_context_mock = mocker.Mock(spec=grpc.ServicerContext)

    # Act
    inference_servicer.GetResponse(request, servicer_context_mock)

    # Assert
    assert not inference_servicer.is_running
    servicer_context_mock.abort.assert_called_once_with(
        grpc.StatusCode.UNAVAILABLE,
        "The inference servicer is not running.")


def test_get_response_when_running(mocker: MockerFixture):
    """Tests that InferenceServicer.GetResponse returns inference_engine_pb2.Response when running.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    inference_servicer: InferenceServicer = arrange_inference_servicer(mocker)
    inference_servicer.is_running = True

    request: inference_engine_pb2.Request = inference_engine_pb2.Request(text="Hi AI!")
    response_expected: str = "Hi!"
    servicer_context_mock = mocker.MagicMock(spec=grpc.ServicerContext)

    inference_servicer._tokenizer.decode.return_value = response_expected

    # Act
    response_received: inference_engine_pb2.Response = inference_servicer.GetResponse(request, servicer_context_mock)

    # Assert
    assert response_received.text == response_expected


def test_run_raises_error_with_invalid_port(mocker: MockerFixture):
    """Tests that InferenceServicer.run() raises an error with an invalid port number.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    inference_servicer: InferenceServicer = arrange_inference_servicer(mocker)

    # Act and Assert
    with pytest.raises(ValueError):
        inference_servicer.run(80)


def test_run_succeeds_with_valid_port(mocker):
    """Tests that InferenceServicer.run() starts the gRPC server with a valid port.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    model_mock = mocker.Mock(spec=PreTrainedModel)
    tokenizer_mock = mocker.Mock(spec=PreTrainedTokenizer)
    server_mock = mocker.Mock(spec=grpc.Server)

    model_config: ModelConfiguration = ModelConfiguration("./some/cache/dir/")

    inference_servicer: InferenceServicer = InferenceServicer(model_mock, tokenizer_mock, model_config, server_mock)

    # Act
    inference_servicer.run(50051)

    # Assert
    assert inference_servicer.is_running
    server_mock.add_insecure_port.assert_called_once_with("[::]:50051")
    server_mock.start.assert_called_once()
    server_mock.wait_for_termination.assert_called_once()


def test_shutdown(mocker: MockerFixture):
    """Tests that InferenceServicer.shutdown() stops the gRPC server.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    model_mock = mocker.Mock(spec=PreTrainedModel)
    tokenizer_mock = mocker.Mock(spec=PreTrainedTokenizer)
    server_mock = mocker.Mock(spec=grpc.Server)

    model_config: ModelConfiguration = ModelConfiguration("./some/cache/dir/")

    inference_servicer: InferenceServicer = InferenceServicer(model_mock, tokenizer_mock, model_config, server_mock)

    # Act
    inference_servicer.shutdown()

    # Assert
    assert not inference_servicer.is_running
    server_mock.stop.assert_called_once()
