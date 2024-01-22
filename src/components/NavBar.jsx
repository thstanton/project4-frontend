import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/");
  }

  return (
    <div className={user && user.groups[0] === 1 ? "bg-yellow-400" : "bg-blue-600"}>
      <nav className="flex items-center justify-between p-4">
        <div className="font-display text-5xl">
          <Link to="/">
            <span className="text-stone-100">Jotter</span>
          </Link>
        </div>
        {user && user.groups[0] === 1 ? (
          // Teacher Nav Bar
          <div className="flex gap-2 space-x-4">
            <Link to="/">Classes</Link>
            <Link to="/contexts">Contexts</Link>
            Teacher: {user.first_name}
            <button onClick={handleLogout} className="btn">
              Log Out
            </button>
          </div>
        ) : user && user.groups[0] === 2 ? (
          // Pupil Nav Bar
          <div className="space-x-4">
            Pupil: {user.first_name}
            <button onClick={handleLogout} className="btn">
              Log Out
            </button>
          </div>
        ) : (
          // Unlogged In User Nav Bar
          <div className="space-x-4"></div>
        )}
      </nav>
    </div>
  );
}
