using GestaoDePedidos.Model.Enum;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoDePedidos.ViewModel
{
    public class PedidoViewModel
    {
        public PedidoViewModel(string cliente, string produto, decimal valor)
        {
            Cliente = cliente;
            Produto = produto;
            Valor = valor;
        }

        public string Cliente { get; set; }

        public string Produto { get; set; }

        public decimal Valor { get; set; }

    }
}
