using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoDePedidos.Migrations
{
    /// <inheritdoc />
    public partial class Teste2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "dataEfetivacao",
                table: "tb_pedido",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dataEfetivacao",
                table: "tb_pedido");
        }
    }
}
