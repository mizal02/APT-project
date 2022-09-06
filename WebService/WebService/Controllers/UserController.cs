using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebService.Dto;
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
        public async Task<object> Login([FromBody]Login command)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Username == command.Username);
            if (user == null || user.Password != command.Password)
                throw new Exception("Invalid credentials");
            var token = _jwtHandler.CreateToken(user.Id, user.Role, command.Username);
            return new
            {
                Token = token,
                Role = user.Role
            };
        }
    }
}
