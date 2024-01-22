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
    <div className="card h-52 w-52" onClick={handleJotterCreate}>
      <div className="card-body">
        <h4>{context.title}</h4>
      </div>
      <div className="card-actions">
        <h5>Set by: {context.author}</h5>
      </div>
    </div>
  );
}
