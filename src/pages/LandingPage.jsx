import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LandingPage({ user, setUser }) {
  return (
    <div>
      <h1 className="text-neutral-700 mb-3 text-center text-xl font-bold">
        Please log in:
      </h1>
      <LoginForm user={user} setUser={setUser} />
      <div className="card card-bordered card-normal mx-auto w-96 drop-shadow-sm">
        <div className="card-body text-center">
          <h1 className="text-neutral-700 mb-3 text-xl font-bold">
            Or create an account:
          </h1>
          <div>
            <Link to="/pupil/signup">
              <div className="btn btn-primary mb-3">New Pupil Account</div>
            </Link>
            <Link to="/teacher/signup">
              <div className="btn btn-secondary">New Teacher Account</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
