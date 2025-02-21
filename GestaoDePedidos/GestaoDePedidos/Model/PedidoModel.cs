using GestaoDePedidos.Model.Enum;
using System.Globalization;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoDePedidos.Model
{
    [Table("tb_pedido")]
    public class PedidoModel
    {
        public PedidoModel(string cliente, string produto, decimal valor)
        {
            Cliente = cliente;
            Produto = produto;
            Valor = valor;
        }

        [Column("id")]
        public Guid Id { get; init; } = Guid.NewGuid();

        [Column("cliente")]
        public string Cliente { get; set; }

        [Column("produto")]
        public string Produto { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status")]
        public PedidoStatus Status { get; set; } = 0;

        [Column("dataCriacao")]
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;
    }
}
