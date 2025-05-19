
import { buscarAtracoesMaisProximas, criarAtracao, deletarAtracao } from "@/app/modelo/database"
import { Atracao } from "@/app/modelo/modelo"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const atracao: Atracao = {
    _id: body._id,
    nome: body.nome,
    descricao: body.descricao,
    localizacao: body.localizacao,
    comentarios: [],
    avaliacoes: []
  }
  const atracaoCriada = await criarAtracao(atracao)
  return NextResponse.json(atracaoCriada)
}

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const latitude = +searchParams.get("latitude")!
  const longitude = +searchParams.get("longitude")!
  const atracoes = await buscarAtracoesMaisProximas(latitude, longitude)
  return NextResponse.json(atracoes)
}

export const DELETE = async (request: NextRequest) => {
  const body = await request.json()
  const id = body.id
  deletarAtracao(id)
  return NextResponse.json({ok: true})
}