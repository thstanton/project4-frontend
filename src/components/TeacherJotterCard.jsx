import { Link } from "react-router-dom";

export default function TeacherJotterCard({ jotter }) {
  return (
    <Link href={`/jotter/${jotter.id}`}>
      <div className="card">
        <div className="card-body">
          {jotter.author.first_name}
          {jotter.author.pupil_classes.map((pupilClass) => (
            <>
              <p>{pupilClass.name}</p>
              <p>{pupilClass.year_group}</p>
            </>
          ))}
        </div>
      </div>
    </Link>
  );
}
