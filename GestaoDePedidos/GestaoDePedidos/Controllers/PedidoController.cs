using Microsoft.AspNetCore.Mvc;
using GestaoDePedidos.Data;
using GestaoDePedidos.Model;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestaoDePedidos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoController : ControllerBase
    {
        private readonly PedidoContext _context;

        public PedidoController(PedidoContext context)
        {
           _context = context;
        }
        // GET: api/<PedidosController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            return Ok(await _context.Pedidos.ToListAsync());
        }

        // GET api/<PedidosController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(Guid id)
        {
            var pedido = await _context.Pedidos.FirstOrDefaultAsync(x => x.id == id);

            if(pedido == null)
            {
                return NotFound();
            }

            return Ok(pedido);
        }

        // POST api/<PedidosController>
        [HttpPost]
        public async Task<ActionResult> Post(PedidoModel pedido)
        {
            return Ok(pedido);

            var novoPedido = new PedidoModel(pedido.cliente,pedido.produto, pedido.valor, pedido.status );

            await _context.Pedidos.AddAsync(novoPedido);
            await _context.SaveChangesAsync();
            return Ok(pedido);
        }
    }
}
