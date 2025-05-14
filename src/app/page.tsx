import styles from "./page.module.css";
import Mapa from "./components/Mapa";
import AutenticacaoMapa from "./components/AutenticacaoMapa";

const Pagina = () => {
  return <div className={styles.pagina}>
    <div className={styles.card}>
      <h1>Procure Eventos ou Atrações blablabla?</h1>
      <div className={styles.buttonArea}>
        <input className={styles.input} type="text" placeholder="Digite aqui sua busca" />
        <button className={styles.button}>🔎</button>
      </div>
    </div>
    <AutenticacaoMapa>
      <Mapa />
    </AutenticacaoMapa>
  </div>

}

export default Pagina