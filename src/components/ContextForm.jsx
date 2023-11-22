


export default function ContextForm({ context, setContext }) {

    function handleChange(e) {
        const { name, value } = e.target
        setContext(prevContext => ({...prevContext, [ name ]: value }))
    }

    return (
        <div>
            <label>Title:</label>
            <input 
                type="text"
                name="title"
                value={context.title}
                onChange={handleChange}
            />
            <label>Instructions:</label>
            <input 
                type="textarea"
                name="instructions"
                value={context.instructions}
                onChange={handleChange}
            />
            <label>Prompt:</label>
            <input 
                type="text"
                name="prompt"
                value={context.prompt}
                onChange={handleChange}
            />
        </div>
    )
}
