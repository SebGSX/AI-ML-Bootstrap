# © 2023 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import grpc
import pytest
import torch
from pytest_mock import MockerFixture
from scripts import inference_engine_pb2, InferenceServicer, ModelConfiguration, StoppingWordsCriteria
from transformers import PreTrainedModel, PreTrainedTokenizer


class TestModelConfiguration:
    """Tests ModelConfiguration."""

    def test_model_configuration_is_invalid(self):
        """Tests that ModelConfiguration raises an error when invalid."""

        # Arrange
        cache_dir_empty: str = ""

        # Act & Assert
        with pytest.raises(ValueError, match="The cache_dir parameter must contain a value."):
            ModelConfiguration(cache_dir_empty)

    def test_model_configuration_is_valid(self):
        """Tests that ModelConfiguration raises no errors when valid."""

        # Arrange
        ai_id: str = "<bot>"
        cache_dir: str = "some/cache/dir"
        human_id: str = "<human>"
        model_name: str = "togethercomputer/GPT-NeoXT-Chat-Base-20B"

        # Act
        model_config: ModelConfiguration = ModelConfiguration(cache_dir)

        # Assert
        assert model_config.AI_ID == ai_id
        assert model_config.cache_dir == cache_dir
        assert model_config.HUMAN_ID == human_id
        assert model_config.MODEL_NAME == model_name


class TestStoppingWordsCriteria:
    """Tests StoppingWordsCriteria."""

    @staticmethod
    def arrange_stopping_words_criteria(
            tokenizer_decode_return_value: str,
            mocker: MockerFixture) -> StoppingWordsCriteria:
        """Arranges a StoppingWordsCriteria object.
        :param tokenizer_decode_return_value: A string representing the return value from the mocked tokenizer.decode()
        method.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        :returns: A StoppingWordsCriteria representing the arranged class for testing.
        """

        tokenizer_mock: PreTrainedTokenizer = mocker.Mock(spec=PreTrainedTokenizer)
        tokenizer_mock.decode.return_value = tokenizer_decode_return_value
        return StoppingWordsCriteria(tokenizer_mock, ["<human>"])

    def test_stopping_words_criteria_call_returns_false(self, mocker: MockerFixture):
        """Tests that StoppingWordsCriteria__call__ returns false when no stopping words are encountered.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        """

        # Arrange
        stopping_words_criteria: StoppingWordsCriteria = self.arrange_stopping_words_criteria("<animal>", mocker)
        input_ids: torch.tensor = torch.tensor([[1, 2, 3], [4, 5, 6]])
        scores: torch.tensor = torch.tensor([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]])

        # Act
        result: bool = stopping_words_criteria(input_ids, scores)

        # Assert
        assert result is False

    def test_stopping_words_criteria_call_returns_true(self, mocker: MockerFixture):
        """Tests that StoppingWordsCriteria__call__ returns true when a stopping word is encountered.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        """

        # Arrange
        stopping_words_criteria: StoppingWordsCriteria = self.arrange_stopping_words_criteria("<human>", mocker)
        input_ids: torch.tensor = torch.tensor([[1, 2, 3], [4, 5, 6]])
        scores: torch.tensor = torch.tensor([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]])

        # Act
        result: bool = stopping_words_criteria(input_ids, scores)

        # Assert
        assert result is True


class TestInferenceServicer:
    """Tests InferenceServicer."""

    @staticmethod
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

    def test_get_response_when_not_running(self, mocker: MockerFixture):
        """Tests that InferenceServicer.GetResponse aborts servicer context when not running.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        """

        # Arrange
        inference_servicer: InferenceServicer = self.arrange_inference_servicer(mocker)
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

    def test_get_response_when_running(self, mocker: MockerFixture):
        """Tests that InferenceServicer.GetResponse returns inference_engine_pb2.Response when running.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        """

        # Arrange
        inference_servicer: InferenceServicer = self.arrange_inference_servicer(mocker)
        inference_servicer.is_running = True

        request: inference_engine_pb2.Request = inference_engine_pb2.Request(text="Hi AI!")
        response_expected: str = "Hi!"
        servicer_context_mock = mocker.MagicMock(spec=grpc.ServicerContext)

        inference_servicer._tokenizer.decode.return_value = response_expected

        # Act
        response_received: inference_engine_pb2.Response = inference_servicer.GetResponse(request, servicer_context_mock)

        # Assert
        assert response_received.text == response_expected

    def test_run_raises_error_with_invalid_port(self, mocker: MockerFixture):
        """Tests that InferenceServicer.run() raises an error with an invalid port number.
        :param mocker: A MockerFixture representing the fixture used to create mocks.
        """

        # Arrange
        inference_servicer: InferenceServicer = self.arrange_inference_servicer(mocker)

        # Act and Assert
        with pytest.raises(ValueError):
            inference_servicer.run(80)

    def test_run_succeeds_with_valid_port(self, mocker):
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

    def test_shutdown(self, mocker: MockerFixture):
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
