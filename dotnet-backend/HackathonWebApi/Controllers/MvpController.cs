using HackathonWebApi.Entities;
using HackathonWebApi.Services;
using HackathonWebApi.Services.Dto;
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

        [HttpPost]
        public async Task<OpenAiResponse> GetOpenAiResponseAsync([FromBody] UserInput input)
        {
            return await exampleService.GetOpenAiResponseDtoAsync(MessageService.GetConstructedMessage(input));
        }
    }
}
