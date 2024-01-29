import { useState } from "react";
import { classesAPI } from "../utils/classes-api";

export default function EditClass({
  setShowEditClassForm,
  classes,
  setClasses,
  setPupilClass,
  pupilClass,
  deleteClass,
}) {
  const [updatedClass, setUpdatedClass] = useState(pupilClass);

  async function handleSubmit() {
    try {
      const response = await classesAPI.edit(updatedClass);
      if (response.status === 200) {
        const updatedIndex = classes.findIndex(
          (c) => c.id === response.data.id,
        );
        if (updatedIndex !== -1) {
          const newClasses = [...classes];
          newClasses[updatedIndex] = response.data;
          setClasses(newClasses);
          setPupilClass(response.data);
          setShowEditClassForm(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdatedClass((prevClass) => ({ ...prevClass, [name]: value }));
  }

  return (
    <>
      <div>
        <label>Class name:</label>
        <input
          className="input input-bordered mb-3 w-full"
          required
          name="name"
          value={updatedClass.name}
          onChange={handleChange}
        />
        <label>Year group:</label>
        <input
          className="input input-bordered mb-3 w-full"
          required
          name="year_group"
          value={updatedClass.year_group}
          onChange={handleChange}
        />
        <button className="btn btn-success mr-3" onClick={handleSubmit}>
          Submit
        </button>
        <button
          className="btn btn-warning mr-3"
          onClick={() => setShowEditClassForm(false)}
        >
          Cancel
        </button>
        <button
          className="btn btn-error"
          onClick={() => document.getElementById("delete-modal").showModal()}
        >
          Delete Class
        </button>
      </div>
      <dialog id="delete-modal" className="modal">
        <div className="modal-box">
          <h3>Are you sure you want to delete {pupilClass.name}?</h3>
          <p>This action cannot be undone</p>
          <div className="modal-action">
            <button className="btn" onClick={deleteClass}>
              Confirm
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
