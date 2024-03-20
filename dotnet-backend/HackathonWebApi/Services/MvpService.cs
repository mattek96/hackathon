using Google.Apis.YouTube.v3;
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

        public async Task<string> GetYoutubeVideoAsync(string instruction)
        {
            var youtubeService = new YouTubeService(new Google.Apis.Services.BaseClientService.Initializer()
            {
                ApiKey = "AIzaSyD-NtciOuQ3NvAMIwz4E_6OJrAv868kmsM",
                ApplicationName = "TrAIner"
            });

            var seachListRequest = youtubeService.Search.List("snippet");

            seachListRequest.Q = $"{instruction}";
            seachListRequest.MaxResults = 1;

            var searchResponse = await seachListRequest.ExecuteAsync();

            var videoId = searchResponse.Items.First().Id.VideoId;

            var url = $"https://www.youtube.com/watch?v={videoId}";

            return url;
        }
    }
}
