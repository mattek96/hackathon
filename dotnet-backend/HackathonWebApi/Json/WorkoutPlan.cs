using Newtonsoft.Json;
using System.Collections.Generic;

namespace HackathonWebApi.Json
{
    public class Exercise
    {
        public string Instruction { get; set; }
    }

    public class Workout
    {
        public string Date { get; set; }
        public List<Exercise> Exercises { get; set; }
    }

    public class WorkoutPlan
    {
        public List<Workout> Workouts { get; set; }
    }

    public static class WorkoutPlanConverter
    {
        public static WorkoutPlan ConvertFromJson(string json)
        {
            return JsonConvert.DeserializeObject<WorkoutPlan>(json);
        }
    }
}
