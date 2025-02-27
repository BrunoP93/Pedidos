import { useRef } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios'

const ModalForm = ({formVisivel, formInvisivel}) => {

    const produtoRef = useRef();
    const clienteRef = useRef();
    const valorRef = useRef();
    const efetivacaoRef = useRef();

    // Faz o cadastro dos campos do pedido preeenchidos no formulário
    const cadastrarPedido = () => {
            event.preventDefault();
            const cliente = clienteRef.current.value;
            const produto = produtoRef.current.value;
            const valor = parseFloat(valorRef.current.value);
            const dataEfetivacao = new Date(efetivacaoRef.current.value).toJSON();
    
            if (
                cliente === '' || cliente === null ||
                produto === '' || produto === null ||
                valor === '' || valor === null ||
                dataEfetivacao === '' || dataEfetivacao === null
            ) {
                Swal.fire({
                    title: "Atenção",
                    text: "Preencha todos os campos",
                    icon: "warning"
                    });
                return;
            }else{
                axios.post('https://localhost:44310/api/Pedido', {
                    cliente,
                    produto,
                    valor,
                    dataEfetivacao
                }).then((resp) => {
                    console.log(resp);
                    Swal.fire({
                        title: "Sucesso",
                        text: "Novo pedido cadastrado",
                        icon: "success"
                        });
                    window.location.reload()
                }).catch((err) => {
                    console.log(err);
                    Swal.fire({
                        title: "Algo deu errado",
                        text: "Tente novamente mais tarde",
                        icon: "error"
                    });
                });
            }
        }

  return (
    <>
        {formVisivel === true ? (
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4">
                                        <h3 className="text-base font-semibold text-gray-900 text-[25px]" id="modal-title">Cadastrar Pedido</h3>
                                        <hr className='my-3 text-gray-400 w-[100%] text-center' />
                                        <form className="my-5 flex flex-col gap-5" onSubmit={() => cadastrarPedido()}>
                                            <div className="lg:w-100 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
                                                <input className='w-100 block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Produto' name='produto' ref={produtoRef} />
                                            </div>
                                            <div className="lg:w-100 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
                                                <input className='w-100 block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Cliente' name='cliente' ref={clienteRef} />
                                            </div>
                                            <div className="lg:w-100 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
                                                <input className='w-98 block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Valor' name='valor' ref={valorRef} />
                                            </div>
                                            <div className="lg:w-100 rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2">
                                                <input className='w-98 block min-w-0 grow py-1.5 pr-3 pl-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="date" placeholder='Data de efetivação' name='dtEfetivacao' ref={efetivacaoRef} />
                                            </div>
                                            <div className='flex justify-center'>
                                                <button className='text-[21px] bg-blue-500 text-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-blue-700'>Enviar</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Fecha Modal */}
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={() => formInvisivel(false)} type="button" className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
    </>
  )
}

export default ModalForm