import React, { useState } from "react";
import JoinClassForm from "./JoinClassForm";

export default function PupilUserInfo({ user, setUser }) {
  const [showJoinClass, setShowJoinClass] = useState();

  return (
    <div>
      <h1>
        {user.first_name} {user.last_name}
      </h1>
      <p>My Classes:</p>
      <table>
        <thead>
          <tr>
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
      <button className="btn" onClick={() => setShowJoinClass(true)}>Join new class</button>
      {showJoinClass && (
        <JoinClassForm setShowJoinClass={setShowJoinClass} setUser={setUser} />
      )}
    </div>
  );
}
