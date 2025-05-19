"use client"

import { useContext, useEffect, useState } from "react";
import styles from "./page.module.css";
import Mapa from "./components/Mapa";
import AutenticacaoMapa from "./components/AutenticacaoMapa";
import Geolocalizacao from "./components/Geolocalizacao";
import AppProvider, { AppContext } from "./components/AppProvider";
import AtracaoAvaliacao from "./components/AtracaoAvaliacao";

const PegaUsuario = () => {
  const { usuario, setUsuario} = useContext(AppContext)
  const [nome, setNome] = useState("")
  return usuario ? null : <div className={styles.pagina}>
  <input placeholder="digite o nome do usuário" onChange={e => setNome(e.target.value)} />
  <button onClick={() => setUsuario(nome)}>Confirmar</button>
</div>
}

const TelaPrincipal = () => {
  const { usuario, setUsuario} = useContext(AppContext)
  return usuario ? <div className={styles.pagina}>
  <AutenticacaoMapa>
    <Mapa />
  </AutenticacaoMapa>
  <AtracaoAvaliacao />
</div> : null 
}
const Pagina = () => {

  return (<AppProvider>
      <TelaPrincipal />
      <PegaUsuario />
    </AppProvider>
  )

}


export default Pagina