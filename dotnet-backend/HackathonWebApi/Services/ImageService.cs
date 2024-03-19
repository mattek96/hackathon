using OpenAI.Net;

namespace HackathonWebApi.Services
{
    public class ImageService(IOpenAIService openAi)
    {
        public async Task<string> GetImageforInstrucion(string instruction) 
        {
            var imageResponseRequest = await openAi.Images.Generate(instruction, options => {
                options.N = 1;
                options.Size = "512x512";
            });

            if (imageResponseRequest.IsSuccess && imageResponseRequest.Result is not null)
            {
                return imageResponseRequest.Result.Data.First().Url;
            }

            return string.Empty;
        }
    }
}
