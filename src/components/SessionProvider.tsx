"use client";
import { createContext, useContext } from "react";

type Session = {
  user: {
    id: string;
    name?: string;
    email?: string;
    [key: string]: any;
  }
} | null;

const SessionContext = createContext<Session>(null);

export function SessionProvider({
  session,
  children,
}: {
  session: Session;
  children: React.ReactNode;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext);
}
