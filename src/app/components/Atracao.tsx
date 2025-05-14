"use client"

import { useState } from "react"
import styles from './atracao.module.css'

const Atracao = () => {

  const [visivel, setVisivel] = useState(true)

  return <div onClick={() => setVisivel(false)} className={visivel ? styles.visivel: styles.invisivel}>oi</div>
}

export default Atracao