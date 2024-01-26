import JoinClassForm from "../components/JoinClassForm";

export default function PupilUserInfo({ user, setUser }) {
  return (
    <div>
      <h1 className="mb-3 text-center text-xl font-bold">
        {user.first_name} {user.last_name}
      </h1>
      <div className="card mb-3 bg-stone-200 drop-shadow-lg">
        <div className="card-body">
          <h2 className="mb-3 text-lg font-bold">My Classes:</h2>
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
                    {pupilClass.teacher.first_name}{" "}
                    {pupilClass.teacher.last_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <JoinClassForm setUser={setUser} />
    </div>
  );
}
