using HackathonWebApi.Entities;
using HackathonWebApi.Json;
using HackathonWebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace HackathonWebApi.Controllers
{
    [ApiController]
    [Route("/api/Mvp")]
    public class MvpController : ControllerBase
    {
        private readonly MvpService exampleService;

        public MvpController(MvpService mvpService)
        {
            this.exampleService = mvpService;
        }

        [HttpGet]
        public WorkoutPlan GetWorkoutPlan()
        {
            return exampleService.GetWorkoutPlan();
        }

        [HttpPost]
        public async Task<ObjectResult> CreateWorkoutPlan([FromBody] UserInput input)
        {
            return await exampleService.CreateWorkoutPlan(MessageService.GetConstructedMessage(input));
        }

        [HttpPost]
        [Route("/api/Mvp/video")]
        public async Task<string> GetYoutubeVideoAsync([FromBody] string instruction)
        {
            return await exampleService.GetYoutubeVideoAsync(instruction);
        }
    }
}
