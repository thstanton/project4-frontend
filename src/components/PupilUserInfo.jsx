import React, { useState } from "react";
import JoinClassForm from "./JoinClassForm";

export default function PupilUserInfo({ user, setUser }) {
  const [showJoinClass, setShowJoinClass] = useState();

  return (
    <div className="card bg-yellow-200 drop-shadow-lg">
      <div className="card-body">
        <h1>
          {user.first_name} {user.last_name}
        </h1>
        <h2 className="font-bold">My Classes:</h2>
        <table>
          <thead>
            <tr className="text-left">
              <th>Class:</th>
              <th>Year Group:</th>
              <th>Teacher:</th>
            </tr>
          </thead>
          <tbody>
            {user.pupil_classes.map((pupilClass, idx) => (
              <tr key={idx}>
                <td>{pupilClass.name}</td>
                <td>{pupilClass.year_group}</td>
                <td>
                  {pupilClass.teacher.first_name} {pupilClass.teacher.last_name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn" onClick={() => setShowJoinClass(true)}>
          Join new class
        </button>
        {showJoinClass && (
          <JoinClassForm
            setShowJoinClass={setShowJoinClass}
            setUser={setUser}
          />
        )}
      </div>
    </div>
  );
}
