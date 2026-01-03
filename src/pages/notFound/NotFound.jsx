import style from './NotFound.module.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={style.not_found}>
            <div className={style.content}>
                <i class="fa-solid fa-triangle-exclamation"></i>
                <h1>Error: 404</h1>
                <p>Ops! O conteúdo que você está procurando não foi encontrado.</p>
                <Link to="/" className="btn">
                    Voltar
                </Link>
            </div>
        </div>
    )
}

export default NotFound