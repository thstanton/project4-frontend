import { useNavigate } from "react-router-dom";
import { jottersAPI } from "../utils/jotters-api";

export default function ContextCard({ context }) {
  const navigate = useNavigate();

  async function handleJotterCreate() {
    const body = {
      context: context.id,
    };
    try {
      const response = await jottersAPI.create(body);
      console.log(response);
      if (response.status === 201) {
        return navigate(`/editor/${response.data.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="card glass card-side h-60 w-96 cursor-pointer bg-orange-200 drop-shadow-lg transition duration-200 ease-in-out hover:scale-105"
      onClick={handleJotterCreate}
    >
      {context.images[0] && (
        <figure className="h-60 w-28">
          <img
            src={context.images[0].url}
            alt=""
            className="h-full w-full object-cover"
          />
        </figure>
      )}
      <div className="card-body flex flex-col justify-between">
        <h4 className="text-lg font-bold">{context.title}</h4>
        <h5 className="badge badge-primary badge-lg p-3">
          Set by: {context.author}
        </h5>
      </div>
    </div>
  );
}
