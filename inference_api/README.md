# Inference API (C# and .NET)

## Getting Started

The inference API is built using .NET 8.0 and C#. The project was developed on Windows but should work on Linux and
should be editable using VS Code. Please ensure that all packages needed are install using `Nuget`.

Once the environment is created and the packages have been installed, the project should be ready to run. Once running,
the project provides a web API that consumes the inference engine gRPC service. This project is consumed by the React
SPA.

## Tests

Tests are provided to make changing the code easier, which facilitates learning activities.

## Exclusions

Scripts needed to automate building, texting, coverage, and containerisation are excluded given that examples of such
are readily available elsewhere.

## Running the API

The `InferenceApi-CSharp/src/Properties/launchSettings.json` file contains the configuration for the API. The API must
be run using the `InferenceApi:https` profile.
