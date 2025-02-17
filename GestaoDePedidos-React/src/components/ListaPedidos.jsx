import { useEffect, useRef, useState } from 'react';
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
    const statusRef = useRef();


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


    const handleFilter = (event) => {
        const newData = todosPedidos.filter(d => {
            console.log(d);
            return d.produto.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setFiltroPedidos(newData);
    }

    const abrirModal = (dados) => {
        setUnidadePedido(dados);
        setInfoVisivel(true)
        return;
    }

    const abrirFormCadastro = () => {
        setFormVisivel(true);
    }



    const cadastrarPedido = () => {
        event.preventDefault();
        const obj = {
            cliente: clienteRef.current.value,
            produto: produtoRef.current.value,
            valor: Number(valorRef.current.value),
            status: parseInt(statusRef.current.value),
        }

        if (
            obj.cliente === '' || obj.cliente === null ||
            obj.produto === '' || obj.produto === null ||
            obj.valor === '' || obj.valor === null ||
            obj.status === '' || obj.status === null
        ) {
            alert('Todos os campos devem ser preenchidos!');
            return;
        }

        console.log(typeof obj.status)

        axios.post('https://localhost:44310/api/Pedido', {
            pedido: obj
        }).then((response) => {
            console.log(response.data);
        }).catch((err) => {
            console.log(err);
        });

        axios.post('/user', {
            firstName: 'Fred',
            lastName: 'Flintstone'
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <div className='mx-[20%] my-[5%]'>
                <div className='flex justify-end my-2'>
                    <button onClick={() => abrirFormCadastro()} className='bg-green-500 text-white p-1.5 rounded-[5px] cursor-pointer hover:bg-green-700' >
                        Adicionar pedido
                    </button>
                </div>
                <div className='flex justify-end'>
                    <div className="w-100 lg:w-55 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                        <input type="text" name="pesquisar" id="pesquisar" onChange={handleFilter} className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6" placeholder="Pesquisar" />
                    </div>
                </div>

                <div className='mt-5 lg: p-5 rounded-[10px] border-1 border-gray-400'>
                    {filtroPedidos && filtroPedidos.map((item, indice) =>
                    (
                        <>
                            <div key={indice}>
                                <div className='flex justify-between'>
                                    <p className='text-[25px]'>{item.produto}</p>
                                    <button onClick={() => abrirModal(item)} className='text-[17px] bg-blue-500 text-white p-1.5 rounded-[5px] cursor-pointer hover:bg-blue-700'>informações</button>
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
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                            <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div> */}
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-base font-semibold text-gray-900 text-[25px]" id="modal-title">{unidadePedido.produto}</h3>
                                                <hr className='my-3 text-gray-400 w-[100%] text-center' />
                                                <div className="my-5">
                                                    <p>
                                                        <span className='font-semibold'>Cliente: </span>{unidadePedido.cliente}
                                                    </p>
                                                    <p>
                                                        <span className='font-semibold'>Valor: </span>{unidadePedido.valor}
                                                    </p>
                                                    <p>
                                                        <span className='font-semibold'>Status: </span>{unidadePedido.status}
                                                    </p>
                                                    <p>
                                                        <span className='font-semibold'>Data de criação: </span>{unidadePedido.dataCriacao}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button onClick={() => setInfoVisivel(false)} type="button" className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto">Fechar</button>
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
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-[100%]">
                                                <h3 className="text-base font-semibold text-gray-900 text-[25px]" id="modal-title">Cadastrar Pedido</h3>
                                                <hr className='my-3 text-gray-400 w-[100%] text-center' />
                                                <form className="my-5 flex flex-col gap-5" onSubmit={() => cadastrarPedido()}>
                                                    <div className="w-100 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                                        <input className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Produto' name='produto' ref={produtoRef} />
                                                    </div>
                                                    <div className="w-100 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                                        <input className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Cliente' name='cliente' ref={clienteRef} />
                                                    </div>
                                                    <div className="w-100 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                                        <input className='w-98 block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="number" placeholder='Valor' name='valor' ref={valorRef} />
                                                    </div>
                                                    <div className="w-100 rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                                                        <select className='w-95 block min-w-0 grow py-1.5 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none' type="text" placeholder='Status' name='status' ref={statusRef} >
                                                            <option value="0">Pendente</option>
                                                            <option value="1">Processando</option>
                                                            <option value="2">Finalizado</option>
                                                        </select>
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