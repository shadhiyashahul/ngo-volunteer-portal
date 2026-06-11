type VolunteerCardProps = {
  volunteer: any;
  index: number;
  deleteVolunteer: (index: number) => void;
  editVolunteer: (index: number) => void;
};

function VolunteerCard({
  volunteer,
  index,
  deleteVolunteer,
  editVolunteer,
}: VolunteerCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-bold">
        {volunteer.name}
      </h3>

      <p>Email: {volunteer.email}</p>
      <p>Mobile: {volunteer.mobile}</p>
      <p>City: {volunteer.city}</p>
      <p>Skills: {volunteer.skills}</p>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => editVolunteer(index)}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
  onClick={() => deleteVolunteer(volunteer.id)}
  className="bg-red-500 text-white px-3 py-1 rounded"
>
  Delete
</button>
      </div>
    </div>
  );
}

export default VolunteerCard;