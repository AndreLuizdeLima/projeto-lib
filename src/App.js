//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import dependencias
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthValue } from './context/AuthContext';

//pages

//import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Admin from './pages/admin/Admin';
import GeneroLivro from './pages/admin/generoLivro/GeneroLivro'
import ViewGeneroLivro from './pages/admin/viewGeneroLivro/ViewGeneroLivro';
import NewGeneroLivro from './pages/admin/newGeneroLivro/newGeneroLivro';
import AutorLivro from './pages/admin/autorLivro/AutorLivro';
import ViewAutorLivro from './pages/admin/viewAutorLivro/ViewsAutorLivro';
import NewAutorLivro from './pages/admin/newAutorLivro/NewAutorLivro';


function App() {


  const { authenticated } = useAuthValue();

  const loadingUser = authenticated === undefined;


  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Home />} /> */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={authenticated ? <Admin /> : <Navigate to='/login' /> }>
            <Route path='genero' element={<GeneroLivro />}></Route>
            <Route path='autor' element={<AutorLivro />}></Route>
            <Route path='genero/new' element={<NewGeneroLivro />}></Route>
            <Route path='autor/new' element={<NewAutorLivro />}></Route>
            <Route path='genero/:id' element={<ViewGeneroLivro />}></Route>
            <Route path='autor/:id' element={<ViewAutorLivro />}></Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
