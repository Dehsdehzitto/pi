export interface Comentario {
  id?: string
  usuarioId: string
  comentario: string
  atracaoId: string
}

export interface Avaliacao {
  id?: string
  usuarioId: string
  nota: number
  atracaoId: string
}

export interface Atracao {
  id?: string
  nome: string
  descricao: string
  latitude: number
  longitude: number
  comentarios: Comentario[]
  avaliacoes: Avaliacao[]
}