import { useState } from "react";
import { createAccount, login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function SignUp({ userType, setUser }) {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      username: newUser.username,
      password: newUser.password,
    };
    try {
      const response = await createAccount(userType, newUser);
      if (response.status === 201) {
        console.log(response);
        const user = await login(credentials);
        setUser(user);
        navigate("/");
      } else {
        console.error(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [name]: value }));
  }

  return (
    <div className="flex flex-col place-content-center">
      <h1 className="text-neutral-700 mb-3 text-center text-xl font-bold">Create Your Account:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username}
          onChange={handleChange}
          required
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={newUser.first_name}
          onChange={handleChange}
          required
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={newUser.last_name}
          onChange={handleChange}
          required
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={newUser.email}
          onChange={handleChange}
          required
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          required
          className="input input-bordered mb-3 w-full"
        />
        <button type="submit" className="btn btn-block btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
