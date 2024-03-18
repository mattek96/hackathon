using HackathonWebApi.Example;
using Microsoft.AspNetCore.Mvc;

namespace HackathonWebApi.Controllers
{
    [ApiController]
    [Route("/api/Mvp")]
    public class MvpController : ControllerBase
    {
        private readonly MvpService exampleService;

        public MvpController(MvpService exampleService)
        {
            this.exampleService = exampleService;
        }

        [HttpGet]
        public async Task<OpenAiResponse> GetOpenAiResponseAsync()
        {
            return await exampleService.GetOpenAiResponseDtoAsync();
        }
    }
}
