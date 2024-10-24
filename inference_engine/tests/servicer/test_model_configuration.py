# © 2023 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import pytest

from src.servicer import ModelConfiguration

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
