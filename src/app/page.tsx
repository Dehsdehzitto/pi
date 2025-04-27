import styles from "./page.module.css";

const Pagina = () => {
  return <div className={styles.pagina}>
    <div className="caixaBarraDeBusca">
      <input className={styles.input} type="text" placeholder="Digite aqui sua busca" />
    </div>
    <div className="imagemDeFundo">
      uma imagem de fundo
    </div>
  </div>

}

export default Pagina