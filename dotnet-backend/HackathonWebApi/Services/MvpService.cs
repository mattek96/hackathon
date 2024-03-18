using HackathonWebApi.Services.Dto;
using OpenAI.Net;

namespace HackathonWebApi.Services
{
    public class MvpService(IOpenAIService openAi)
    {
        public async Task<OpenAiResponse> GetOpenAiResponseDtoAsync(string text)
        {
            var response = await openAi.Chat.Get(text, o => { o.MaxTokens = Config.MaxTokens; });

            if (response.IsSuccess)
            {
                return new OpenAiResponse(Response: response.Result.Choices[0].Message.Content);
            }
            
            return new OpenAiResponse(response.ErrorMessage);
        }
    }
}
