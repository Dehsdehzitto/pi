
import { Comentario } from "@/app/modelo/modelo"
import { NextRequest } from "next/server"

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const comentario: Comentario = {
    atracaoId: body.atracaoId,
    comentario: body.comentario,
    usuarioId: body.usuarioId,
  }
  // salva atração no banco de dados
  return null
}
