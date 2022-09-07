using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebService.Dto;
using WebService.Models;
using WebService.Persistance;
using WebService.Services;

namespace WebService.Controllers
{
    [Route("/api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly JwtHandler _jwtHandler;

        public AuthController(DataContext dataContext, JwtHandler jwtHandler)
        {
            _dataContext = dataContext;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] Register command)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Email == command.Email || x.Username == command.Username);
            if (user != null)
                throw new Exception("User with this email/username already exists");

            user = new User("user", command.Username, command.Email, command.Password);
            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            return Created($"/users/{command.Email}", null);
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
        public async Task<IActionResult> Login([FromBody] Login command)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(x => x.Username == command.Username);
            if (user == null || user.Password != command.Password)
                throw new Exception("Invalid credentials");
            var token = _jwtHandler.CreateToken(user.Id, user.Role, command.Username);
            return Ok(new
            {
                Token = token,
                Role = user.Role,
                Username = user.Username,
                Id = user.Id
            });
        }
    }
}
