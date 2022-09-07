namespace WebService.Models
{
    public class Rental
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double Distance { get; set; }
        public bool IsCompleted { get; set; }
        public TimeSpan CompleteTime => EndTime - StartTime;

        public Rental()
        {
            StartTime = DateTime.Now;
            IsCompleted = false;
        }
    }
}
