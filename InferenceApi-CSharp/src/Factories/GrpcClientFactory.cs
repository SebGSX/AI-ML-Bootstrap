/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using Grpc.Net.Client;
using InferenceEngine;
using Microsoft.Extensions.Options;

namespace InferenceApi.Factories;

/// <inheritdoc />
public class GrpcClientFactory : IGrpcClientFactory
{
    private readonly IOptions<GrpcClientOptions> _options;
    
    /// <summary>
    /// Initialises a new instance of the <see cref="GrpcClientFactory"/> class.
    /// </summary>
    /// <param name="options"></param>
    public GrpcClientFactory(IOptions<GrpcClientOptions> options)
    {
        _options = options;
    }
    
    /// <inheritdoc />
    public async Task<InferenceService.InferenceServiceClient> CreateInferenceEngineClientAsync()
    {
        var channel = GrpcChannel.ForAddress(_options.Value.Endpoint.OriginalString);
        var client = new InferenceService.InferenceServiceClient(channel);
        return await Task.FromResult(client);
    }
}