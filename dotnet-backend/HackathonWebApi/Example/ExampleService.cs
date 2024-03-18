using OpenAI.Net;

namespace HackathonWebApi.Example
{
    public class ExampleService(IOpenAIService openAi)
    {
        private static readonly string[] possibleValues = [ "Example", "Beispiel", "Exemple", "Ejemplar" ];
        private static readonly Random random = new Random(DateTime.Now.Millisecond);

        public async Task<ExampleDto> GetExampleDtoAsync()
        {
            var response = await openAi.Chat.Get("How long until we reach mars?");

            if (response.IsSuccess)
            {
                foreach (var result in response.Result.Choices)
                {
                    Console.WriteLine(result.Message.Content);
                }
            }
            else
            {
                Console.WriteLine($"{response.ErrorMessage}");
            }

            var randomInt = random.Next(possibleValues.Length);

            return new ExampleDto(possibleValues[randomInt], randomInt);
        }
    }
}
