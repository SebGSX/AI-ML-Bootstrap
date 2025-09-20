# © 2025 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import torch

from pytest_mock import MockerFixture
from src.servicer import StoppingWordsCriteria
from transformers import PreTrainedTokenizer


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


def test_stopping_words_criteria_call_returns_false(mocker: MockerFixture):
    """Tests that StoppingWordsCriteria__call__ returns false when no stopping words are encountered.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    stopping_words_criteria: StoppingWordsCriteria = arrange_stopping_words_criteria("<animal>", mocker)
    input_ids: torch.LongTensor = torch.LongTensor([[1, 2, 3], [4, 5, 6]])
    scores: torch.FloatTensor = torch.FloatTensor([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]])

    # Act
    result: bool = stopping_words_criteria(input_ids, scores)

    # Assert
    assert result is False


def test_stopping_words_criteria_call_returns_true(mocker: MockerFixture):
    """Tests that StoppingWordsCriteria__call__ returns true when a stopping word is encountered.
    :param mocker: A MockerFixture representing the fixture used to create mocks.
    """

    # Arrange
    stopping_words_criteria: StoppingWordsCriteria = arrange_stopping_words_criteria("<human>", mocker)
    input_ids: torch.LongTensor = torch.LongTensor([[1, 2, 3], [4, 5, 6]])
    scores: torch.FloatTensor = torch.FloatTensor([[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]])

    # Act
    result: bool = stopping_words_criteria(input_ids, scores)

    # Assert
    assert result is True
