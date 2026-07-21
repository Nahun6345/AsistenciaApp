using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CorregirRelacionEmpleado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias");

            migrationBuilder.AddForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias",
                column: "EmpleadoId",
                principalTable: "Empleados",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias");

            migrationBuilder.AddForeignKey(
                name: "FK_Asistencias_Empleados_EmpleadoId",
                table: "Asistencias",
                column: "EmpleadoId",
                principalTable: "Empleados",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
