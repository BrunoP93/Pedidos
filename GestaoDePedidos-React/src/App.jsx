//import { useState } from 'react'
import './App.css'
import PainelPedidos from './components/PainelPedidos'

function App() {

  return (
    <>
      <div>
        <h1 className="text-[40px] text-center">Lista de Pedidos</h1>
      </div>
      <br />
      <PainelPedidos />
    </>
  )
}

export default App
