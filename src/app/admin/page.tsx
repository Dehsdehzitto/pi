import AppProvider from '../components/AppProvider'
import Atracao from '../components/Atracao'
import AutenticacaoMapa from '../components/AutenticacaoMapa'
import Mapa from '../components/Mapa'
import styles from './page.module.css'

const Admin = () => {
  return <AppProvider>
  <div className={styles.pagina}>
    <div className={styles.parteSuperior}>
      <div className={styles.grupoPesquisa}>
        <input className={styles.barraDePesquisa} placeholder='Desdehzitto'/>
        <button className={styles.botaoDePesquisa}>Pesquisar?</button>
      </div>
      <img className={styles.iconeAvatar}></img>
    </div>
    <div className={styles.mapa}>
    <AutenticacaoMapa>
      <Mapa />
    </AutenticacaoMapa>
    
    </div>
    <div className={styles.atracao}>
      <Atracao />
    </div>
  </div>
  </AppProvider>
}

export default Admin