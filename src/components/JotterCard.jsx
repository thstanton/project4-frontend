import { Link } from "react-router-dom";

export default function JotterCard({ jotter }) {
  return (
    <Link to={`/editor/${jotter.id}`}>
      <div className="card card-bordered w-60 h-60 mb-3">
        <div className="card-body">
          <img src={jotter.context.images[0]} alt="" />
          <h4>{jotter.context.title}</h4>
        </div>
      </div>
    </Link>
  );
}
