namespace WebService.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public decimal AccountBalance { get; set; }
        public bool IsActive { get; set; }

        public User() { }
        public User(string role, string username, string email, string password)
        {
            Id = Guid.NewGuid();
            Role = role;
            Username = username;
            Email = email;
            Password = password;
            CreatedDate = DateTime.Now;
            AccountBalance = 0;
        }

        public void DeactiveUser()
        {
            IsActive = !IsActive;
        }

        public decimal ChangeAccountBalance(decimal amount)
        {
            if (amount < 0)
                throw new ArgumentException("Amount must be greater than 0");
            if (amount > AccountBalance)
                throw new ArgumentException("Account balance must be greater than amount");

            AccountBalance -= amount;
            return AccountBalance;
        }
    }
}
