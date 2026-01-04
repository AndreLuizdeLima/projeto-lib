import styles from './AutorLivro.module.css'
import { useGetItems } from '../../../hooks/useGetItems';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDeleteItem } from '../../../hooks/useDeleteItem';

const AutorLivro = () => {
    const { documents: autors, loading, error } = useGetItems('AUTOR');
    const { deleteItem, loading: loading_delete, error: error_delete } = useDeleteItem('AUTOR')

    const [autorSelecionado, setautorSelecionado] = useState(null)


    const deleteautor = () => {
        deleteItem(autorSelecionado)
    }

    return (
        <div className={`container ${styles.autor_livro}`}>
            <h5>Autores Livro</h5>
            <hr />
            <div className={styles.action_buttons}>
                <Link className={`btn btn-success`} to='new'><i className="fas fa-plus"></i> Novo</Link>
                <Link className={`btn btn-primary`} to={`${autorSelecionado}`}><i className="fas fa-edit"></i> Editar</Link>
                <button className={`btn btn-danger`} onChange={deleteautor}><i className="fas fa-trash"></i> Remover</button>
            </div>
            <hr />
            <div className='loading_message'>
                {loading && (<p>Carregando...</p>)}
                {loading_delete && (<p>Carregando...</p>)}
            </div>
            <div className='error_message'>
                {error && (<p>{error}</p>)}
                {error_delete && (<p>{error_delete}</p>)}
            </div>
            <div className={styles.lista_autors}>
                {autors.map(autor => (
                    <div className="card" key={autor.id}>
                        <div className={`card-body ${styles.card_autor}`}>
                            <input className="form-check-input" type="checkbox"
                                checked={autorSelecionado === autor.id}
                                onChange={() =>
                                    setautorSelecionado(
                                        autorSelecionado === autor.id ? null : autor.id
                                    )}
                            />
                            <span>{autor.nome}</span>
                            <span className={styles.id}>{autor.id}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AutorLivro