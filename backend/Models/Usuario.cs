using System.ComponentModel.DataAnnotations;

namespace SistemaAsistencia.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        [Required]
        public string Rol { get; set; } = string.Empty;

        public bool Activo { get; set; } = true;

        public string? Foto { get; set; }
    }
}