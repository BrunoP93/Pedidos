import axios from 'axios'
import Swal from 'sweetalert2';
import moment from 'moment';
import Popup from 'reactjs-popup';

const ModalInfo = ({infoVisivel, unidadePedido, infoInvisivel}) => {

    //Deleta pedido selecionado
    const deletarPedido = (dados) => {
        axios.delete(`https://localhost:44310/api/Pedido?id=${dados.id}`
        ).then((resp) => {
            Swal.fire({
                title: "Sucesso",
                text: resp.data,
                icon: "success"
            });
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }).catch((err) => {
            console.log(err);
            Swal.fire({
                title: "Algo deu errado",
                text: "Tente novamente mais tarde",
                icon: "error"
            });
        });
    }
    
    // FOrmata a data para string
    const converterEmString = (dt) => {
            const strFormat= moment(dt).format('DD/MM/yyyy');
            return strFormat;
    }
    
    // Formata o número do status em seus respectivos nomes
    const formatarStatus = (st) => {
        let status;
        switch(st){
            case 0:
                status = 'Pendente'
                break;
            case 1:
                status = 'Processando'
                break;
            case 2:
                status = 'Finalizado'
                break;
            default:
                status = "Status indisponível";
                break
        }
        return status;
    }

  return (
    <>
        {infoVisivel === true ? (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-base font-semibold text-gray-900 text-[25px]" id="modal-title">{unidadePedido.produto}</h3>
                                <hr className='my-3 text-gray-400' />
                                <div className="my-5 gap-5 text-start">
                                    <p>
                                        <span className='font-semibold'>Cliente: </span>{unidadePedido.cliente}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>Valor: </span>{unidadePedido.valor}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>Status: </span>{formatarStatus(unidadePedido.status)}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>Data de criação: </span>{converterEmString(unidadePedido.dataCriacao)}
                                    </p>
                                    <p>
                                        <span className='font-semibold'>Data de Efetivação: </span>{converterEmString(unidadePedido.dataEfetivacao)}
                                    </p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                                
                                {/* Fecha Modal */}
                                <button onClick={() => infoInvisivel(false)} type="button" className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-200 sm:mt-0 sm:w-auto">Fechar</button>
                                
                                {/* Abre o popup para confirmar a exclusão do pedido */}
                                <Popup
                                    trigger={<button className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-red-800 sm:mt-0 sm:w-auto">Deletar</button>}
                                    modal
                                    nested
                                >
                                    {close => (
                                    <div className="modal z-10 bg-amber-50 rounded-[5px] p-6">
                                        <div className="content text-gray-900 text-[25px]">
                                            Tem certeza que deseja deletar o pedido <strong>{unidadePedido.produto}</strong> ?
                                        </div>
                                        <div className="actions">
                                            <div className='mt-10 flex justify-end gap-6'>
                                                <button
                                                    className="button bg-green-400 text-[21px] hover:bg-green-700 rounded-[5px] px-3 py-1 cursor-pointer"
                                                    onClick={() => {
                                                    deletarPedido(unidadePedido);
                                                    close();
                                                    }}
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    className="button bg-red-400 text-[21px] hover:bg-red-700 rounded-[5px] px-3 py-1 cursor-pointer"
                                                    onClick={() => {
                                                    console.log('modal closed ');
                                                    close();
                                                    }}
                                                >
                                                        Cancelar
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null};
    </>
  )
}

export default ModalInfo
