import styles from './ViewGeneroLivro.module.css'
import { Link, useParams } from "react-router-dom"
import { useGetItems } from '../../../hooks/useGetItems'
import { useEffect, useState } from 'react'
import {useUpdateItem } from '../../../hooks/usePutItems'

const ViewGeneroLivro = () => {

    const { id } = useParams()
    const { documents: genero, loading, error } = useGetItems('GENERO', id);
    const [generoNome, setGeneroNome] = useState('')
    const [newNome, setNewNome] = useState('')
    const { update, loading: loading_put, error: error_put } = useUpdateItem("GENERO");


    useEffect(() => {
        if (genero && genero.length > 0) {
            setGeneroNome(genero[0].nome);
        }
    }, [genero])

    const save = () => {
        update(id, {id: id, nome: newNome})
    }

    return (
        <div className={`container ${styles.genero_livro}`}>
            <h5>Editar Gênero: {generoNome}</h5>
            <hr />
            <div className='loading_message'>
                {loading && (<p>Carregando...</p>)}
                {loading_put && (<p>Carregando...</p>)}
            </div>
            <div className='error_message'>
                {error && (<p>{error}</p>)}
                {error_put && (<p>{error_put}</p>)}
            </div>
            <div className={styles.action_buttons}>
                <button className={`btn btn-success`} onClick={save}><i className="far fa-save"></i> Salvar</button>
                <Link className={`btn btn-danger`} to='/admin/genero'><i className="fas fa-times"></i> Cancelar</Link>
            </div>
            <hr />
            <div className={styles.inputs}>
                <div className="row">
                    <div className="col">
                        <label className="form-label">Nome:</label>
                        <input type="text" className="form-control" placeholder="Novo Nome" aria-label="First name" value={newNome} onChange={(e) => setNewNome(e.target.value)}/>
                    </div>
                    <div className="col last">
                        <label className="form-label">Id:</label>
                        <input type="text" className="form-control" disabled={true} value={id} aria-label="Last name" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewGeneroLivro