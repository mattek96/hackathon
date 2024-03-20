namespace HackathonWebApi.Entities
{
    public class UserInput
    {
        public required string FreeText { get; set; }
        public SportLevel Athleticism { get; set; } = SportLevel.Beginner;
        public DateTime StartDate { get; set; } = DateTime.Now.AddDays(-5);
        public int? Age { get; set; }
        public Sex? Sex { get; set; }

        public int Frequency { get; set; } = 3;

        public int? DurationInWeeks { get; set; }
    }
}