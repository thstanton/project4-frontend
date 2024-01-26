import TeacherContextCardList from "./TeacherContextCardList";
import EditClass from "./EditClass";
import { useState } from "react";
import { classesAPI } from "../utils/classes-api";
import ClassPupilListItem from "./ClassPupilListItem";
import { FaKey } from "react-icons/fa";

export default function ClassDetailView({
  pupilClass,
  setPupilClass,
  classes,
  setClasses,
}) {
  const [showEditClassForm, setShowEditClassForm] = useState(false);

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
    <div>
      <div className="card bg-neutral-100 my-3 drop-shadow">
        <div className="card-body">
          <h1 className="card-title">Class details:</h1>
          <h2 className="text-neutral-800 text-lg font-semibold">
            {pupilClass.name}
          </h2>
          <p>Year group: </p>
          <p className="input input-bordered flex items-center">{pupilClass.year_group}</p>
          <p>Teacher:</p>
          <p className="input input-bordered flex items-center">
            {pupilClass.teacher.first_name} {pupilClass.teacher.last_name}
          </p>
          <p>Class Access Key:</p>
          <p className="input input-bordered flex items-center"><FaKey className="inline mr-2"/>{pupilClass.access_key}</p>
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
            <button className="btn btn-info" onClick={() => setShowEditClassForm(true)}>
              Edit Class
            </button>
          </div>

          {showEditClassForm && (
            <EditClass
              classes={classes}
              setClasses={setClasses}
              setShowEditClassForm={setShowEditClassForm}
              setPupilClass={setPupilClass}
              pupilClass={pupilClass}
              deleteClass={deleteClass}
            />
          )}
        </div>
      </div>
      <div>
        <h1>Assigned Contexts:</h1>
        <TeacherContextCardList contexts={pupilClass.contexts} />
      </div>
    </div>
  );
}
