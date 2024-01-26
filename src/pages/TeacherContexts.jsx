import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { contextsAPI } from "../utils/contexts-api";
import TeacherContextCardList from "../components/TeacherContextCardList";

export default function TeacherContexts() {
  const navigate = useNavigate();
  const [contexts, setContexts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await contextsAPI.own();
        if (response.status === 200) {
          setContexts(response.data);
          setDataLoaded(true);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className="mb-3 flex justify-end">
        <button
          className="btn btn-info"
          onClick={() => navigate("/contexts/create")}
        >
          Create new context
        </button>
      </div>
      <div>
        {dataLoaded ? (
          <TeacherContextCardList contexts={contexts} />
        ) : (
          <div className="flex justify-center">
            <div className="loading loading-dots loading-lg mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
}
