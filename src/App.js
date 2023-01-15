
import './App.css';

//Implementamos React-router-dom en app.js, por eso importamos....

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

//Importaciones de containers y componentes
import Header from './components/header/header.jsx';
import Services from './containers/services/services';
import ServicesDetail from './containers/servicesDetail/servicesDetail';
import Pils from './containers/pils/pils.jsx';
import PilsDetail from './containers/pilsDetail/pilsDetail';
import MyAccount from './containers/myAccount/myAccount';
import SPA from './containers/SPA/SPA';

function App() {

  return (
    // Todos los elementos en React van a estar en lenguaje JSX.
    <div className="App">

      {/* Genero el entorno de React Router Dom para el enrutado de vistas y componentes */}

      <BrowserRouter>
        <Header />


        <Routes>
          <Route path="/" element={<SPA />} />;
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
