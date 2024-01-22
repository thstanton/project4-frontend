import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

export default function LandingPage({ user, setUser }) {
  return (
    <div>
      <h1>Please log in:</h1>
      <LoginForm user={user} setUser={setUser} />
      <h1>Or create an account:</h1>
      <div>
        <Link to="/pupil/signup">
          <div>New Pupil Account</div>
        </Link>
        <Link to="/teacher/signup">
          <div>New Teacher Account</div>
        </Link>
      </div>
    </div>
  );
}
