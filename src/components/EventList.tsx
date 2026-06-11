import EventCard from "./EventCard";
import EmptyState from "./EmptyState";

type EventListProps = {
  events: any[];
  deleteEvent: (id: number) => void;
  editEvent: (index: number) => void;
};

function EventList({
  events,
  deleteEvent,
  editEvent,
}: EventListProps) {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">
        Events
      </h2>

      {
  events.length === 0 ? (
    <EmptyState
      message="No Events Found"
    />
  ) : (
    events.map((event, index) => (
      <EventCard
        key={index}
        event={event}
        index={index}
        deleteEvent={deleteEvent}
        editEvent={editEvent}
      />
    ))
  )
}
    </div>
  );
}

export default EventList;