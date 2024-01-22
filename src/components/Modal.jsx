export default function Modal({ cardText, confirmAction, cancelAction }) {
  return (
    <div
      className="
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        overflow-y-auto 
        overflow-x-hidden 
        outline-none 
        backdrop-blur-sm
        focus:outline-none
    "
    >
      <div className="card">
        <div className="card-body">{cardText}</div>
        <div className="card-actions">
          <button className="btn" onClick={() => confirmAction()}>
            Yes
          </button>
          <button className="btn" onClick={() => cancelAction(false)}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
