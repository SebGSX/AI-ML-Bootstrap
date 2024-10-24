# © 2024 Seb Garrioch. All rights reserved.
# Published under the MIT License.
from torch import FloatTensor, LongTensor
from transformers import PreTrainedTokenizer, StoppingCriteria
from typing import List

class StoppingWordsCriteria(StoppingCriteria):
    """Represents a words-based stopping criteria that can be applied during generation."""

    def __init__(self, tokenizer: PreTrainedTokenizer, stopping_words: List[str]):
        """Initializes a new instance of the StoppingWordsCriteria class.
        :param tokenizer: A PreTrainedTokenizer representing a model's tokenizer.
        :param stopping_words: A List[str] representing the list of stopping words that are the basis of the criteria.
        """

        self._tokenizer: PreTrainedTokenizer = tokenizer
        self._stopping_words: List[str] = stopping_words
        self._text_stream: str = ""

    def __call__(self, input_ids: LongTensor, scores: FloatTensor, **kwargs: dict[str, any]) -> bool:
        """Checks the input IDs for stopping words.
        :param input_ids: A LongTensor representing the input IDs to check for stopping words.
        :param scores: A FloatTensor representing the scores.
        :param kwargs: A dict[str, any] representing a dictionary of keyword arguments.
        :returns: A boolean indicating whether a stopping word was found in the input IDs.
        """

        self._text_stream += self._tokenizer.decode(input_ids[0, -1])
        for stopping_word in self._stopping_words:
            if stopping_word in self._text_stream:
                return True

        return False
