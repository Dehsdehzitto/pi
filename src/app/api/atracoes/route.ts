
// adicionar comentário para uma atração
// id da atração, id do usuário, comentário

import { Atracao } from "@/app/modelo/modelo"
import { NextRequest } from "next/server"

// avaliar uma atração
// id da atração, id do usuário, nota (1 a 5)

// criar uma atração (latidude, longitude, nome, descrição)
export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const atracao: Atracao = {
    nome: body.nome,
    descricao: body.descricao,
    latitude: body.latitude,
    longitude: body.longitude,
    comentarios: [],
    avaliacoes: []
  }
  // salva atração no banco de dados
  return null
}

// pega as atrações (pega latitude, longitude -> busca as 10 atrações mais proximas)
export const GET = (request: NextRequest) => {
  // localhost:3000/api/atracoes?latidude=123&longitude=456
  const searchParams = request.nextUrl.searchParams
  const latitude = searchParams.get("latitude")
  const longitude = searchParams.get("longitude")

  // pega os ultimos registros do banco de dados
  return null
}

//http://localhost:3000/api/atracoes