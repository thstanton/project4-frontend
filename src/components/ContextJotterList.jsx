import { useEffect, useState } from "react";
import { jottersAPI } from "../utils/jotters-api";
import TeacherJotterCard from "./TeacherJotterCard";

export default function ContextJotterList({ id }) {
  const [jotters, setJotters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await jottersAPI.context(id);
        if (response.status === 200) {
          setJotters(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="card card-bordered">
      <div className="card-body">
        <h1 className="text-lg font-bold">Jotters:</h1>
        <div>
          {jotters.length ? (
            jotters.map((jotter) => (
              <TeacherJotterCard key={jotter.id} jotter={jotter} />
            ))
          ) : (
            <p>No jotters created yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
