import TeacherContextCard from "./TeacherContextCard";

export default function TeacherContextCardList({ contexts }) {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-3">
      {contexts.map((context) => (
        <TeacherContextCard key={context.id} context={context} />
      ))}
    </div>
  );
}
