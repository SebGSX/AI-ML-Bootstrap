# Inference Engine

## Getting Started

### Note to Windows Users

The inference engine code has issues when run on Windows. If developing from Windows, please be sure to install WSL 
and configure your IDEs accordingly.

### Hardware

The inference engine is designed to run on a GPU. The code is written to use the GPU by default. If you do not have a
GPU, you can change the code to use the CPU instead. If using CPU, a model with fewer parameters must be used.

### Operating System

The inference engine is designed to run on Linux. The code is written with PyCharm on Windows, but is run using WSL 2.0
on Windows using a clean Linux Ubuntu 24.04 LTS distribution.

> Remember to ensure that the NVIDIA CUDA Toolkit and drivers are installed on Windows for use by WSL. The NVIDIA 
> CUDA Toolkit will also need to be installed on the Linux distribution. As always, ensure that the operating system is 
> up-to-date before you begin.

### Software

To simplify the process, the following steps are recommended in exact order:
1. Install the NVIDIA CUDA Toolkit, version 12.4. You may run into an error, see the guidance within
   [this article](https://askubuntu.com/questions/1491254/installing-cuda-on-ubuntu-23-10-libt5info-not-installable) 
   to resolve the issue.
2. Ensure that Python 3.12 and pip are installed.
3. Install `venv` and create the `inference_engine` virtual environment.
4. Install `pytorch` for CUDA 12.4, `tensorflow`, `bitsandbytes`, `accelerate`, `transformers`, `grpcio`, `grpcio-tools`,
   `huggingface_hub`, `pytest`, and `pytest-mock`.

> If `bitsandbyts` causes issues, you may need to use the process documented within
> [this article](https://huggingface.co/docs/bitsandbytes/main/en/installation) to compile and install the package.

The commands used for PyTorch and TensorFlow as well as the remaining packages are as follows:

```shell
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
pip3 install tensorflow
pip3 install bitsandbytes accelerate transformers grpcio grpcio-tools huggingface_hub pytest pytest-mock
```

#### References

- [NVIDIA CUDA Toolkit 12.4 Installation](https://developer.nvidia.com/cuda-12-4-0-download-archive)
- [Python Virtual Environments](https://docs.python.org/3/library/venv.html)
- [PyTorch Installation](https://pytorch.org/get-started/locally/)
- [TensorFlow Installation](https://www.tensorflow.org/install)
- [Hugging Face Transformers Installation](https://huggingface.co/docs/transformers/installation)

## Tests

Tests are provided to make changing the code easier, which facilitates learning activities.

## Maintenance

### gRPC

From time-to-time, the gRPC code will need to be regenerated. The code is generated using the `protoc` tool. The 
following command will generate the code:

```shell
python -m grpc_tools.protoc --proto_path=. --python_out=. --grpc_python_out=. inference_engine.proto
```
