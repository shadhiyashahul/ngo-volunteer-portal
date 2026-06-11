
import { useContext } from "react";
import { VolunteerContext } from "../context/VolunteerContext";
import { EventContext } from "../context/EventContext";
import DashboardWidget from "./DashboardWidget";

function Dashboard() {
  const { volunteers } =
    useContext(VolunteerContext);

  const { events } =
    useContext(EventContext);

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <DashboardWidget
        title="Total Volunteers"
        count={volunteers.length}
      />

      <DashboardWidget
        title="Total Events"
        count={events.length}
      />
    </div>
  );
}

export default Dashboard;