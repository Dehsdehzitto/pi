'use client'

import { useContext, useEffect } from 'react'
import { AppContext } from './AppProvider';
import styles from './criar.module.css';


const CriarAtracao = () => {
  const {adicionarAtracaoAtivo, setAdicionarAtracaoAtivo, atracaoSelecionada, atracoes} = useContext(AppContext)

  useEffect(() => {
    setAdicionarAtracaoAtivo(false)
  }, [atracoes])

  return atracaoSelecionada ? <></> : <div className={styles.criarAtracao} onClick={() => setAdicionarAtracaoAtivo(true)}>
    {adicionarAtracaoAtivo ? <div>🗺️</div> : <div>➕</div>}
  </div>
}

export default CriarAtracao