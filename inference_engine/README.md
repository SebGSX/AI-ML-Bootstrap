# Inference Engine

## Getting Started

### Note to Windows Users

The inference engine code has issues when run on Windows. If developing from Windows, please be sure to install WSL 
and configure your IDEs accordingly.

### Hardware

The inference engine is designed to run on a GPU. The code is written to use the GPU by default. If you do not have a
GPU, you can change the code to use the CPU instead. If using CPU, a model with fewer parameters must be used.

### Operating System

The inference engine is designed to run on Linux. The code is written in PyCharm on Windows, but is run using WSL 2.0
on Windows using the Linux Ubuntu 24.04 LTS distribution.

> Remember to ensure that the NVIDIA CUDA Toolkit and drivers are installed on Windows for use by WSL. The NVIDIA 
> CUDA Toolkit will also need to be installed on the Linux distribution. As always, ensure that the operating system is 
> up-to-date before you begin.

### Software

The `bitsandbytes` package is essential for CUDA; however, it is quite challenging to install. Getting the package to 
work with the NVIDIA CUDA Toolkit will take some time and will cause frustration. My apologies, there is no alternative 
to the package, unfortunately.

To simplify the process, the following steps are recommended in exact order:
1. Install the NVIDIA CUDA Toolkit, version 12.4.
2. Install `nvcc`, which is found in the `nvidia-cuda-toolkit` that is installed in addition to the component 
   installed at step 1.
3. Create then activate the `inference_engine` virtual environment using `conda`. Be sure to add the following channels:
   - `conda-forge`
   - `huggingface`
   - `nvidia`
4. Install `pytorch` for CUDA 12.4, `tensorflow-gpu` for CUDA 12.4, `bitsandbytes`, `accelerate`, `transformers[torch]`,
   `grpcio`, `grpcio-tools`, `pytest`, and `pytest-mock`.

> If `bitsandbyts` causes issues, you may need to use the process documented at step 4 within
> [this article](https://www.jetson-ai-lab.com/tutorial_comfyui_flux.html) to compile and install the `bitsandbytes` 
> package.

The commands used for PyTorch and TensorFlow are as follows:

```shell
conda install pytorch torchvision torchaudio pytorch-cuda=12.4 -c pytorch -c nvidia
conda install tensorflow-gpu cudatoolkit=12.4
```

## Tests

Tests are provided to make changing the code easier, which facilitates learning activities.

## Maintenance

### gRPC

From time-to-time, the gRPC code will need to be regenerated. The code is generated using the `protoc` tool. The 
following command will generate the code:

```shell
python -m grpc_tools.protoc --proto_path=. --python_out=. --grpc_python_out=. inference_engine.proto
```
