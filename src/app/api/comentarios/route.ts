
import { adicionarComentario } from "@/app/modelo/database"
import { Comentario } from "@/app/modelo/modelo"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
  const body = await request.json()
  const comentario = {
    atracaoId: body.atracaoId,
    comentario: body.comentario,
    usuarioId: body.usuarioId,
  }
  adicionarComentario(comentario)
  return NextResponse.json({ok: true})
}
