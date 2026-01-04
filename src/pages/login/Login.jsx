import styles from './Login.module.css'
import { useAuthLogin } from '../../hooks/useAuthLogin'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuthValue } from '../../context/AuthContext'

const Login = () => {
  const { login, error, loading } = useAuthLogin();
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hidePassword, setHidePAssword] = useState('password')
  const [check, setCheck] = useState(false)

  //contornando o login para a falta da api rest

  const { login: authLogin } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault()
    // const success = await login({
    //   email,
    //   password
    // });

    // if (success) {
    //   navigate('/admin');
    // }

    authLogin()
    navigate('/admin');
  }

  useEffect(() => {

    if (check) {
      setHidePAssword('text')
    } else {
      setHidePAssword('password')
    }

  }, [check])


  return (
    <div className={`container ${styles.caixa} `}>
      <div className={styles.logo}>
        <img src="./logo192.png" alt="logo" />
        <span>Projeto Lib</span>
      </div>
      <form className={styles.form_login} onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email login:</label>
          <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} />
          <div>Informe seu email de login</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Senha:</label>
          <input type={hidePassword} className="form-control" autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" checked={check} onChange={(e) => setCheck(e.target.checked)} />
          <label className="form-check-label" htmlFor="exampleCheck1" >Mostrar senha</label>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading} >Acessar</button>
      </form>
      <div className={styles.error_message}>
        {error && (<p>{error}</p>)}
      </div>
    </div>
  )
}

export default Login