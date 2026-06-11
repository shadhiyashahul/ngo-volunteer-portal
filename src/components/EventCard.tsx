type EventCardProps = {
  event: any;
  index: number;
  deleteEvent: (index: number) => void;
  editEvent: (index: number) => void;
};

function EventCard({
  event,
  index,
  deleteEvent,
  editEvent,
}: EventCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold">
        {event.eventName}
      </h3>

      <p>{event.description}</p>

      <p>Date: {event.date}</p>

      <p>Location: {event.location}</p>

      <p>
        Required Volunteers:{" "}
        {event.requiredVolunteers}
      </p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => editEvent(index)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => deleteEvent(event.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;