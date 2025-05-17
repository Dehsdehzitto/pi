"use client"

import { useState, useContext } from "react"
import styles from './atracao.module.css'
import { AppContext } from "./AppProvider"

const Atracao = () => {

  const { atracaoSelecionada } = useContext(AppContext)
  console.log(atracaoSelecionada)

  return <div className={atracaoSelecionada ? styles.visivel: styles.invisivel}>
    { atracaoSelecionada && (
      <>
        <div className={styles.caixaInput}>
          <label>Nome:</label>
          <input type="text" value={atracaoSelecionada.nome} />
        </div>
        <div className={styles.caixaInput}>
          <label>Descrição:</label>
          <textarea value={atracaoSelecionada.descricao} />
        </div>
        <button>Cancelar</button>
        <button>Salvar</button>
        <button>Deletar</button>
      </>
    )}

  </div>
}

export default Atracao