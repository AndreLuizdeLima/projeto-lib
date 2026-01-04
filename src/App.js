//css
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import dependencias
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthValue } from './context/AuthContext';

//pages

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import NotFound from './pages/notFound/NotFound';
import Admin from './pages/admin/Admin';
import GeneroLivro from './pages/admin/generoLivro/GeneroLivro';
import ViewGeneroLivro from './pages/admin/viewGeneroLivro/ViewGeneroLivro';
import NewGeneroLivro from './pages/admin/newGeneroLivro/newGeneroLivro';


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
            <Route path='genero/new' element={<NewGeneroLivro />}></Route>
            <Route path='genero/:id' element={<ViewGeneroLivro />}></Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
