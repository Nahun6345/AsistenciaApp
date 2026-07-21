using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;

namespace SistemaAsistencia.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {

        private readonly ApplicationDbContext _context;


        public DashboardController(ApplicationDbContext context)
        {
            _context = context;
        }



        [HttpGet]
        public async Task<IActionResult> Get()
        {


            var hoy = DateTime.Today;



            var asistencias = await _context.Asistencias
                .Include(a=>a.Empleado)
                .Where(a=>a.Fecha.Date == hoy)
                .Select(a=> new
                {

                    codigo = a.Empleado!.Codigo,

                    nombre = a.Empleado.Nombre,

                    cargo = a.Empleado.Cargo,

                    entrada = a.HoraEntrada,

                    salida = a.HoraSalida,

                    estado = a.Estado


                })
                .ToListAsync();



            var totalEmpleados = await _context.Empleados
                .CountAsync();



            var entradas = asistencias
    .Count(a => a.entrada != null);


            var salidas = asistencias
    .Count(a => a.salida != null);



            return Ok(new
            {

                totalEmpleados,

                totalMarcajes = asistencias.Count,

                entradas,

                salidas,

                asistencias


            });



        }


    }

}