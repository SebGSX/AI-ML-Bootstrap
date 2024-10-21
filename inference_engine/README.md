# Inference Engine

## Getting Started

### Note to Windows Users

The inference engine code has issues when run on Windows. If developing from Windows, please be sure to install WSL 
and configure your IDEs accordingly.

### Hardware

The inference engine is designed to run on a GPU. The code is written to use the GPU by default. If you do not have a
GPU, you can change the code to use the CPU instead. If using CPU, a model with fewer parameters must be used.

### Software

The `bitsandbytes` package is essential for CUDA; however, it is quite challenging to install. Getting the package to 
work with the NVIDIA CUDA Toolkit will take some time and will cause frustration. My apologies, there is no alternative 
to the package, unfortunately.

To simplify the process, the following steps are recommended in exact order:
1. Install the NVIDIA CUDA Toolkit, version 12.4.
2. Install `nvcc`.
3. Use the process documented [here](https://www.jetson-ai-lab.com/tutorial_comfyui_flux.html) to install the
   `bitsandbytes` package.
4. Create the `inference_engine` virtual environment using `conda`.
5. Install `pytorch`, `tensorflow[and-cuda]`, `accelerate`, `grpcio`, `transformers[torch]`, `pytest`, and 
   `pytest-mock`.

## Tests

Tests are provided to make changing the code easier, which facilitates learning activities.

## Maintenance

### gRPC

From time-to-time, the gRPC code will need to be regenerated. The code is generated using the `protoc` tool. The 
following command will generate the code:

```shell
python -m grpc_tools.protoc --proto_path=. --python_out=. --grpc_python_out=. inference_engine.proto
```
