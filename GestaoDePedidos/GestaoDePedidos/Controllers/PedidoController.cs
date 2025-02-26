using Microsoft.AspNetCore.Mvc;
using GestaoDePedidos.Data;
using GestaoDePedidos.Model;
using Microsoft.EntityFrameworkCore;
using GestaoDePedidos.ViewModel;
using System.Globalization;

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
            var pedido = await _context.Pedidos.FirstOrDefaultAsync(x => x.Id == id);

            if(pedido == null)
            {
                return NotFound();
            }

            return Ok();
        }

        // POST api/<PedidosController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PedidoViewModel pedido)
        {
            if (pedido == null) return BadRequest("Erro ao enviar valores");

            var novoPedido = new PedidoModel(
                pedido.Cliente,
                pedido.Produto,
                pedido.Valor,
                pedido.DataEfetivacao
                );

            await _context.Pedidos.AddAsync(novoPedido);
            await _context.SaveChangesAsync();
            return Ok(pedido);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(String id)
        {
            var converterToGuid = new Guid(id);

            var dbPedido = await _context.Pedidos.FindAsync(converterToGuid);

            if (dbPedido == null)
                return NotFound();

            _context.Pedidos.Remove(dbPedido);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
