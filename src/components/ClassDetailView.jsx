import TeacherContextCardList from "./TeacherContextCardList";
import EditClass from "./EditClass";
import { useState } from "react";
import { classesAPI } from "../utils/classes-api";
import ClassPupilListItem from "./ClassPupilListItem";
import { FaKey } from "react-icons/fa";
import ModalV2 from "./ModalV2";

export default function ClassDetailView({
  pupilClass,
  setPupilClass,
  classes,
  setClasses,
}) {
  const [showEditClassForm, setShowEditClassForm] = useState(false);
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

  async function deleteClass() {
    try {
      const response = await classesAPI.delete(pupilClass.id);
      if (response.status === 204) {
        setPupilClass(null);
        const newClasses = classes.filter(
          (currentClass) => currentClass.id !== pupilClass.id,
        );
        setClasses(newClasses);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div>
        <div className="card my-3 bg-neutral-100 drop-shadow">
          <div className="card-body">
            <h1 className="card-title">Class details:</h1>
            <h2 className="text-lg font-semibold text-neutral-800">
              {pupilClass.name}
            </h2>
            <p>Year group: </p>
            <input
              className="input input-bordered flex items-center"
              disabled={!showEditClassForm}
              placeholder={pupilClass.year_group}
            />
            <p>Teacher:</p>
            <input
              className="input input-bordered flex items-center"
              disabled={!showEditClassForm}
              placeholder={`${pupilClass.teacher.first_name} ${pupilClass.teacher.last_name}`}
            />
            <p>Class Access Key:</p>
            <p className="input input-bordered flex items-center">
              <FaKey className="mr-2 inline" />
              {pupilClass.access_key}
            </p>
            <div>
              <h2>Class members:</h2>
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name:</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {pupilClass.pupils.length ? (
                    pupilClass.pupils.map((pupil) => (
                      <ClassPupilListItem
                        key={pupil.id}
                        pupil={pupil}
                        pupilClass={pupilClass}
                        setPupilClass={setPupilClass}
                        showEditClassForm={showEditClassForm}
                      />
                    ))
                  ) : (
                    <tr>
                      <td>No pupils have joined this class yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="card-actions justify-end">
              {!showEditClassForm ? (
                <button
                  className="btn btn-info"
                  onClick={() => setShowEditClassForm(true)}
                >
                  Edit Class
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-error"
                    onClick={() =>
                      document.getElementById("delete-class-modal").showModal()
                    }
                  >
                    Delete Class
                  </button>
                  <button
                    className="btn"
                    onClick={() => setShowEditClassForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => setShowEditClassForm(true)}
                  >
                    Confirm Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1>Assigned Contexts:</h1>
          <TeacherContextCardList contexts={pupilClass.contexts} />
        </div>
      </div>
      <ModalV2 
        id="delete-class-modal"
        prompt={`Are you sure you want to delete ${pupilClass.name}?`}
        subPrompt="This action cannot be undone."
        buttonText="Delete Class"
        action={deleteClass}
      />
    </>
  );
}
