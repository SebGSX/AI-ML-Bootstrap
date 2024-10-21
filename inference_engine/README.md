# Inference Engine

## Getting Started

### General

The inference engine code has issues when run on Windows. If developing from Windows, please be sure to install WSL 
and configure your IDEs accordingly.

Assuming that you have the baseline requirements installed (Python, Conda, GPU drivers, etc.), use Conda to recreate 
the execution environment based on `environment.yml`.

> The command to create the environment is: `conda env create -f environment.yml` run within the project's directory.

Once the environment is created and the packages have installed, the project should be ready to run. Once running, 
the project provides a gRPC inference engine that is consumed by the .NET API. The .NET API is then consumed by the 
React SPA.

## Hardware

The inference engine is designed to run on a GPU. The code is written to use the GPU by default. If you do not have a
GPU, you can change the code to use the CPU instead. If using CPU, a model with fewer parameters must be used.

## Bits and Bytes (BitsAndBytes)

The `bitsandbytes` package is essential for CUDA; however, it is quite challenging to install. Getting the package to 
work with the NVIDIA CUDA Toolkit will take some time and will cause frustration. My apologies, there is no alternative 
to the package, unfortunately. 

## Tests

Tests are provided to make changing the code easier, which facilitates learning activities.
