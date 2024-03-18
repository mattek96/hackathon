using System.Text;
using HackathonWebApi.Entities;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace HackathonWebApi.Services
{
    public class MessageService
    {
        private static readonly string BaseQuestion = $"Answer in less than {Config.MaxTokens} tokens. Respond in Json format with the following schema: {GetJsonSchema()}. Can you give me a one month workout plan based on the following input: ";
        private static readonly string UserDescription = $". Here is some information about the athlete: ";
        private static readonly string PlanDescription = $". Here are some requirements for the plan: ";

        public static string GetConstructedMessage(UserInput input)
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append(BaseQuestion).Append(input.FreeText).Append(UserDescription).Append($"sport level = {input.Athleticism.ToString()}, ");

            if (input.Age.HasValue)
            {
                stringBuilder.Append($"age = {input.Age}, ");
            }
            if (input.Sex.HasValue)
            {
                stringBuilder.Append($"gender = {input.Sex.ToString()} ");
            }

            stringBuilder.Append(PlanDescription).Append($"{input.Frequency} exercise sessions per week, start date = {input.StartDate.ToString("dd/MM/yyyy")}, ");

            if (input.DurationInWeeks.HasValue)
            {
                stringBuilder.Append($"duration in weeks = {input.DurationInWeeks} ");
            }

            return stringBuilder.ToString();
        }

        private static string GetJsonSchema()
        {
            return File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\Json\\WorkoutPlan.json");
        }
    }
}
