using HackathonWebApi.Json;
using Microsoft.AspNetCore.Mvc;
using OpenAI.Net;

namespace HackathonWebApi.Services
{
    public class MvpService(IOpenAIService openAi)
    {
        private readonly string filePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\Database\\database.json");

        public WorkoutPlan? GetWorkoutPlan()
        {
            try
            {
                return WorkoutPlanConverter.ConvertFromJson(File.ReadAllText(filePath));
            }
            catch
            {

            }

            return null;
        }

        public async Task<ObjectResult> CreateWorkoutPlan(string text)
        {
            var response = await openAi.Chat.Get(text, o =>
            {
                o.MaxTokens = Config.MaxTokens;
                o.ResponseFormat = new ChatResponseFormatType { Type = "json_object" };
            }
            );

            if (response.IsSuccess)
            {
                var jsonResponse = response.Result.Choices.FirstOrDefault().Message.Content;

                try
                {
                    File.WriteAllText(filePath, jsonResponse);
                    return new OkObjectResult(new OkResult());
                }
                catch (Exception e)
                {
                    return new ObjectResult(e.Message);
                }
            }
            else {

                return new ObjectResult(response.ErrorMessage);
            }
        }
    }
}
