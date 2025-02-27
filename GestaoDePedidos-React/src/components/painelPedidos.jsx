import { useEffect, useState } from 'react';
// import Popup from 'reactjs-popup';
import axios from 'axios'
import '../App.css'
import ModalInfo from './modalInfo';
import ModalForm from './modalForm';

const PainelPedidos = () => {

    const [infoVisivel, setInfoVisivel] = useState(false);
    const [formVisivel, setFormVisivel] = useState(false);

    const [todosPedidos, setTodosPedidos] = useState(null);
    const [filtroPedidos, setFiltroPedidos] = useState(null);
    const [unidadePedido, setUnidadePedido] = useState(null)

    // Exscuta a requisição de todos pedidos no banco de dados
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


    // Filtra os pedidos conforme o usuário digita o caractere
    const filtrarPedidos = (event) => {
        const newData = todosPedidos.filter(d => {
            return d.produto.toLowerCase().includes(event.target.value.toLowerCase());
        })
        setFiltroPedidos(newData);
    }

    // Abre modal de informações dos pedidos
    const abrirInfoModal = (dados) => {
        setUnidadePedido(dados);
        setInfoVisivel(true)
        return;
    }

    // Abre modal de cadastro de novos pedidos
    const abrirFormCadastroModal = () => {
        setFormVisivel(true);
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
                        <div key={indice}>
                            <div className='flex justify-between items-center'>
                                <p className='lg:text-[25px]'>{item.produto}</p>
                                <button onClick={() => abrirInfoModal(item)} className='lg:text-[17px] bg-blue-500 text-white p-1.5 rounded-[5px] cursor-pointer hover:bg-blue-700'>informações</button>
                            </div>
                            <hr className='my-4 text-gray-300' />
                        </div>
                    )
                    )}
                    <div className='flex justify-end'>
                        <a href='https://github.com/BrunoP93' className='text-gray-500 text-[12px] hover:underline'>github.com/BrunoP93</a>
                    </div>
                </div>

                <ModalInfo infoVisivel={infoVisivel} unidadePedido={unidadePedido} infoInvisivel={(v) => setInfoVisivel(v)}/>
                <ModalForm formVisivel={formVisivel} formInvisivel={(v) => setFormVisivel(v)}/>
                    
            </div>
        </>
    )
}

export default PainelPedidos