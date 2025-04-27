import styles from "./page.module.css";
import Mapa from "./components/Mapa";
import AutenticacaoMapa from "./components/AutenticacaoMapa";

const Pagina = () => {
  return <div className={styles.pagina}>
    <div className="caixaBarraDeBusca">
      <input className={styles.input} type="text" placeholder="Digite aqui sua busca" />
    </div>
    <AutenticacaoMapa>
      <Mapa />
    </AutenticacaoMapa>
  </div>

}

export default Pagina