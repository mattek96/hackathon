using OpenAI.Net;
using OpenAI.Net.Models.Responses;

namespace HackathonWebApi.Example
{
    public class MvpService(IOpenAIService openAi)
    {
        private static readonly string[] possibleValues = [ "Example", "Beispiel", "Exemple", "Ejemplar" ];
        private static readonly Random random = new Random(DateTime.Now.Millisecond);

        public async Task<OpenAiResponse> GetOpenAiResponseDtoAsync(string text)
        {
            var response = await openAi.Chat.Get(text);

            if (response.IsSuccess)
            {
                return new OpenAiResponse(Response: response.Result.Choices[0].Message.Content);
            }
            
            return new OpenAiResponse(response.ErrorMessage);
        }
    }
}
