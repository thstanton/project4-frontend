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
      <h1>Create Your Account:</h1>
      <form onSubmit={handleSubmit}>
        <label className="w-full">Choose a username:</label>
        <input
          type="text"
          name="username"
          value={newUser.username}
          onChange={handleChange}
          required
          className="w-full"
        />
        <label className="w-full">Enter your first name:</label>
        <input
          type="text"
          name="first_name"
          value={newUser.first_name}
          onChange={handleChange}
          required
          className="w-full"
        />
        <label className="w-full">Enter your surname:</label>
        <input
          type="text"
          name="last_name"
          value={newUser.last_name}
          onChange={handleChange}
          required
          className="w-full"
        />
        <label className="w-full">Enter your email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
          required
          className="w-full"
        />
        <label className="w-full">Choose a password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
          required
          className="w-full"
        />
        <button type="submit" className="btn btn-block">
          Submit
        </button>
      </form>
    </div>
  );
}
