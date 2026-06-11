
import VolunteerList from "./VolunteerList";
import { useContext, useState, useEffect } from "react";
import { VolunteerContext } from "../context/VolunteerContext";
import axios from "axios";
function VolunteerForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState("");

  const { volunteers, setVolunteers } =
  useContext(VolunteerContext);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editIndex, setEditIndex] =
    useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(
      "volunteers",
      JSON.stringify(volunteers)
    );
  }, [volunteers]);
  useEffect(() => {
  const fetchVolunteers = async () => {
    try {
      const response =
        await axios.get(
          "http://localhost:5000/volunteers"
        );

      setVolunteers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchVolunteers();
}, []);

  const clearForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setCity("");
    setSkills("");
  };

  const handleSubmit = async () => {
  if (
    !name ||
    !email ||
    !mobile ||
    !city ||
    !skills
  ) {
    alert("Please fill all fields");
    return;
  }

  const newVolunteer = {
    name,
    email,
    mobile,
    city,
    skills,
  };

  try {
    await axios.post(
      "http://localhost:5000/volunteers",
      newVolunteer
    );

    setVolunteers([
      ...volunteers,
      newVolunteer,
    ]);

    clearForm();

    alert("Volunteer Added!");
  } catch (error) {
    console.log(error);
    alert("Failed to add volunteer");
  }
};

  const deleteVolunteer = async (
  id: number
) => {
  try {
    await axios.delete(
      `http://localhost:5000/volunteers/${id}`
    );

    const updatedVolunteers =
      volunteers.filter(
        (volunteer: any) =>
          volunteer.id !== id
      );

    setVolunteers(updatedVolunteers);
  } catch (error) {
    console.log(error);
  }
};

  const editVolunteer = (
    index: number
  ) => {
    const volunteer =
      volunteers[index];

    setName(volunteer.name);
    setEmail(volunteer.email);
    setMobile(volunteer.mobile);
    setCity(volunteer.city);
    setSkills(volunteer.skills);

    setEditIndex(index);
    setIsEditing(true);
  };

  const updateVolunteer = async () => {
  if (editIndex === null) return;

  const volunteer =
    volunteers[editIndex];

  try {
    await axios.put(
      `http://localhost:5000/volunteers/${volunteer.id}`,
      {
        name,
        email,
        mobile,
        city,
        skills,
      }
    );

    const updatedVolunteers = [
      ...volunteers,
    ];

    updatedVolunteers[editIndex] = {
      ...volunteer,
      name,
      email,
      mobile,
      city,
      skills,
    };

    setVolunteers(updatedVolunteers);

    clearForm();

    setEditIndex(null);
    setIsEditing(false);

    alert("Volunteer Updated!");
  } catch (error) {
    console.log(error);
    alert("Update Failed");
  }
};

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Volunteer Registration
        </h2>

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) =>
            setMobile(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) =>
            setCity(e.target.value)
          }
        />

        <input
          className="w-full border p-3 rounded mb-3"
          type="text"
          placeholder="Skills / Interests"
          value={skills}
          onChange={(e) =>
            setSkills(e.target.value)
          }
        />

        {isEditing ? (
          <button
            onClick={updateVolunteer}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Volunteer
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register Volunteer
          </button>
        )}
      </div>

      <div className="mt-6">
        <VolunteerList
          volunteers={volunteers}
          deleteVolunteer={deleteVolunteer}
          editVolunteer={editVolunteer}
        />
      </div>
    </div>
  );
}

export default VolunteerForm;