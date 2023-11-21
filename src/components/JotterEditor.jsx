

export default function JotterEditor({ body, setBody }) {
  return (
    <div>
        <textarea name="jottereditor" value={body} cols="30" rows="10"></textarea>
    </div>
  )
}
