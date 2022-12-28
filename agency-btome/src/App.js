
import './App.css';

//Implementamos React-router-dom en app.js, por eso importamos....

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

//Importaciones de containers y componentes
import Header from './components/header/header.jsx';
import Services from './containers/services/services';
import ServicesDetail from './containers/servicesDetail/servicesDetail';

function App() {
  
  return (
    // Todos los elementos en React van a estar en lenguaje JSX.
    <div className="App">

      {/* Genero el entorno de React Router Dom para el enrutado de vistas y componentes */}
      
      <BrowserRouter>    
      <Header/>
      
        
        <Routes>
        <Route path="/" element={<Services/>} />;
          <Route path="/serviceDetail" element={<ServicesDetail/>} />;
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
