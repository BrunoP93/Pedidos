using Microsoft.EntityFrameworkCore;
using GestaoDePedidos.Model;

namespace GestaoDePedidos.Data
{
    public class PedidoContext : DbContext
    {
        public PedidoContext(DbContextOptions<PedidoContext> options) : base(options)
        {

        }

        public DbSet<PedidoModel> Pedidos { get; set; }
    }
}
