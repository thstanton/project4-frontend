import { Link } from "react-router-dom";

export default function JotterCard({ jotter }) {
  return (
    <Link to={`/editor/${jotter.id}`}>
      <div className="card">
        <div className="card-body">
          <h4>{jotter.context.title}</h4>
        </div>
      </div>
    </Link>
  );
}
