/*
 * © 2023 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

using System.Reflection;
using InferenceApi.Factories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Models;

// Remember to exclude this file, POCOs, and all auto-generated code from coverage on the build server.

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOptions<GrpcClientOptions>().Configure(config =>
{
    config.Endpoint = new Uri(builder.Configuration["InferenceEngine:Endpoint"] ?? string.Empty);
});

builder.Services.AddSingleton<IGrpcClientFactory, GrpcClientFactory>();

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo()
    {
        Description =
            "A bootstrap guide and project to get a curious developer up and running on artificial intelligence and" +
            "machine learning.",
        Title = "AI/ML Bootstrap",
        Version = "v1",
        Contact = new OpenApiContact()
        {
            Name = "Seb Garrioch",
            Url = new Uri("https://github.com/SebGSX/AI-ML-Bootstrap")
        }
    });
    
    options.IncludeXmlComments(
        Path.Combine(AppContext.BaseDirectory,
        $"{Assembly.GetExecutingAssembly().GetName().Name}.xml"));
});

builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(origin => true)
        .AllowCredentials());
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();