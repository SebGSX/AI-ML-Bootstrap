/*
 * © 2025 Seb Garrioch. All rights reserved.
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

builder.Services.Configure<ApiBehaviorOptions>(options => { options.SuppressModelStateInvalidFilter = true; });

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc(builder.Configuration["Swagger:Configuration:Version"], new OpenApiInfo
    {
        Description = builder.Configuration["Swagger:Configuration:Description"],
        Title = builder.Configuration["Swagger:Configuration:Title"],
        Version = builder.Configuration["Swagger:Configuration:Version"],
        Contact = new OpenApiContact
        {
            Name = builder.Configuration["Swagger:Configuration:Contact:Name"],
            Url = new Uri(builder.Configuration["Swagger:Configuration:Contact:Url"]!)
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

await app.RunAsync();