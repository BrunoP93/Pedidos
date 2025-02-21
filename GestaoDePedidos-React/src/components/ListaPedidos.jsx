import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
// import Popup from 'reactjs-popup';
import axios from 'axios'
import '../App.css'

const ListaPedidos = () => {

    const [infoVisivel, setInfoVisivel] = useState(false);
    const [formVisivel, setFormVisivel] = useState(false);

    const [todosPedidos, setTodosPedidos] = useState(null);
    const [filtroPedidos, setFiltroPedidos] = useState(null);
    const [unidadePedido, setUnidadePedido] = useState(null)

    const produtoRef = useRef();
    const clienteRef = useRef();
    const valorRef = useRef();


    useEffect(() => {
        axios.get('https://localhost:44310/api/Pedido')
            .then(function (response) {
                setTodosPedidos(response.data);
                setFiltroPedidos(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);
    
    const cadastrarPedido = () => {
        event.preventDefault();

        const cliente = clienteRef.current.value;
        const produto = produtoRef.current.value;
        const valor = parseFloat(valorRef.current.value);

        if (
            cliente === '' || cliente === null ||
            produto === '' || produto === null ||
            valor === '' || valor === null
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

    // const deletarPedido = (dados) => {
    //     const id = dados.id;
    //     axios.delete('https://localhost:44310/api/Pedido',{
    //         id
    //     }).then((resp) => {
    //         console.log(resp);
    //         Swal.fire({
    //             title: "Sucesso",
    //             text: "Pedido deletado",
    //             icon: "success"
    //           });
    //         window.location.reload()
    //     }).catch((err) => {
    //         console.log(err);
    //         Swal.fire({
    //             title: "Algo deu errado",
    //             text: "Tente novamente mais tarde",
    //             icon: "error"
    //         });
    //     });
    // }

    const filtrarPedidos = (event) => {
        const newData = todosPedidos.filter(d => {
            return d.produto.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setFiltroPedidos(newData);
    }

    const abrirInfoModal = (dados) => {
        setUnidadePedido(dados);
        setInfoVisivel(true)
        return;
    }

    const abrirFormCadastroModal = () => {
        setFormVisivel(true);
    }

    const formatarData = (dt) => {
        const dtFormat= moment(dt).format('DD/MM/yyyy HH:mm');
        return dtFormat;
    }

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
            <div className='lg:mx-[20%] my-[5%]'>
                <div className='flex justify-end my-2'>
                    <button onClick={() => abrirFormCadastroModal()} className='bg-green-500 text-white p-1.5 rounded-[5px] cursor-pointer hover:bg-green-700' >
                        Adicionar pedido
                    </button>
                </div>
                <div className='flex justify-end'>
                    <div className="w-100 lg:w-55 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input type="text" name="pesquisar" id="pesquisar" onChange={filtrarPedidos} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Pesquisar" />
                    </div>
                </div>

                <div className='mt-5 lg: p-5 rounded-[5px] border-1 border-gray-300'>
                    {filtroPedidos && filtroPedidos.map((item, indice) =>
                    (
                        <>
                            <div key={indice}>
                                <div className='flex justify-between items-center'>
                                    <p className='lg:text-[25px]'>{item.produto}</p>
                                    <button onClick={() => abrirInfoModal(item)} className='lg:text-[17px] bg-blue-500 text-white p-1.5 rounded-[5px] cursor-pointer hover:bg-blue-700'>informações</button>
                                </div>
                                <hr className='my-4 text-gray-300' />
                            </div>
                        </>
                    )
                    )}
                    <div className='flex justify-end'>
                        <a href='https://github.com/BrunoP93' className='text-gray-500 text-[12px] hover:underline'>github.com/BrunoP93</a>
                    </div>
                </div>
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
                                                <span className='font-semibold'>Data de criação: </span>{formatarData(unidadePedido.dataCriacao)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-3">
                                        <button onClick={() => setInfoVisivel(false)} type="button" className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-200 sm:mt-0 sm:w-auto">Fechar</button>
                                        {/* <Popup
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
                                        </Popup> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null};

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
                                                    <div className='flex justify-center'>
                                                        <button className='text-[21px] bg-blue-500 text-white px-2 py-1 rounded-[5px] cursor-pointer hover:bg-blue-700'>Enviar</button>
                                                    </div>

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button onClick={() => setFormVisivel(false)} type="button" className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Fechar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default ListaPedidos