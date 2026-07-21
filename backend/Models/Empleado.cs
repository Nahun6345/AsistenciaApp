using System.ComponentModel.DataAnnotations;

namespace SistemaAsistencia.Models
{
    public class Empleado
    {
        [Key]
        public int Id { get; set; }

        public string Codigo { get; set; } = "";

        public string Nombre { get; set; } = "";

        public string Telefono { get; set; } = "";

        public string Cargo { get; set; } = "";

        public bool Activo { get; set; }


        // Relación con asistencias
        public ICollection<Asistencia>? Asistencias { get; set; }
    }
}