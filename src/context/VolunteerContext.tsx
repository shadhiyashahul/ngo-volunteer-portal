import { createContext, useState } from "react";

export const VolunteerContext =
  createContext<any>(null);

export function VolunteerProvider({
  children,
}: any) {
  const [volunteers, setVolunteers] =
    useState<any[]>([]);

  return (
    <VolunteerContext.Provider
      value={{
        volunteers,
        setVolunteers,
      }}
    >
      {children}
    </VolunteerContext.Provider>
  );
}