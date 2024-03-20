using System.Text;
using HackathonWebApi.Entities;

namespace HackathonWebApi.Services
{
    public class MessageService
    {
        private static readonly string BaseQuestion = $"Answer in less than {Config.MaxTokens} tokens. Respond in Json format with the following schema: {GetJsonSchema()}. Provide dates in the format YYYY-MM-dd. Can you give me a workout plan based on the following input: ";
        private static readonly string UserDescription = $". Here is some information about the athlete: ";
        private static readonly string PlanDescription = $". Here are some requirements for the plan: ";

        public static string GetConstructedMessage(UserInput input)
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append(BaseQuestion).Append(input.FreeText).Append(UserDescription).Append($"sport level = {input.Athleticism.ToString()}, ");

            if (input.Age.HasValue)
            {
                stringBuilder.Append($"Their age is {input.Age}, ");
            }
            if (input.Sex.HasValue && input.Sex != Sex.Unknown)
            {
                stringBuilder.Append($"they are {input.Sex.ToString()}, ");
            }

            stringBuilder.Append(PlanDescription).Append($"{input.Frequency} exercise sessions per week, provide {input.Frequency * input.DurationInWeeks} days, start date = {input.StartDate.ToString("dd/MM/yyyy")}, ");

            stringBuilder.Append("Rest days are not calculated into the amount of exercises per week. Do not mention rest days.");
            return stringBuilder.ToString();
        }

        private static string GetJsonSchema()
        {
            return File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\Json\\WorkoutPlan.json");
        }
    }
}
