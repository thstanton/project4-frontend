import { useEffect, useState } from "react";
import { classesAPI } from "../utils/classes-api";
import CreateClass from "../components/CreateClass";
import ClassDetailView from "../components/ClassDetailView";

export default function TeacherHome() {
  const [classes, setClasses] = useState([]);
  const [showNewClassForm, setShowNewClassForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await classesAPI.own();
        if (response.status === 200) setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <button className="btn" onClick={() => setShowNewClassForm(true)}>
          Create new class
        </button>
        {showNewClassForm && (
          <CreateClass
            setClasses={setClasses}
            setShowNewClassForm={setShowNewClassForm}
          />
        )}
      </div>
      <div>
        <h1>My Classes:</h1>
        {classes &&
          classes.map((pupilClass) => (
            <button
              key={pupilClass.id}
              onClick={() => {
                setSelectedClass(pupilClass);
              }}
            >
              {pupilClass.name}
            </button>
          ))}
        {selectedClass && (
          <ClassDetailView
            pupilClass={selectedClass}
            setPupilClass={setSelectedClass}
            classes={classes}
            setClasses={setClasses}
          />
        )}
      </div>
    </div>
  );
}
