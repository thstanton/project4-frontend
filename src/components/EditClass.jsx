import { useState } from "react";
import { classesAPI } from "../utils/classes-api";

export default function EditClass({
  setShowEditClassForm,
  classes,
  setClasses,
  setPupilClass,
  pupilClass,
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
    <div>
      <label>Class name:</label>
      <input
        required
        name="name"
        value={updatedClass.name}
        onChange={handleChange}
      />
      <label>Year group:</label>
      <input
        required
        name="year_group"
        value={updatedClass.year_group}
        onChange={handleChange}
      />
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>
      <button className="btn" onClick={() => setShowEditClassForm(false)}>
        Cancel
      </button>
    </div>
  );
}
