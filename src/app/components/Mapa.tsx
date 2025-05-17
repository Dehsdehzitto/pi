"use client"

import React, { useEffect, useRef, useContext } from "react";
import styles from "./mapa.module.css";
import { AppContext } from "./AppProvider";
import axios from "axios";
import { Atracao } from "../modelo/modelo";

const DEFAULT_CENTER = { lat: 28.4595, lng: 77.0266 }; // Gurgaon coordinates
const DEFAULT_ZOOM = 7; // You can change this according to your needs, or you can also recive this as a prop to make map component more reusable.

const Mapa = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { localizacao, setMapa, setAtracoes, atracoes, mapa, setAtracaoSelecionada } = useContext(AppContext)
  
  const carregarAtracoes = async () => {
    try {
      // TODO carregar nova lista de atrações
      const response = await axios.get<Atracao[]>(`/api/atracoes?latitude=${localizacao.lat}&longitude=${localizacao.lng}`);
      setAtracoes(response.data)
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  }

  useEffect(() => {
    carregarAtracoes()
  }, [localizacao])

  useEffect(() => {
    atracoes.map((atracao) => {
      const marker = new window.google.maps.Marker({
        position: { lat: atracao.localizacao.coordinates[1], lng: atracao.localizacao.coordinates[0] },
        map: mapa,
        title: atracao.nome,
        draggable: true, 
        animation: google.maps.Animation.DROP
      });
      marker.addListener("click", () => {
        setAtracaoSelecionada(atracao);
      });
    })
  }, [atracoes])

  useEffect(() => {
    if (ref.current) {
      const mapa = new window.google.maps.Map(ref.current, {
        center: localizacao,
        zoom: 14,
        fullscreenControl: false,
        streetViewControl: false,
        colorScheme: 'DARK',
        mapTypeControl: false,
        clickableIcons: false,
        disableDefaultUI: false,
        styles: [
          {
            featureType: 'poi',
            stylers: [{visibility: 'off'}],
          },
        ],
      });
      setMapa(mapa)
    }
  }, [ref, localizacao]);

  return (
    <div
      ref={ref}
      className={styles.mapa} //You can also recive this as a prop
    />
  );
};

export default Mapa