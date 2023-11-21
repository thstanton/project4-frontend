

export default function JotterEditor({ body, setBody, complete }) {

    return (
        <textarea 
            name="jottereditor" 
            value={body} 
            onChange={e => setBody(e.target.value)} 
            readOnly={complete}
            className="text-4xl w-full h-48"
        />

    )
}
