"use client"

import { useState, useContext, useEffect } from "react"
import styles from './atracao.module.css'
import { AppContext } from "./AppProvider"
import axios from "axios"
import { Rating } from "react-simple-star-rating"

const AtracaoAvaliacao = () => {

  const { atracaoSelecionada, setAtracaoSelecionada, setAtracoes, atracoes, usuario } = useContext(AppContext)

  const [nota, setNota] = useState(0)
  const [comentario, setComentario] = useState("")

  useEffect(() => {
    const avaliacao = atracaoSelecionada?.avaliacoes.find(avaliacao => avaliacao.usuarioId === usuario)
    setNota(avaliacao?.nota || 0)
  }, [atracaoSelecionada])

  useEffect(() => {
    const comentario = atracaoSelecionada?.comentarios.find(comentario => comentario.usuarioId === usuario)
    setComentario(comentario?.comentario || "")
  }, [atracaoSelecionada])

  const enviarNota = async (nota: number) => {
    const dados = {
      atracaoId: atracaoSelecionada?._id!,
      nota,
      usuarioId: usuario
    }
    await axios.post("/api/avaliacoes", dados)
    if(atracaoSelecionada) {
      const avaliacoes = atracaoSelecionada?.avaliacoes.filter(avaliacao => avaliacao.usuarioId !== usuario) || []
      avaliacoes.push({ nota, usuarioId: usuario, atracaoId: atracaoSelecionada?._id! })
      atracaoSelecionada.avaliacoes = avaliacoes
    }
  }

  const enviarComentario = async () => {
    const dados = {
      atracaoId: atracaoSelecionada?._id!,
      comentario,
      usuarioId: usuario
    }
    await axios.post("/api/comentarios", dados)
    if(atracaoSelecionada) {
      const comentarios = atracaoSelecionada?.comentarios.filter(comentario => comentario.usuarioId !== usuario) || []
      comentarios.push({ comentario, usuarioId: usuario, atracaoId: atracaoSelecionada?._id! })
      atracaoSelecionada.comentarios = comentarios
      setAtracaoSelecionada(undefined)
    }
  }

  const getMediaAvaliacoes = () => {
    const avaliacoes = atracaoSelecionada?.avaliacoes || []
    const media = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0) / avaliacoes.length
    return media.toFixed(2)
  }

  return <div className={atracaoSelecionada ? styles.visivel: styles.invisivel}>
    { atracaoSelecionada && (
      <>
        <h2>Nome: {atracaoSelecionada.nome}</h2>
        <h3>Descrição: {atracaoSelecionada.descricao}</h3>
        { nota && (
          <h4>Nota: {getMediaAvaliacoes()} de {atracaoSelecionada.avaliacoes.length} avaliações</h4>
        )}
        { atracaoSelecionada.comentarios.length > 0 ? (
          <div>Comentarios:
          <ul>
            {atracaoSelecionada.comentarios.map((comentario, index) => (
              <li key={index}>
                <p>{comentario.comentario}</p>
              </li>
            ))}
          </ul>
        </div>
          ): <p>Sem comentários</p>}
        <Rating onClick={(nota) => enviarNota(nota)} initialValue={nota} />
        <br />
        <div>
          <textarea value={comentario} onChange={e => setComentario(e.target.value)} className={styles.comentario} placeholder="seu comentário aqui" />
        </div>
        <div className={styles.botoes}>
          <button onClick={enviarComentario}>Enviar Comentário</button>
          <button onClick={() => setAtracaoSelecionada(undefined)}>Cancelar</button>
        </div>
      </>
    )}
  </div>
}

export default AtracaoAvaliacao