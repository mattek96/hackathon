using Newtonsoft.Json;

namespace HackathonWebApi.Json
{
    public class Exercise
    {
        public string? Instruction { get; set; }
    }

    public class Day
    {
        public string? Date { get; set; }
        public List<Exercise>? Exercises { get; set; }
    }

    public class WorkoutPlan
    {
        public List<Day>? Days { get; set; }
    }

    public static class WorkoutPlanConverter
    {
        public static WorkoutPlan? ConvertFromJson(string json)
        {
            return JsonConvert.DeserializeObject<WorkoutPlan>(json);
        }
    }
}
