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
      <div>
        <button className="btn" onClick={() => navigate("/contexts/create")}>
          Create new context
        </button>
      </div>
      <div>
        {dataLoaded ? (
          <TeacherContextCardList contexts={contexts} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
