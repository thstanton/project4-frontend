import ContextCard from "./ContextCard";

export default function ContextCardList({ contexts }) {
  return (
    <div className="flex flex-row flex-wrap gap-6 h-60">
      {contexts.length ? contexts.map((context) => (
        <ContextCard key={context.id} context={context} />
      )) :
      <p className="text-lg">&#9989; You're up-to-date!</p>
      }
    </div>
  );
}
