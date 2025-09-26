import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import CadastroCidade from './pages/CadastroCidade'
import CadastroLocal from './pages/CadastroLocal'
import Consulta from './pages/Consulta'



function App() {
  return (

     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cidades" element={<CadastroCidade />} />
      <Route path="/locais" element={<CadastroLocal />} />
      <Route path="/consulta" element={<Consulta />} />
     
      
    </Routes>
  
 
  )
}

export default App
