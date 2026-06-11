
import EventList from "./EventList";
import { useContext, useState, useEffect } from "react";
import { EventContext } from "../context/EventContext";
import axios from "axios";
function EventForm() {
  const { events, setEvents } =
  useContext(EventContext);

  const [eventName, setEventName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [date, setDate] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [requiredVolunteers, setRequiredVolunteers] =
    useState("");

  const [isEditing, setIsEditing] =
    useState(false);

  const [editIndex, setEditIndex] =
    useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "events",
      JSON.stringify(events)
    );
  }, [events]);
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/events"
        );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchEvents();
}, []);

  const clearForm = () => {
    setEventName("");
    setDescription("");
    setDate("");
    setLocation("");
    setRequiredVolunteers("");
  };

  const handleSubmit = async () => {
  if (
    !eventName ||
    !description ||
    !date ||
    !location ||
    !requiredVolunteers
  ) {
    alert("Please fill all fields");
    return;
  }

  const newEvent = {
    eventName,
    description,
    date,
    location,
    requiredVolunteers,
  };

  try {
    await axios.post(
      "http://localhost:5000/events",
      newEvent
    );

    setEvents([
      ...events,
      newEvent,
    ]);

    clearForm();

    alert("Event Added!");
  } catch (error) {
    console.log(error);
    alert("Failed to add event");
  }
};

  const deleteEvent = async (
  id: number
) => {
  try {
    await axios.delete(
      `http://localhost:5000/events/${id}`
    );

    const updatedEvents =
      events.filter(
        (event: any) =>
          event.id !== id
      );

    setEvents(updatedEvents);
  } catch (error) {
    console.log(error);
  }
};

  const editEvent = (
    index: number
  ) => {
    const event = events[index];

    setEventName(event.eventName);
    setDescription(event.description);
    setDate(event.date);
    setLocation(event.location);
    setRequiredVolunteers(
      event.requiredVolunteers
    );

    setEditIndex(index);
    setIsEditing(true);
  };

  const updateEvent = async () => {
  if (editIndex === null) return;

  const event =
    events[editIndex];

  try {
    await axios.put(
      `http://localhost:5000/events/${event.id}`,
      {
        eventName,
        description,
        date,
        location,
        requiredVolunteers,
      }
    );

    const updatedEvents = [
      ...events,
    ];

    updatedEvents[editIndex] = {
      ...event,
      eventName,
      description,
      date,
      location,
      requiredVolunteers,
    };

    setEvents(updatedEvents);

    clearForm();

    setEditIndex(null);
    setIsEditing(false);

    alert("Event Updated!");
  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Create Event
        </h2>

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) =>
            setEventName(e.target.value)
          }
        />

        <textarea
          className="w-full border p-3 rounded mb-3"
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="number"
          placeholder="Required Volunteers"
          value={requiredVolunteers}
          onChange={(e) =>
            setRequiredVolunteers(
              e.target.value
            )
          }
        />

        {isEditing ? (
          <button
            onClick={updateEvent}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Event
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Event
          </button>
        )}
      </div>

      <div className="mt-6">
        <EventList
          events={events}
          deleteEvent={deleteEvent}
          editEvent={editEvent}
        />
      </div>
    </div>
  );
}

export default EventForm;