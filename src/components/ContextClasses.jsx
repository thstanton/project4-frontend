import { useEffect, useState } from "react";
import { contextsAPI } from "../utils/contexts-api";
import { classesAPI } from "../utils/classes-api";

export default function ContextClasses({ id, classes, setContext }) {
  const [newClass, setNewClass] = useState("");
  const [teacherClasses, setTeacherClasses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await classesAPI.own();
        if (response.status === 200) setTeacherClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  async function assignClass() {
    try {
      const response = await contextsAPI.assign(id, newClass);
      console.log(response);
      if (response.status === 200) {
        const newAssignedClasses = [...classes, response.data.pupil_class];
        setContext((prevContext) => ({
          ...prevContext,
          assigned_classes: newAssignedClasses,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function unassignClass(classID) {
    try {
      const response = await contextsAPI.unassign(id, classID);
      if (response.status === 200) {
        const newAssignedClasses = classes.filter(
          (pupilClass) => pupilClass.id !== classID,
        );
        setContext((prevContext) => ({
          ...prevContext,
          assigned_classes: newAssignedClasses,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card card-bordered mb-3">
      <div className="card-body">
        <h1 className="mb-3 text-lg font-bold">Assign to your classes:</h1>
        <div className="mb-3 flex w-full gap-2">
          <select
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
            className="select select-bordered flex-grow"
          >
            <option value="0">Choose one:</option>
            {teacherClasses &&
              teacherClasses.length &&
              teacherClasses
                .filter(
                  (tchrCls) =>
                    !classes.map((assdCls) => assdCls.id).includes(tchrCls.id),
                )
                .map((tchrCls) => (
                  <option key={tchrCls.id} value={tchrCls.id}>
                    {tchrCls.name}
                  </option>
                ))}
          </select>
          <button className="btn btn-info" onClick={assignClass}>
            Assign to class
          </button>
        </div>
        <h1 className="mb-3">Assigned to:</h1>
        {classes.map((pupilClass) => (
          <div className="h-50 card mb-3 w-60 bg-stone-100" key={pupilClass.id}>
            <div className="card-body">
              <h2 className="text-lg font-bold">{pupilClass.name}</h2>
              <p>{pupilClass.year_group}</p>
              <div className="card-actions">
                <button
                  className="btn btn-warning btn-xs"
                  onClick={() => unassignClass(pupilClass.id)}
                >
                  Unassign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
