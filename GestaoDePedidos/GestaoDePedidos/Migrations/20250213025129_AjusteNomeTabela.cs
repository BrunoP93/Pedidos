using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoDePedidos.Migrations
{
    /// <inheritdoc />
    public partial class AjusteNomeTabela : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Pedidos",
                table: "Pedidos");

            migrationBuilder.RenameTable(
                name: "Pedidos",
                newName: "tb_pedido");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "tb_pedido",
                newName: "status");

            migrationBuilder.RenameColumn(
                name: "Produto",
                table: "tb_pedido",
                newName: "produto");

            migrationBuilder.RenameColumn(
                name: "Cliente",
                table: "tb_pedido",
                newName: "cliente");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "tb_pedido",
                newName: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tb_pedido",
                table: "tb_pedido",
                column: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tb_pedido",
                table: "tb_pedido");

            migrationBuilder.RenameTable(
                name: "tb_pedido",
                newName: "Pedidos");

            migrationBuilder.RenameColumn(
                name: "status",
                table: "Pedidos",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "produto",
                table: "Pedidos",
                newName: "Produto");

            migrationBuilder.RenameColumn(
                name: "cliente",
                table: "Pedidos",
                newName: "Cliente");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Pedidos",
                newName: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Pedidos",
                table: "Pedidos",
                column: "Id");
        }
    }
}
