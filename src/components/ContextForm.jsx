export default function ContextForm({
  context,
  setContext,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setContext((prevContext) => ({ ...prevContext, [name]: value }));
  }

  return (
    <div>
      <form>
        <label className="mr-3">Title:</label>
        <input
          type="text"
          name="title"
          value={context.title}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
        <label>Instructions:</label>
        <input
          type="textarea"
          name="instructions"
          value={context.instructions}
          onChange={handleChange}
          className="textarea textarea-bordered w-full mb-3"
          required
        />
        <label>Prompt:</label>
        <input
          type="text"
          name="prompt"
          value={context.prompt}
          onChange={handleChange}
          className="input input-bordered w-full mb-3"
          required
        />
      </form>
    </div>
  );
}
