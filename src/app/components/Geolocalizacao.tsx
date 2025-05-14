"use client"

import React, { useEffect, useState } from 'react'

const Geolocalizacao = () => {

  const [localizacao, setLocalizacao] = useState<GeolocationPosition | null>(null)

  const success = (position: GeolocationPosition) => {
    setLocalizacao(position)
  }

  const error = () => {
    console.error('Não consegui pegar a localização da pessoa')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, error)
  }, [])


  return <></>
}

export default Geolocalizacao