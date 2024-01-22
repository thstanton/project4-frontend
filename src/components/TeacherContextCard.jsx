import { Link } from "react-router-dom";

export default function TeacherContextCard({ context }) {

  return (
    <Link href={`/contexts/${context.id}`}>
      <div className="card h-52 w-52">
        <h4 className="card-title text-neutral-200 text-center text-lg font-bold">
          {context.title}
        </h4>

        {context.assigned_classes.length ? (
          <>
            <p>Assigned to:</p>
            {context.assigned_classes.map((pupilClass) => (
              <p key={pupilClass.id}>{pupilClass.name}</p>
            ))}
          </>
        ) : (
          <p>Not assigned to any classes</p>
        )}
      </div>
    </Link>
  );
}
