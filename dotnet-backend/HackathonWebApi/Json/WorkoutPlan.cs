using HackathonWebApi.Services;
using Newtonsoft.Json;

namespace HackathonWebApi.Json
{
    public class Exercise
    {
        public string? Instruction { get; set; }
    }

    public class ExtendedExercise : Exercise
    {
        public string? Url { get; set; }
    }

    public class Day
    {
        public DateOnly? Date { get; set; }
        public List<Exercise>? Exercises { get; set; }
    }

    public class DayWithUrl : Day
    {
        public new List<ExtendedExercise>? Exercises { get; set; }
    }

    public class WorkoutPlanWithUrl : WorkoutPlan
    {
        public new List<DayWithUrl>? Days { get; set; }
    }


    public class WorkoutPlan
    {
        public List<Day>? Days { get; set; }

        public async Task<WorkoutPlanWithUrl> AddUrlToExercises(ImageService imageGenerator)
        {
            var workoutPlanWithUrl = new WorkoutPlanWithUrl();
            if (Days != null)
            {
                workoutPlanWithUrl.Days = new List<DayWithUrl>();
                foreach (var day in Days)
                {
                    var dayWithUrl = new DayWithUrl { Date = day.Date, Exercises = new List<ExtendedExercise>() };
                    if (day.Exercises != null)
                    {
                        foreach (var exercise in day.Exercises)
                        {
                            var extendedExercise = new ExtendedExercise
                            {
                                Instruction = exercise.Instruction,
                                Url = await imageGenerator.GetImageforInstrucion(exercise.Instruction)
                            };
                            dayWithUrl.Exercises.Add(extendedExercise);
                        }
                    }
                    workoutPlanWithUrl.Days.Add(dayWithUrl);
                }
            }
            return workoutPlanWithUrl;
        }
    }

    public static class WorkoutPlanConverter
    {
        public static WorkoutPlan? ConvertFromJson(string json)
        {
            return JsonConvert.DeserializeObject<WorkoutPlan>(json);
        }
    }
}
