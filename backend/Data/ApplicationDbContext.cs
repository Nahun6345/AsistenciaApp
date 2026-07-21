using Microsoft.EntityFrameworkCore;
using SistemaAsistencia.Models;

namespace SistemaAsistencia.Data
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }


        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Empleado> Empleados { get; set; }

        public DbSet<Asistencia> Asistencias { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<Asistencia>()
                .HasOne(a => a.Empleado)
                .WithMany(e => e.Asistencias)
                .HasForeignKey(a => a.EmpleadoId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}