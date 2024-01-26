import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { IoPeopleSharp } from "react-icons/io5";
import { TfiPencilAlt } from "react-icons/tfi";

export default function NavBar({ user, setUser }) {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setUser(null);
    navigate("/");
  }

  return (
    <div
      className={user && user.groups[0] === 1 ? "bg-yellow-400" : "bg-blue-600"}
    >
      <nav className="navbar flex items-center justify-between p-4">
        <div className="navbar-start font-display text-5xl">
          <Link to="/">
            <span className="text-stone-100">Jotter</span>
          </Link>
        </div>
        {user && user.groups[0] === 1 ? (
          // Teacher Nav Bar
          <div className="navbar-end flex gap-6 text-lg font-bold text-stone-100">
            <Link to="/" className="hover:text-slate-900"><IoPeopleSharp className="inline" /> Classes</Link>
            <Link to="/contexts" className="hover:text-slate-900"><TfiPencilAlt className="inline" /> Contexts</Link>
            <button onClick={handleLogout} className="btn btn-warning">
              Log Out
            </button>
          </div>
        ) : user && user.groups[0] === 2 ? (
          // Pupil Nav Bar
          <div className="space-x-4">
            <button onClick={handleLogout} className="btn btn-warning">
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
