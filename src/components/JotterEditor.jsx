export default function JotterEditor({ body, setBody, complete }) {
  return (
    <textarea
      name="jottereditor"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      readOnly={complete}
      className="h-48 w-full text-4xl"
    />
  );
}
