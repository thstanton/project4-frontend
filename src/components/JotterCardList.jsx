import JotterCard from "./JotterCard";

export default function JotterCardList({ jotters }) {
  return (
    <div className="container flex min-h-[60] flex-row flex-wrap gap-6">
      {jotters.length ? (
        jotters.map((jotter) => <JotterCard key={jotter.id} jotter={jotter} />)
      ) : (
        <p className="text-lg">&#9989; You're up-to-date!</p>
      )}
    </div>
  );
}
