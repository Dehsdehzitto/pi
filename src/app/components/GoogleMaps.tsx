import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

export const GoogleMapsWrapper = ({ children }: { children: React.ReactNode }) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; 
  if (!apiKey) {
    return <div></div>;
  }
  return <Wrapper apiKey={apiKey!}>{children}</Wrapper>;
};