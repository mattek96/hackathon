using HackathonWebApi.Json;
using HackathonWebApi.Services.Dto;
using OpenAI.Net;
using System.Text.Json;

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
                
                var jsonResponse = response.Result.Choices.FirstOrDefault().Message.Content;
                try
                {
                    var filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\Database\\database.json");
                    File.WriteAllText(filePath, jsonResponse);
                } catch { }
               


                // TODO split into two endpoints
                // post which returns ok or error
                // get which returns plan from db
                var workoutPlan = WorkoutPlanConverter.ConvertFromJson(jsonResponse);

                return new OpenAiResponse(Response: workoutPlan, ErrorMessage: string.Empty);
            }
            
            return new OpenAiResponse(Response: new WorkoutPlan(), ErrorMessage: response.ErrorMessage);
        }
    }
}
