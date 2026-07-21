using ClosedXML.Excel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Data;

namespace SistemaAsistencia.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReportesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reportes?inicio=2026-07-21&fin=2026-07-21
        [HttpGet]
        public async Task<IActionResult> Get(DateTime inicio, DateTime fin)
        {
            var fechaInicio = inicio.Date;
            var fechaFin = fin.Date.AddDays(1);

            var datos = await _context.Asistencias
                .Include(a => a.Empleado)
                .Where(a => a.Fecha >= fechaInicio && a.Fecha < fechaFin)
                .Select(a => new
                {
                    codigo = a.Empleado!.Codigo,
                    nombre = a.Empleado.Nombre,
                    cargo = a.Empleado.Cargo,
                    fecha = a.Fecha,
                    entrada = a.HoraEntrada,
                    salida = a.HoraSalida,
                    estado = a.Estado
                })
                .ToListAsync();

            return Ok(datos);
        }

        // GET: api/Reportes/Excel?inicio=2026-07-21&fin=2026-07-21
        [HttpGet("Excel")]
        public async Task<IActionResult> ExportarExcel(DateTime inicio, DateTime fin)
        {
            var fechaInicio = inicio.Date;
            var fechaFin = fin.Date.AddDays(1);

            var datos = await _context.Asistencias
                .Include(a => a.Empleado)
                .Where(a => a.Fecha >= fechaInicio && a.Fecha < fechaFin)
                .ToListAsync();

            using var libro = new XLWorkbook();

            var hoja = libro.Worksheets.Add("Asistencias");

            hoja.Cell(1, 1).Value = "Código";
            hoja.Cell(1, 2).Value = "Nombre";
            hoja.Cell(1, 3).Value = "Cargo";
            hoja.Cell(1, 4).Value = "Fecha";
            hoja.Cell(1, 5).Value = "Entrada";
            hoja.Cell(1, 6).Value = "Salida";
            hoja.Cell(1, 7).Value = "Estado";

            int fila = 2;

            foreach (var a in datos)
            {
                hoja.Cell(fila, 1).Value = a.Empleado?.Codigo;
                hoja.Cell(fila, 2).Value = a.Empleado?.Nombre;
                hoja.Cell(fila, 3).Value = a.Empleado?.Cargo;
                hoja.Cell(fila, 4).Value = a.Fecha;
                hoja.Cell(fila, 5).Value = a.HoraEntrada;
                hoja.Cell(fila, 6).Value = a.HoraSalida;
                hoja.Cell(fila, 7).Value = a.Estado;

                fila++;
            }

            hoja.Columns().AdjustToContents();

            using var stream = new MemoryStream();

            libro.SaveAs(stream);

            return File(
                stream.ToArray(),
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                $"Reporte_Asistencia_{DateTime.Now:yyyyMMdd}.xlsx"
            );
        }
    }
}