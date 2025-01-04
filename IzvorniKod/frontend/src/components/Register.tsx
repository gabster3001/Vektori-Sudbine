import { useRef, useState, FormEvent } from "react";
import "./Register.css";

const Register: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState<string>(""); // username
  const [email, setEmail] = useState<string>(""); // email
  const [pwd, setPwd] = useState<string>(""); // password
  const [matchPwd, setMatchPwd] = useState<string>("");

  const [errMsg, setErrMsg] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (pwd !== matchPwd) {
      setErrMsg("Passwords do not match.");
      return;
    }

    // Send data to the backend
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, email: email, password: pwd }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setErrMsg(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrMsg("Failed to connect to the server.");
    }
  };

  return (
    <div className="container">
      {success ? (
        <div>
          <h1>Registration Successful!</h1>
          <p>
            You can now <a href="/">log in</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
          </p>
          <h1>Register</h1>

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
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
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />

          <label htmlFor="confirm_pwd">Confirm Password:</label>
          <input
            type="password"
            id="confirm_pwd"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
          />

          <button disabled={!user || !email || !pwd || pwd !== matchPwd}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
