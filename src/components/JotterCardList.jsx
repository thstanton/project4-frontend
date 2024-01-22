import JotterCard from "./JotterCard";

export default function JotterCardList({ jotters }) {
  return (
    <div className="container flex flex-row">
      {jotters.map((jotter) => (
        <JotterCard key={jotter.id} jotter={jotter} />
      ))}
    </div>
  );
}
