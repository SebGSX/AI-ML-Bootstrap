# Inference Engine
## Getting Started
The inference engine code has issues when run on Windows. If developing from Windows, please be sure to install WSL, place the source code within the Linux distro's file system, and configure your IDEs accordingly.

Assuming that you have the baseline requirements installed (Python, Conda, GPU drivers, etc.), use Conda to recreate the execution environment based on `environment.yml`.

Once the environment is created and the packages have installed, the project should be ready to run. Once running, the project provides a gRPC inference engine that is consumed by the .NET API. The .NET API is then consumed by the React SPA.

## Tests
Tests are provided to make changing the code easier, which facilitates learning activities.

## Exclusions
Scripts needed to automate building, texting, coverage, and containerisation are excluded given that examples of such are readily available elsewhere.