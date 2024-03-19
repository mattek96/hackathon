using HackathonWebApi.Entities;
using HackathonWebApi.Json;
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

        [HttpGet]
        public  WorkoutPlan GetWorkoutPlan()
        {
            return exampleService.GetWorkoutPlan();
        }

        [HttpPost]
        public async Task<ObjectResult> CreateWorkoutPlan([FromBody] UserInput input)
        {
            return await exampleService.CreateWorkoutPlan(MessageService.GetConstructedMessage(input));
        }
    }
}
