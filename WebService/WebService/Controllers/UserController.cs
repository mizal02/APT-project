using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebService.Models;
using WebService.Persistance;
using WebService.Services;

namespace WebService.Controllers
{
    [Route("/api/users/")]
    public class UserController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly JwtHandler _jwtHandler;

        public UserController(DataContext dataContext, JwtHandler jwtHandler)
        {
            _dataContext = dataContext;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterUser(string email, string password, string username)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == email || x.Username == username);
            if (user != null)
                throw new Exception("User with this email/username already exists");
           
            user = new User("user", username, email, password);
            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            return Created($"/users/{email}", null);
        }

        [HttpPost("deactive/{id}")]
        public async Task<IActionResult> DeactiveUser(Guid id)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Id == id);
            if (user == null)
                throw new Exception("User does not exist");
            user.DeactiveUser();
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("login")]
        public async Task<object> Login(string username, string password)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Username == username);
            if (user == null || user.Password != password)
                throw new Exception("Invalid credentials");
            var token = _jwtHandler.CreateToken(user.Id, user.Role, username);
            return new
            {
                Token = token,
                Role = user.Role
            };
        }
    }
}
