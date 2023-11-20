import LoginForm from "../components/LoginForm";


export default function LandingPage({ user, setUser }) {
  return (
    <div>
        <h1>LandingPage</h1>
        <LoginForm user={user} setUser={setUser}/>
    </div>
  )
}
