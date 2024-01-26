import { Link } from "react-router-dom";

export default function TeacherContextCard({ context }) {
  return (
    <Link to={`/contexts/${context.id}`}>
      <div className="card card-side h-80 w-full bg-stone-200 hover:drop-shadow-lg">
        {context.images[0] && (
          <figure className="h-80 w-80">
            <img src={`${context.images[0]}`} alt="" className="w-full h-full object-cover" />
          </figure>
        )}
        <div className="card-body flex flex-col justify-between">
          <h4 className="card-title text-lg font-bold text-neutral-700">
            {context.title}
          </h4>

          {context.assigned_classes.length ? (
            <div>
              <p>Assigned to:</p>
              {context.assigned_classes.map((pupilClass) => (
                <p
                  key={pupilClass.id}
                  className="badge badge-info mb-2 h-8 w-40"
                >
                  {pupilClass.name}
                </p>
              ))}
            </div>
          ) : (
            <p>Not assigned to any classes</p>
          )}
        </div>
      </div>
    </Link>
  );
}
