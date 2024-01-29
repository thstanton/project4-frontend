import { useEffect, useState } from "react";
import { jottersAPI } from "../utils/jotters-api";
import { contextsAPI } from "../utils/contexts-api";
import JotterCardList from "../components/JotterCardList";
import ContextCardList from "../components/ContextCardList";

export default function PupilHome({ user }) {
  const [contexts, setContexts] = useState(null);
  const [unfinished, setUnfinished] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const contextsData = await contextsAPI.getAssigned();
        const unfinishedData = await jottersAPI.unfinished();

        setContexts(contextsData.data);
        setUnfinished(unfinishedData.data);
        setPending(false)
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="container">
      <div className="mb-3">
        <h1 className="font-display text-3xl mb-3">&#128221; To Do List</h1>
        {!pending ? (
          <ContextCardList contexts={contexts} />
        ) : (
          <div className="skeleton w-96 h-60"></div>
        )}
      </div>
      <div>
        <h1 className="font-display text-3xl mb-3">&#128680; To Finish</h1>
        {!pending ? (
          <JotterCardList jotters={unfinished} />
        ) : (
          <div className="skeleton w-96 h-60"></div>
        )}
      </div>
    </div>
  );
}
