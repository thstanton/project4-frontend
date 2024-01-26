export default function JotterEditor({ body, setBody, complete }) {
  return (
    <textarea
      name="jottereditor"
      value={body}
      onChange={(e) => setBody(e.target.value)}
      readOnly={complete}
      className="textarea textarea-bordered h-48 w-full text-4xl"
    />
  );
}
