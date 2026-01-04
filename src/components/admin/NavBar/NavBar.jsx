/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from 'react-router-dom'
import styles from './NavBar.module.css'
import { useAuthValue } from '../../../context/AuthContext';
import { useEffect } from 'react';

import logo from '../../../img/logo192.png'

const NavBar = () => {


  const { logout, authenticated } = useAuthValue();
  const navigate = useNavigate();

  const sairDoSistema = () => {
    logout()
    navigate('/login');

  }

  useEffect(() => {
    if (!authenticated) alert('usuario caiu')
  }, [authenticated])

  return (
    <div className={styles.nav_bar}>
      <Link to='/admin'>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <span>Projeto Lib</span>
        </div>
      </Link>
      <nav className={styles.nav_links}>

        <div className={styles.dropdown}>
          <span className={styles.dropdown_title}>Cadastros</span>

          <div className={styles.dropdown_menu}>
            <Link >Livros</Link>
            <Link to='genero'>Generos</Link>
            <Link to='autor'>Autores</Link>
          </div>
        </div>
        <div className={styles.dropdown}>
          <span className={styles.dropdown_title}>Estudantes</span>

          <div className={styles.dropdown_menu}>
            <Link >Carterinhas</Link>
            <Link >Dashboard</Link>
          </div>
        </div>
      </nav>

      <nav className={styles.nav_links_end}>
        {authenticated && (<p className='text-white'>Usuario autenticado</p>)}
        <a onClick={sairDoSistema}><i className="fas fa-sign-out-alt"></i>Sair</a>
      </nav>
    </div>
  )
}

export default NavBar