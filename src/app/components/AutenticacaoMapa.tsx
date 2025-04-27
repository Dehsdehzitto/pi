"use client"

import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

const AutenticacaoMapa = ({ children }: { children: React.ReactNode }) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  return <Wrapper apiKey={apiKey!}>{children}</Wrapper>;
};

export default AutenticacaoMapa