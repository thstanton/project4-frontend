export default function ContextForm({
  context,
  setContext,
  handleCreateOverview,
}) {
  function handleChange(e) {
    const { name, value } = e.target;
    setContext((prevContext) => ({ ...prevContext, [name]: value }));
  }

  return (
    <div>
      <form onSubmit={handleCreateOverview}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={context.title}
          onChange={handleChange}
          required
        />
        <label>Instructions:</label>
        <input
          type="textarea"
          name="instructions"
          value={context.instructions}
          onChange={handleChange}
          required
        />
        <label>Prompt:</label>
        <input
          type="text"
          name="prompt"
          value={context.prompt}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit">Create Overview</button>
      </form>
    </div>
  );
}
