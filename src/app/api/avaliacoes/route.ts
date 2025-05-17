import { adicionarAvaliacao } from "@/app/modelo/database"
import { Avaliacao } from "@/app/modelo/modelo"
import { NextRequest, NextResponse } from "next/server"


export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const avaliacao: Avaliacao = {
    nota: body.nota,
    usuarioId: body.usuarioId,
    atracaoId: body.atracaoId,
  }
  adicionarAvaliacao(avaliacao)
  return NextResponse.json({ok: true})
}

