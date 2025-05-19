import { ObjectId } from "mongodb"

export interface Comentario {
  usuarioId: string
  comentario: string
  atracaoId: ObjectId
}

export interface Avaliacao {
  usuarioId: string
  nota: number
  atracaoId: ObjectId
}

export interface Ponto {
  type: "Point"
  coordinates: [number, number]
}

export interface Atracao {
  _id?: ObjectId
  nome: string
  descricao: string
  localizacao: Ponto
  comentarios: Comentario[]
  avaliacoes: Avaliacao[]
}