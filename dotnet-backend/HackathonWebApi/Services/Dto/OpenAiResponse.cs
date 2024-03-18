using HackathonWebApi.Json;

namespace HackathonWebApi.Services.Dto
{
    public record OpenAiResponse(WorkoutPlan Response, string ErrorMessage);
}
