using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;
using SistemaAsistencia.Models;

namespace SistemaAsistencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EmpleadosController(ApplicationDbContext context)
        {
            _context = context;
        }


        // Obtener empleados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetEmpleados()
        {
            return await _context.Empleados.ToListAsync();
        }


        // Crear empleado
        [HttpPost]
        public async Task<ActionResult<Empleado>> CrearEmpleado(Empleado empleado)
        {
            _context.Empleados.Add(empleado);

            await _context.SaveChangesAsync();

            return Ok(empleado);
        }
    }
}