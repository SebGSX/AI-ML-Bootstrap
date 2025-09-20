# Inference SPA (TypeScript and Next.js)

## Getting Started

The inference SPA is built using Next and TypeScript. The project was developed on Windows but should work on Linux 
and should be editable using VS Code. Please ensure that all packages needed are installed using `npm install`.

Once the environment is created and the packages have installed, the project should be ready to run. Once running, 
the project provides a web app that consumes the inference API, which then consumes the inference engine gRPC service.

## Maintenance

If not already installed, install the npm-check-updates package globally:

```shell
npm install -g npm-check-updates
```

To update the packages, the following commands are used:

```shell
npm update npm
npm-check-updates -u
npm install
```

## Testing

Tests are provided to make changing the code easier, which facilitates learning activities.

To run the tests, the following command is used from the `inference-spa` folder:

```shell
npm run test
```

## Running the App

To run the app, the following command is used from the `inference-spa` folder:

```shell
npm run dev
```
