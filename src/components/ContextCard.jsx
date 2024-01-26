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
    <div className="card h-60 w-60 drop-shadow-lg hover:scale-105 bg-orange-200" onClick={handleJotterCreate}>
      <div className="card-body flex flex-col justify-between">
        <h4 className="font-bold text-lg">{context.title}</h4>
        <h5 className="badge badge-primary badge-lg p-3">Set by: {context.author}</h5>
      </div>
    </div>
  );
}
