"use client"

import React, { useEffect, useRef, useContext, useState } from "react";
import styles from "./mapa.module.css";
import { AppContext } from "./AppProvider";
import axios from "axios";
import { Atracao } from "../modelo/modelo";
let marcadores: google.maps.Marker[] = []

const Mapa = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { localizacao, setMapa, setAtracoes, atracoes, mapa, setAtracaoSelecionada, adicionarAtracaoAtivo } = useContext(AppContext)  

  const carregarAtracoes = async () => {
    try {
      const response = await axios.get<Atracao[]>(`/api/atracoes?latitude=${localizacao.lat}&longitude=${localizacao.lng}`);
      setAtracoes(response.data)
    } catch (error) {
      console.error("Error fetching attractions:", error);
    }
  }
  console.log(atracoes)

  useEffect(() => {
    marcadores.forEach(marcador => marcador.setMap(null))
    marcadores = atracoes.map((atracao) => criarMarcador(atracao))
  }, [atracoes])

  useEffect(() => {
    if(mapa) {
      carregarAtracoes()
    }
  }, [mapa])


  const atualizarAtracao = async (atracao: Atracao) => {
    try {
      const response = await axios.post<Atracao>(`/api/atracoes`, atracao);
      const atracaoAtualizada = response.data
      setAtracoes(atracoes.map((atracao) => atracao._id === atracaoAtualizada._id ? atracaoAtualizada : atracao))
    } catch (error) {
      console.error("Error updating attraction:", error);
    }
  }
  const criarAtracao = async (atracao: Atracao) => {
    try {
      const response = await axios.post<Atracao>(`/api/atracoes`, atracao);
      const atracaoCriada = response.data
      setAtracoes([...atracoes, atracaoCriada]);
      setAtracaoSelecionada(atracaoCriada)
    } catch (error) {
      console.error("Error creating attraction:", error);
    }
  }
  useEffect(() => {
    if (adicionarAtracaoAtivo && mapa) {
      const listener = mapa.addListener("click", (event: google.maps.MapMouseEvent) => {
        const lat = event.latLng?.lat() || 0;
        const lng = event.latLng?.lng() || 0;
        const novaAtracao: Atracao = { avaliacoes: [], comentarios: [], descricao: '', localizacao: { type: "Point", coordinates: [lng, lat] }, nome: '' }
        criarAtracao(novaAtracao)
        google.maps.event.removeListener(listener)
      });
      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [adicionarAtracaoAtivo])

  const criarMarcador = (atracao: Atracao) => {
    const marker = new window.google.maps.Marker({
      position: { lat: atracao.localizacao.coordinates[1], lng: atracao.localizacao.coordinates[0] },
      map: mapa,
      title: atracao.nome,
      draggable: true, 
    });
    marker.addListener("click", () => {
      setAtracaoSelecionada(atracao);
    });
    marker.addListener("dragend", (event: google.maps.MapMouseEvent) => {
      const lat = event.latLng?.lat() || 0;
      const lng = event.latLng?.lng() || 0;
      const novaAtracao: Atracao = { ...atracao, localizacao: { type: "Point", coordinates: [lng, lat] } }
      atualizarAtracao(novaAtracao)
    });
    return marker
  }

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
