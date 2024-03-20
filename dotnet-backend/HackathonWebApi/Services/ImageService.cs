using OpenAI.Net;

namespace HackathonWebApi.Services
{
    public class ImageService(IOpenAIService openAi)
    {
        private const string InstructionMessage =
            "Please generate an image of a person for the following exercise without any text: ";

        public async Task<string> GetImageforInstrucion(string instruction)
        {
            var promptInstruction = InstructionMessage + instruction;
            var imageResponseRequest = await openAi.Images.Generate(promptInstruction, options =>
            {
                options.N = 1;
                options.Size = "256x256";
            });

            if (imageResponseRequest.IsSuccess && imageResponseRequest.Result is not null)
                return imageResponseRequest.Result.Data.First().Url;

            return string.Empty;
        }
    }
}