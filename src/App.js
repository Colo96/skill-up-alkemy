import Login from './components/Login';
import Listado from './components/Listado';
import Detalle from './components/Detalle';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultados from './components/Resultados';
import { Routes, Route } from 'react-router-dom';
import './css/app.css';

function App() {

  const addOrRemoveFromFavs = () => {
    console.log("Ok Funcionó");
  }

  return (
    <div className="container mt-3">
      <Header />
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route
          path='/listado'
          children={(props) => { 
            return (<Listado
              {...props}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />);
          }}
        />
        <Route path='/detalle' element={<Detalle />} />
        <Route path='/resultados' element={<Resultados />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
