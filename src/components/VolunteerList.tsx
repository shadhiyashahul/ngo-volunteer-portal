import VolunteerCard from "./VolunteerCard";
import EmptyState from "./EmptyState";

type VolunteerListProps = {
  volunteers: any[];
  deleteVolunteer: (id: number) => void;
  editVolunteer: (index: number) => void;
};

function VolunteerList({
  volunteers,
  deleteVolunteer,
  editVolunteer,
}: VolunteerListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Volunteers
      </h2>

      {volunteers.length === 0 ? (
        <EmptyState
          message="No Volunteers Found"
        />
      ) : (
        volunteers.map((volunteer, index) => (
          <VolunteerCard
            key={index}
            volunteer={volunteer}
            index={index}
            deleteVolunteer={deleteVolunteer}
            editVolunteer={editVolunteer}
          />
        ))
      )}
    </div>
  );
}

export default VolunteerList;