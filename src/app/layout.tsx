import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desdehzitto",
  description: "Encontre atrações e eventos perto de você",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
