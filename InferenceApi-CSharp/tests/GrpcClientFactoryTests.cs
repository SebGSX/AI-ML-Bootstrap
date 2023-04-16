/*
 * © 2023 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

namespace InferenceApiTests;

/// <summary>
/// Tests <see cref="GrpcClientFactory"/>.
/// </summary>
public class GrpcClientFactoryTests
{
    /// <summary>
    /// Tests that <see cref="GrpcClientFactory.CreateInferenceEngineClientAsync"/> returns a new
    /// <see cref="InferenceService.InferenceServiceClient"/>.
    /// </summary>
    [Fact]
    public async Task CreateInferenceEngineClientAsync_ReturnsInferenceServiceClient()
    {
        // Arrange
        var options = Options.Create(new GrpcClientOptions
        {
            Endpoint = new Uri("http://localhost:50001/")
        });
        var grpcClientFactory = new GrpcClientFactory(options);

        // Act
        var result = await grpcClientFactory.CreateInferenceEngineClientAsync();

        // Assert
        Assert.NotNull(result);
        Assert.IsType<InferenceService.InferenceServiceClient>(result);
    }
}