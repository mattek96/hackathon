using HackathonWebApi.Services;
using OpenAI.Net;

namespace HackathonWebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<MvpService>();
            builder.Services.AddScoped<ImageService>();

            //Add OpenAI API key
            builder.Services.AddOpenAIServices(options =>
            {
                options.ApiKey = builder.Configuration["OpenAI:ApiKey"];
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
