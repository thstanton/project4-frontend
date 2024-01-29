export default function ModalV2({ id, prompt, subPrompt, action, buttonText }) {
  return (
    <dialog id={id} className="modal">
      <div className="modal-box">
        <h3>{prompt}</h3>
        <p>{subPrompt}</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Cancel</button>
          </form>
          <button className="btn" onClick={action}>
            {buttonText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
