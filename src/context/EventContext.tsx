import { createContext, useState } from "react";

export const EventContext =
  createContext<any>(null);

export function EventProvider({
  children,
}: any) {
  const [events, setEvents] =
    useState<any[]>([]);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}