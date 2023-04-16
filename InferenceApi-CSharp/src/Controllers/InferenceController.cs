/*
 * © 2023 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using System.Net;
using InferenceApi.Factories;
using Microsoft.AspNetCore.Mvc;

namespace InferenceApi.Controllers;

/// <summary>
/// A controller class used to provide access to the inference engine.
/// </summary>
[ApiController]
[Route("[controller]")]
public class InferenceController : Controller
{
    private readonly IGrpcClientFactory _grpcClientFactory;
    private readonly ILogger<InferenceController> _logger;

    /// <summary>
    /// Initialises a new instance of the <see cref="InferenceController"/> class.
    /// </summary>
    /// <param name="logger">An <see cref="ILogger{T}"/> representing the logger for this class.</param>
    /// <param name="grpcClientFactory">An <see cref="IGrpcClientFactory"/> representing a gRPC client factory used to
    /// create gRPC clients.</param>
    public InferenceController(ILogger<InferenceController> logger, IGrpcClientFactory grpcClientFactory)
    {
        _logger = logger;
        _grpcClientFactory = grpcClientFactory;
    }

    /// <summary>
    /// Gets a response from the inference engine by submitting a textual request.
    /// </summary>
    /// <param name="request">A <see cref="InferenceEngine.Request"/> representing a textual request.</param>
    /// <returns>A <see cref="Task{T}"/> representing the result of the operation.</returns>
    [HttpPost]
    public async Task<ActionResult<InferenceEngine.Response>> PostGetResponse(InferenceEngine.Request request)
    {
        if (request.Text.Trim() == string.Empty)
        {
            return Problem(
                "Request text cannot be empty or whitespace.",
                null,
                (int) HttpStatusCode.BadRequest);
        }
        
        try
        {
            var client = await _grpcClientFactory.CreateInferenceEngineClientAsync();
            return Ok(await client.GetResponseAsync(request));
        }
        catch (Exception e)
        {
            _logger.LogError(0, e, "An exception was thrown: {message}", e.Message);
            return Problem(e.Message);
        }
    }
}