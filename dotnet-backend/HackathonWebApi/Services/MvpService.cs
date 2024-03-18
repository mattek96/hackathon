using HackathonWebApi.Services.Dto;
using OpenAI.Net;

namespace HackathonWebApi.Services
{
    public class MvpService(IOpenAIService openAi)
    {
        public async Task<OpenAiResponse> GetOpenAiResponseDtoAsync(string text)
        {
            var response = await openAi.Chat.Get(text, o => 
                { 
                    o.MaxTokens = Config.MaxTokens;
                    o.ResponseFormat = new ChatResponseFormatType {Type = "json_object" };
                }
            );

            if (response.IsSuccess)
            {
                return new OpenAiResponse(Response: response.Result.Choices.FirstOrDefault().Message.Content);
            }
            
            return new OpenAiResponse(response.ErrorMessage);
        }
    }
}
