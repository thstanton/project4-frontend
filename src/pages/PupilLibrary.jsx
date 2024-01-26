import { useEffect, useState } from "react";
import { jottersAPI } from "../utils/jotters-api";
import JotterCardList from "../components/JotterCardList";

export default function PupilHome({ user, setUser }) {
  const [finished, setFinished] = useState(null);
  const [pending, setPending] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const finishedData = await jottersAPI.finished();
        setFinished(finishedData.data);
        setPending(false);
      } catch (err) {
        throw new Error(err);
      }
    }
    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="font-display text-3xl mb-3">&#128218; My Library</h1>
        {!pending ? (
          <JotterCardList jotters={finished} />
        ) : (
          <div className="skeleton w-60 h-60"></div>
        )}
      </div>
    </div>
  );
}
