using System.Text;
using HackathonWebApi.Entities;

namespace HackathonWebApi.Services
{
    public class MessageService
    {
        private static readonly string BaseQuestion = $"Answer in less than {Config.MaxTokens}. Respond in Json format with the following schema: {GetJsonSchema()} Can you give me a one month workout plan based on the following input: ";
        public static string GetConstructedMessage(UserInput input)
        {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.Append(BaseQuestion).Append(input.FreeText);
            return stringBuilder.ToString();
        }

        private static string GetJsonSchema()
        {
            return File.ReadAllText(AppDomain.CurrentDomain.BaseDirectory + "..\\..\\..\\Json\\WorkoutPlan.json");
        }
    }
}
