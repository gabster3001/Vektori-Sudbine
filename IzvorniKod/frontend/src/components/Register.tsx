import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import "./Register.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!password) {
      setErrMsg("Password is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        email,
        password,
      });

      console.log("Registration success:", response.data);
      setSuccess(true);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setErrMsg(errorMessage);
    }
  };

  return (
    <div className="container">
      {success ? (
        <div>
          <h1>Registration Successful!</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
          <h1>Register</h1>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <button disabled={!username || !email || !password}>Register</button>
        </form>
      )}
    </div>
  );
};

export default Register;
