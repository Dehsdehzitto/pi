import AppProvider from '../components/AppProvider'
import AtracaoComponente from '../components/AtracaoComponente'
import AutenticacaoMapa from '../components/AutenticacaoMapa'
import CriarAtracao from '../components/CriarAtracao'
import Mapa from '../components/Mapa'
import styles from './page.module.css'

const Admin = () => {
  return <AppProvider>
  <div className={styles.pagina}>
    <div className={styles.mapa}>
    <AutenticacaoMapa>
      <Mapa />
    </AutenticacaoMapa>
    
    </div>
    <div className={styles.atracao}>
      <AtracaoComponente />
    </div>
    <CriarAtracao /> 
  </div>
  </AppProvider>
}

export default Admin