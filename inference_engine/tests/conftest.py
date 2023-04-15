# © 2023 Seb Garrioch. All rights reserved.
# Published under the MIT License.
import os
import sys


_module_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../'))
sys.path.insert(0, _module_dir)
_module_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../scripts/'))
sys.path.insert(0, _module_dir)
