/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using System.Net;
using Grpc.Core;
using InferenceApi.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace InferenceApi.UnitTests;

/// <summary>
///     Tests <see cref="InferenceController" />.
/// </summary>
public class InferenceControllerTests
{
    private readonly Mock<IGrpcClientFactory> _grpcClientFactoryMock;
    private readonly InferenceController _inferenceController;

    /// <summary>
    ///     Initialises a new instance of the <see cref="InferenceControllerTests" /> class.
    /// </summary>
    public InferenceControllerTests()
    {
        _grpcClientFactoryMock = new Mock<IGrpcClientFactory>();
        _inferenceController = new InferenceController(
            new Mock<ILogger<InferenceController>>().Object,
            _grpcClientFactoryMock.Object);
    }

    /// <summary>
    ///     Tests that <see cref="InferenceController.PostGetResponse" /> with an empty request returns a bad response.
    /// </summary>
    [Fact]
    public async Task PostGetResponse_WithEmptyRequest_ReturnsBadRequest()
    {
        // Arrange
        var request = new Request { Text = string.Empty };

        // Act
        var result = await _inferenceController.PostGetResponse(request);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        var problemDetails = Assert.IsType<ProblemDetails>(objectResult.Value);
        Assert.Equal("Request text cannot be empty or whitespace.", problemDetails.Detail);
        Assert.Equal((int)HttpStatusCode.BadRequest, problemDetails.Status);
    }

    /// <summary>
    ///     Tests that <see cref="InferenceController.PostGetResponse" /> with a whitespace request returns a bad request
    ///     response.
    /// </summary>
    [Fact]
    public async Task PostGetResponse_WithWhitespaceRequest_ReturnsBadRequest()
    {
        // Arrange
        var request = new Request { Text = "   " };

        // Act
        var result = await _inferenceController.PostGetResponse(request);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        var problemDetails = Assert.IsType<ProblemDetails>(objectResult.Value);
        Assert.Equal("Request text cannot be empty or whitespace.", problemDetails.Detail);
        Assert.Equal((int)HttpStatusCode.BadRequest, problemDetails.Status);
    }

    /// <summary>
    ///     Tests that <see cref="InferenceController.PostGetResponse" /> with a valid request returns an OK response.
    /// </summary>
    [Fact]
    public async Task PostGetResponse_WithValidRequest_ReturnsOk()
    {
        // Arrange
        var metadata = new Metadata();
        var request = new Request { Text = "This is a valid request." };
        var responseExpected = new Response { Text = "This is a valid response." };

        var asyncUnaryCall = new AsyncUnaryCall<Response>(
            Task.FromResult(responseExpected),
            Task.FromResult(metadata),
            () => Status.DefaultSuccess,
            () => metadata,
            () => { });
        var inferenceServiceClientMock = new Mock<InferenceService.InferenceServiceClient>();

        inferenceServiceClientMock
            .Setup(m =>
                m.GetResponseAsync(It.IsAny<Request>(), default, default, default))
            .Returns(asyncUnaryCall);

        _grpcClientFactoryMock
            .Setup(m => m.CreateInferenceEngineClientAsync())
            .ReturnsAsync(() => inferenceServiceClientMock.Object);

        // Act
        var result = await _inferenceController.PostGetResponse(request);

        // Assert
        var okObjectResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<Response>(okObjectResult.Value);
        Assert.Equal(responseExpected.Text, response.Text);
        Assert.Equal((int)HttpStatusCode.OK, okObjectResult.StatusCode);
    }

    /// <summary>
    ///     Tests that <see cref="InferenceController.PostGetResponse" /> that has an exception returns an internal server
    ///     error response.
    /// </summary>
    [Fact]
    public async Task PostGetResponse_WithExceptionThrown_ReturnsInternalServerError()
    {
        // Arrange
        var request = new Request { Text = "This is a valid request." };
        var exceptionMessage = "An error occurred.";
        var exception = new Exception(exceptionMessage);

        _grpcClientFactoryMock.Setup(x => x.CreateInferenceEngineClientAsync()).ThrowsAsync(exception);

        // Act
        var result = await _inferenceController.PostGetResponse(request);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        var problemDetails = Assert.IsType<ProblemDetails>(objectResult.Value);
        Assert.Equal(exceptionMessage, problemDetails.Detail);
        Assert.Equal((int)HttpStatusCode.InternalServerError, problemDetails.Status);
    }

    /// <summary>
    ///     Tests that <see cref="InferenceController.PostGetResponse" /> that has a gRPC error returns an internal server
    ///     error response.
    /// </summary>
    [Fact]
    public async Task PostGetResponse_WithErrorResponse_ReturnsInternalServerError()
    {
        // Arrange
        var request = new Request { Text = "This is a valid request." };
        var statusExpected = new Status(StatusCode.Internal, "An error occurred.");
        var asyncUnaryCall = new AsyncUnaryCall<Response>(
            Task.FromException<Response>(new RpcException(statusExpected)),
            Task.FromResult(new Metadata()),
            () => statusExpected,
            () => new Metadata(),
            () => { });
        var inferenceServiceClientMock = new Mock<InferenceService.InferenceServiceClient>();

        inferenceServiceClientMock
            .Setup(m =>
                m.GetResponseAsync(It.IsAny<Request>(), default, default, default))
            .Returns(asyncUnaryCall);

        _grpcClientFactoryMock
            .Setup(m => m.CreateInferenceEngineClientAsync())
            .ReturnsAsync(() => inferenceServiceClientMock.Object);

        // Act
        var result = await _inferenceController.PostGetResponse(request);

        // Assert
        var objectResult = Assert.IsType<ObjectResult>(result.Result);
        var problemDetails = Assert.IsType<ProblemDetails>(objectResult.Value);
        var status = Assert.IsType<string>(problemDetails.Detail);
        Assert.Equal(statusExpected.ToString(), status);
        Assert.Equal((int)HttpStatusCode.InternalServerError, problemDetails.Status);
    }
}