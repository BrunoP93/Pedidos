//import { useState } from 'react'
import './App.css'
import ListaPedidos from './components/ListaPedidos'

function App() {

  return (
    <>
      <div>
        <h1 className="text-[40px] text-center">Lista de Pedidos</h1>
      </div>
      <br />
      <ListaPedidos />
    </>
  )
}

export default App
