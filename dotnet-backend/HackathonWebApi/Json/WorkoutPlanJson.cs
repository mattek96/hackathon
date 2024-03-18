using System.Text.Json.Serialization;

namespace HackathonWebApi.Json
{
    public class WorkoutPlanJson
    {
        [JsonPropertyName("WorkoutPlan")]
        public WorkoutPlan? Plan { get; set; }

        public record WorkoutPlan
        {
            public Day[]? Days { get; set; }
        }

        public record Day
        {
            public DateTime? Date { get; set; } 
            public string? Instructions { get; set; }
        }
    }
}
