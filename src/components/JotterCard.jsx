import { Link } from "react-router-dom";

export default function JotterCard({ jotter }) {
  return (
    <Link to={`/editor/${jotter.id}`}>
      <div className="card glass card-side mb-3 h-60 w-96 bg-orange-200 drop-shadow-lg transition duration-200 ease-in-out hover:scale-105">
        {jotter.context.images[0] && (
          <figure className="h-60 w-28">
            <img
              src={jotter.context.images[0].url}
              alt=""
              className="h-full w-full object-cover"
            />
          </figure>
        )}
        <div className="card-body">
          <h4 className="text-lg font-bold">{jotter.context.title}</h4>
        </div>
      </div>
    </Link>
  );
}
