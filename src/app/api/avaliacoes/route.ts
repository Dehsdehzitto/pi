import { Avaliacao } from "@/app/modelo/modelo"
import { NextRequest } from "next/server"


export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const avaliacao: Avaliacao = {
    nota: body.nota,
    usuarioId: body.usuarioId,
    atracaoId: body.atracaoId,
  }
  // salva atração no banco de dados
  return null
}

