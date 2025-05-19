"use client"

import { useState, useContext } from "react"
import styles from './atracao.module.css'
import { AppContext } from "./AppProvider"
import axios from "axios"

const AtracaoComponente = () => {

  const { atracaoSelecionada, setAtracaoSelecionada, setAtracoes, atracoes } = useContext(AppContext)

  const atualizarNomeAtracao = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if(atracaoSelecionada) {
      const nome = evento.target.value
      setAtracaoSelecionada({ ...atracaoSelecionada, nome})
    }
  }

  const atualizarDescricaoAtracao = (evento: React.ChangeEvent<HTMLTextAreaElement>) => {
    if(atracaoSelecionada) {
      const descricao = evento.target.value
      setAtracaoSelecionada({ ...atracaoSelecionada, descricao})
    }
  }

  const salvar = () => {
    if(atracaoSelecionada) {
      axios.post('/api/atracoes', atracaoSelecionada)
      setAtracoes(atracoes.map(atracao => atracao._id === atracaoSelecionada._id ? atracaoSelecionada : atracao))
      setAtracaoSelecionada(undefined)
    }
  }

  const removerAtracao = () => {
    if (atracaoSelecionada) {
      axios.delete(`/api/atracoes`, { data: { id: atracaoSelecionada._id } })
      setAtracoes(atracoes.filter((atracao) => atracao._id !== atracaoSelecionada._id))
      setAtracaoSelecionada(undefined)
    }
  }

  return <div className={atracaoSelecionada ? styles.visivel: styles.invisivel}>
    { atracaoSelecionada && (
      <>
        <div className={styles.caixaInput}>
          <label>Nome:</label>
          <input type="text" value={atracaoSelecionada.nome} onChange={atualizarNomeAtracao}/>
        </div>
        <div className={styles.caixaInput}>
          <label>Descrição:</label>
          <textarea value={atracaoSelecionada.descricao} onChange={atualizarDescricaoAtracao} />
        </div>
        <div className={styles.botoes}>
          <button onClick={salvar}>Salvar</button>
          <button onClick={removerAtracao}>Deletar</button>
          <button onClick={() => setAtracaoSelecionada(undefined)}>Cancelar</button>
        </div>
      </>
    )}

  </div>
}

export default AtracaoComponente