import styles from './GeneroLivro.module.css'
import { useGetItems } from '../../../hooks/useGetItems';
import { useState } from 'react'
import { Link } from 'react-router-dom';


const GeneroLivro = () => {

    const { documents: generos, loading, error } = useGetItems('GENERO');

    const [generoSelecionado, setGeneroSelecionado] = useState(null)

    if (loading) console.log('está em loading')
    return (
        <div className={`container ${styles.genero_livro}`}>
            <h5>Gênero Livro</h5>
            <hr />
            <div className={styles.action_buttons}>
                <button className={`btn btn-success`} ><i className="fas fa-plus"></i> Novo</button>
                <Link className={`btn btn-primary`} to={`${generoSelecionado}`}><i className="fas fa-edit"></i> Editar</Link>
                <button className={`btn btn-danger`}><i className="fas fa-trash"></i> Remover</button>
            </div>
            <hr />
            <div className='loading_message'>
                {loading && (<p>Carregando...</p>)}
            </div>
            <div className='error_message'>
                {error && (<p>{error}</p>)}
            </div>
            <div className={styles.lista_generos}>
                {generos.map(genero => (
                    <div className="card" key={genero.id}>
                        <div className={`card-body ${styles.card_genero}`}>
                            <input className="form-check-input" type="checkbox"
                                checked={generoSelecionado === genero.id}
                                onChange={() =>
                                    setGeneroSelecionado(
                                        generoSelecionado === genero.id ? null : genero.id
                                    )}
                            />
                            <span>{genero.nome}</span>
                            <span className={styles.id}>{genero.id}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default GeneroLivro