import { Link } from "react-router-dom";

export default function JotterCard({ jotter }) {
  return (
    <Link to={`/editor/${jotter.id}`}>
      <div className="card h-60 w-60 drop-shadow-lg bg-orange-200 mb-3">
        <div className="card-body">
          <h4 className="text-lg font-bold">{jotter.context.title}</h4>
        </div>
      </div>
    </Link>
  );
}
