# © 2024 Seb Garrioch. All rights reserved.
# Published under the MIT License.

class ModelConfiguration:
    """Represents a model's configuration."""

    AI_ID: str = "<bot>"
    """A string representing the token used to identify an AI participant."""

    HUMAN_ID: str = "<human>"
    """A string representing the token used to identify a human participant."""

    MODEL_NAME: str = "togethercomputer/GPT-NeoXT-Chat-Base-20B"
    """A string constant representing the model's name."""

    cache_dir: str = None
    """A string representing the name and location of the cache directory used to cache model data."""

    def __init__(self, cache_dir: str):
        """Initializes a model configuration.
        :param cache_dir: A string representing the name and location of the cache directory used to cache model data.
        """

        if not cache_dir:
            raise ValueError("The cache_dir parameter must contain a value.")

        self.cache_dir = cache_dir
