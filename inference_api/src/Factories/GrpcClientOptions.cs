/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using System.Diagnostics.CodeAnalysis;

namespace InferenceApi.Factories;

/// <summary>
///     An <see cref="GrpcClientOptions" /> representing configuration options for a gRPC client.
/// </summary>
[ExcludeFromCodeCoverage]
public class GrpcClientOptions
{
    /// <summary>
    ///     A <see cref="Uri" /> representing the address used to communicate with a gRPC client.
    /// </summary>
    public Uri Endpoint { get; set; } = null!;
}