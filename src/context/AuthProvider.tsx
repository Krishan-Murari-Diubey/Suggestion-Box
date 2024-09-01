"use client";

import { SessionProvider } from "next-auth/react";

interface AppProps {
  children: React.ReactNode;
}

export default function App({ children }: AppProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
