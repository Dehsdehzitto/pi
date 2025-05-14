"use client"

import React, { useEffect, useRef } from "react";
import styles from "./mapa.module.css";

const DEFAULT_CENTER = { lat: 28.4595, lng: 77.0266 }; // Gurgaon coordinates
const DEFAULT_ZOOM = 7; // You can change this according to your needs, or you can also recive this as a prop to make map component more reusable.

const Mapa = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
      });
    }
  }, [ref]);

  return (
    <div
      ref={ref}
      className={styles.mapa} //You can also recive this as a prop
    />
  );
};

export default Mapa