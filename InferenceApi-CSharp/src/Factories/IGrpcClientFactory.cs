/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using InferenceEngine;

namespace InferenceApi.Factories;

/// <summary>
/// A factory abstraction for a component that can create GrpcClient instances for given endpoints.
/// </summary>
public interface IGrpcClientFactory
{
    /// <summary>
    /// Creates a gRPC client for the inference engine's gRPC inference service.
    /// </summary>
    /// <returns>A <see cref="Task{T}"/> representing inference service client.</returns>
    Task<InferenceService.InferenceServiceClient> CreateInferenceEngineClientAsync();
}