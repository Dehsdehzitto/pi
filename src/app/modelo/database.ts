import { MongoClient, ObjectId } from "mongodb"
import { Atracao, Avaliacao, Comentario } from "./modelo"

const options = {}
const cliente = new MongoClient('mongodb://localhost:27017', options)

const conexao = cliente.connect()

const bancoAtracoes = async () => {
  const conectar = await conexao
  const banco = await conectar.db()
  const bancoAtracoes = banco.collection<Atracao>('atracoes')
  return bancoAtracoes
}

export const buscarAtracoesMaisProximas = async (latitude: number, longitude: number) => {
  const banco = await bancoAtracoes()
  await banco.createIndex({ localizacao: "2dsphere" })
  const atracoes = banco.find({
    localizacao: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude]
        }

      }
    }
  }).limit(10).toArray()
  return atracoes
}

export const deletarAtracao = async (id: string) => {
  const banco = await bancoAtracoes()
  const resultado = await banco.deleteOne({ _id: new ObjectId(id) })
  return resultado
}

export const criarAtracao = async (atracao: Atracao) => {
  const banco = await bancoAtracoes()
  if(atracao._id) {
    const resultado = await banco.updateOne({ _id: new ObjectId(atracao._id) }, 
      { $set: { localizacao: atracao.localizacao, nome: atracao.nome, descricao: atracao.descricao} })
    const id = resultado.upsertedId
    if(id) {
      atracao._id = id
    }
    return atracao
  } else {
    const resultado = await banco.insertOne(atracao)
    atracao._id = resultado.insertedId
    return atracao
  }
}

export const adicionarComentario = async (comentario: Comentario) => {
  const banco = await bancoAtracoes()
  const atracao = await banco.findOne<Atracao>({ _id: new ObjectId(comentario.atracaoId) })
  const comentarios = atracao?.comentarios.filter(c => c.usuarioId !== comentario.usuarioId) || []
  comentarios.push(comentario)
  const resultado = await banco.updateOne(
    { _id: new ObjectId(comentario.atracaoId) },
    { $set: { comentarios } }
  )
}

export const adicionarAvaliacao = async (avaliacao: Avaliacao) => {
  const banco = await bancoAtracoes()
  const atracao = await banco.findOne<Atracao>({ _id: new ObjectId(avaliacao.atracaoId) })
  const avaliacoes = atracao?.avaliacoes.filter(c => c.usuarioId !== avaliacao.usuarioId) || []
  avaliacoes.push(avaliacao)
  const resultado = await banco.updateOne(
    { _id: new ObjectId(avaliacao.atracaoId) },
    { $set: { avaliacoes } }
  )
}