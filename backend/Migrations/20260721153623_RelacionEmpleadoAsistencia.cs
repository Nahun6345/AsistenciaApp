using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class RelacionEmpleadoAsistencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Asistencias_EmpleadoId",
                table: "Asistencias",
                column: "EmpleadoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias",
                column: "EmpleadoId",
                principalTable: "Empleados",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias");

            migrationBuilder.DropIndex(
                name: "IX_Asistencias_EmpleadoId",
                table: "Asistencias");
        }
    }
}
