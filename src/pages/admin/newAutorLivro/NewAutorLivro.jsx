import styles from './NewAutorLivro.module.css'

import { Link } from "react-router-dom"
import { useState } from 'react'
import { useNewItem } from '../../../hooks/useNewItem'

const NewAutorLivro = () => {

    const [newNome, setNewNome] = useState('')
    const { insert, loading, error } = useNewItem("AUTOR");

    const saveNew = () => {
        insert({ nome: newNome })
    }

    return (
        <div className={`container ${styles.autor_livro}`}>
            <h5>Criar Autor:</h5>
            <hr />
            <div className={styles.action_buttons}>
                <button className={`btn btn-success`} onClick={saveNew}><i className="far fa-save"></i> Salvar</button>
                <Link className={`btn btn-danger`} to='/admin/autor'><i className="fas fa-times"></i> Cancelar</Link>
            </div>
            <hr />
            <div className='loading_message'>
                {loading && (<p>Carregando...</p>)}
            </div>
            <div className='error_message'>
                {error && (<p>{error}</p>)}
            </div>
            <div className={styles.inputs}>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Nome:</label>
                        <input type="text" className="form-control" placeholder="Novo Autor" aria-label="First name" value={newNome} onChange={(e) => setNewNome(e.target.value)} />
                    </div>
                    <div className="col last">
                        <label className="form-label">Id:</label>
                        <input type="text" className="form-control" disabled={true} placeholder='gerado automaticamente' aria-label="Last name" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAutorLivro