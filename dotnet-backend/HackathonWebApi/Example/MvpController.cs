using HackathonWebApi.Example;
using Microsoft.AspNetCore.Mvc;

namespace HackathonWebApi.Controllers
{
    [ApiController]
    [Route("/api/Mvp")]
    public class MvpController : ControllerBase
    {
        private readonly MvpService exampleService;

        public MvpController(MvpService openAiResponseService)
        {
            this.exampleService = openAiResponseService;
        }

        [HttpGet]
        public async Task<OpenAiResponse> GetOpenAiResponseAsync(UserInput input)
        {
            return await exampleService.GetOpenAiResponseDtoAsync(input.FreeText);
        }
    }
}
