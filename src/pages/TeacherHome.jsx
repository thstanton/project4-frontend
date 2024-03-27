import { useEffect, useState } from "react";
import { classesAPI } from "../utils/classes-api";
import CreateClass from "../components/CreateClass";
import ClassDetailView from "../components/ClassDetailView";

export default function TeacherHome({ user }) {
  const [classes, setClasses] = useState([]);
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
      <div className="mb-3 flex w-full items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Welcome {user.first_name}</h1>
          <p>You can view and edit your classes here</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => document.getElementById("new-class-modal").showModal()}
        >
          Create new class
        </button>
        <CreateClass
          setClasses={setClasses}
        />
      </div>
      <div>
        {classes.length ? (
          <div className="tabs-boxed tabs">
            {classes &&
              classes.map((pupilClass) => (
                <button
                  className={
                    selectedClass === pupilClass ? "tab tab-active" : "tab"
                  }
                  key={pupilClass.id}
                  onClick={() => {
                    setSelectedClass(pupilClass);
                  }}
                >
                  {pupilClass.name}
                </button>
              ))}
          </div>
        ) : (
          <div className="skeleton h-10 w-full"></div>
        )}
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
