'use client'

import { createContext, useState, useContext } from 'react'
import { Atracao } from "../modelo/modelo";

interface Coordenadas {
  lat: number
  lng: number
}

const SAO_PAULO = {lat: -23.5489, lng: -46.6389};

interface Propriedades {
  atracaoSelecionada?: Atracao
  setAtracaoSelecionada: (atracao: Atracao) => void
  atracoes: Atracao[]
  setAtracoes: (atracoes: Atracao[]) => void
  localizacao: Coordenadas
  setLocalizacao: (localizacao: Coordenadas) => void
  adicionarAtracaoAtivo : boolean
  setAdicionarAtracaoAtivo : (adicionarAtracaoAtivo : boolean) => void
  mapa?: google.maps.Map
  setMapa: (mapa: google.maps.Map) => void
}

export const AppContext = createContext<Propriedades>({localizacao: SAO_PAULO, atracoes: []} as unknown as Propriedades)

const AppProviderInterno = ({children}: React.PropsWithChildren) => {
  const context = useContext(AppContext)
  return context.localizacao ? <>{children}</> : <></> 
}

const AppProvider = ({children}: React.PropsWithChildren) => {
  const [atracaoSelecionada, setAtracaoSelecionada] = useState<Atracao | undefined>(undefined)
  const [atracoes, setAtracoes] = useState<Atracao[]>([])
  const [localizacao, setLocalizacao] = useState<Coordenadas>(SAO_PAULO)
  const [adicionarAtracaoAtivo, setAdicionarAtracaoAtivo] = useState<boolean>(false)
  const [mapa, setMapa] = useState<google.maps.Map>()

  return (
    <AppContext.Provider value={{ mapa, setMapa, atracaoSelecionada, setAtracaoSelecionada, atracoes, setAtracoes, localizacao, setLocalizacao, adicionarAtracaoAtivo, setAdicionarAtracaoAtivo }}>
      <AppProviderInterno>{children}</AppProviderInterno>
    </AppContext.Provider>
  )
}

export default AppProvider