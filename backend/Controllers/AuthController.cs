using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;

namespace SistemaAsistencia.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(x =>
                    x.Email == request.Email &&
                    x.Password == request.Password
                );


            if(usuario == null)
            {
                return Unauthorized(new
                {
                    mensaje = "Usuario o contraseña incorrectos"
                });
            }



            return Ok(new
            {
                usuario.Id,
                usuario.Nombre,
                usuario.Email,
                usuario.Rol,
                usuario.Foto
            });

        }

    }



    public class LoginRequest
    {

        public string Email { get; set; } = "";

        public string Password { get; set; } = "";

    }


}