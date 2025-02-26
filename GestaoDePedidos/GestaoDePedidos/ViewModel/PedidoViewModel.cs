using GestaoDePedidos.Model.Enum;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;

namespace GestaoDePedidos.ViewModel
{
    public class PedidoViewModel
    {
        public PedidoViewModel(string cliente, string produto, decimal valor, DateTime dataEfetivacao)
        {
            Cliente = cliente;
            Produto = produto;
            Valor = valor;
            DataEfetivacao = dataEfetivacao;
        }

        public string Cliente { get; set; }

        public string Produto { get; set; }

        public decimal Valor { get; set; }

        public DateTime DataEfetivacao { get; set; }
    }
}
