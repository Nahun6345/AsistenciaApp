using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;
using SistemaAsistencia.Models;

namespace SistemaAsistencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcajeController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public MarcajeController(ApplicationDbContext context)
        {
            _context = context;
        }



        // POST: api/Marcaje
        [HttpPost]
        public async Task<ActionResult> Registrar([FromBody] MarcajeRequest request)
        {

            // Buscar empleado por código
            var empleado = await _context.Empleados
                .FirstOrDefaultAsync(e => e.Codigo == request.Codigo);


            if (empleado == null)
            {
                return BadRequest(new
                {
                    mensaje = "Empleado no encontrado"
                });
            }



            // Buscar asistencia abierta de hoy
            var asistencia = await _context.Asistencias
                .FirstOrDefaultAsync(a =>
                    a.EmpleadoId == empleado.Id &&
                    a.Fecha.Date == DateTime.Today
                );



            // Si no existe registra entrada
            if (asistencia == null)
            {

                asistencia = new Asistencia
                {
                    EmpleadoId = empleado.Id,
                    Fecha = DateTime.Now,
                    HoraEntrada = DateTime.Now,
                    Estado = "Entrada"
                };


                _context.Asistencias.Add(asistencia);

                await _context.SaveChangesAsync();


                return Ok(new
                {
                    empleado = empleado.Nombre,
                    codigo = empleado.Codigo,
                    estado = "Entrada",
                    hora = asistencia.HoraEntrada
                });

            }



            // Si existe pero no tiene salida
            if (asistencia.HoraSalida == null)
            {

                asistencia.HoraSalida = DateTime.Now;
                asistencia.Estado = "Salida";


                await _context.SaveChangesAsync();


                return Ok(new
                {
                    empleado = empleado.Nombre,
                    codigo = empleado.Codigo,
                    estado = "Salida",
                    hora = asistencia.HoraSalida
                });

            }



            return Ok(new
            {
                mensaje = "El empleado ya tiene entrada y salida registrada hoy"
            });

        }

    }



    public class MarcajeRequest
    {
        public string Codigo { get; set; } = "";
    }

}