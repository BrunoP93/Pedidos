using GestaoDePedidos.Model.Enum;
using System.Globalization;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoDePedidos.Model
{
    [Table("tb_pedido")]
    public class PedidoModel
    {
        public PedidoModel(string cliente, string produto, decimal valor, PedidoStatus status )
        {
            Id = Guid.NewGuid();
            Cliente = cliente;
            Produto = produto;
            Valor = valor;
            Status = status;
            DataCriacao = DateTime.UtcNow;
        }

        [Column("id")]
        public Guid Id { get; init; }

        [Column("cliente")]
        public string Cliente { get; set; }

        [Column("produto")]
        public string Produto { get; set; }

        [Column("valor")]
        public decimal Valor { get; set; }

        [Column("status")]
        public PedidoStatus Status { get; set; }

        [Column("dataCriacao")]
        public DateTime DataCriacao { get; set; }
    }
}
