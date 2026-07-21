using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SistemaAsistencia.Models
{
    public class Asistencia
    {
        [Key]
        public int Id { get; set; }


        public int EmpleadoId { get; set; }


        [ForeignKey("EmpleadoId")]
        public Empleado? Empleado { get; set; }


        public DateTime Fecha { get; set; }


        public DateTime HoraEntrada { get; set; }


        public DateTime? HoraSalida { get; set; }


        public string Estado { get; set; } = "";
    }
}