using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;
using SistemaAsistencia.Models;

namespace SistemaAsistencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AsistenciasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;


        public AsistenciasController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/Asistencias
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var asistencias = await _context.Asistencias
                .Include(x => x.Empleado)
                .Select(x => new
                {
                    x.Id,
                    x.EmpleadoId,
                    x.Fecha,
                    x.HoraEntrada,
                    x.HoraSalida,
                    x.Estado,

                    Empleado = x.Empleado == null ? null : new
                    {
                        x.Empleado.Id,
                        x.Empleado.Nombre,
                        x.Empleado.Codigo,
                        x.Empleado.Cargo
                    }
                })
                .ToListAsync();

            return Ok(asistencias);
        }



        // POST: api/Asistencias
        [HttpPost]
        public async Task<ActionResult> Post(Asistencia asistencia)
        {

            var empleadoExiste = await _context.Empleados
                .AnyAsync(e => e.Id == asistencia.EmpleadoId);


            if (!empleadoExiste)
            {
                return BadRequest("El empleado no existe");
            }


            asistencia.Fecha = DateTime.Now;
            asistencia.HoraEntrada = DateTime.Now;
            asistencia.Estado = "Entrada";


            _context.Asistencias.Add(asistencia);

            await _context.SaveChangesAsync();


            return Ok(asistencia);
        }

    }
}