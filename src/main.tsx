import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { VolunteerProvider } from "./context/VolunteerContext";
import { EventProvider } from "./context/EventContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VolunteerProvider>
      <EventProvider>
        <App />
      </EventProvider>
    </VolunteerProvider>
  </StrictMode>
);