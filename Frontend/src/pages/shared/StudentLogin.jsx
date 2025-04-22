import { useState } from "react";
import { useAuthStore } from "../../store/AuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function StudentLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { studentLogin, parentLogin } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (role === "student") {
        await studentLogin({ email, password });
        navigate("/student-dashboard");
      } else {
        await parentLogin({ email, password });
        navigate("/parent-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="bg-primary text-base-100 rounded-xl shadow-lg p-8 w-full max-w-md border-[3px] border-accent">
        <h1 className="text-3xl font-bold mb-2">Thinking Flares School</h1>
        <h2 className="text-xl font-bold mb-1">
          Welcome to Thinking Flares School
        </h2>
        <p className="mb-2">
          Enter your details to log in as a{" "}
          <span className="font-bold capitalize">{role}</span>
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role Selector */}
          <div>
            <label className="label">
              <span className="label-text text-base-100">Login as</span>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select select-bordered w-full bg-primary text-base-100"
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text text-base-100">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="input input-bordered w-full bg-primary text-base-100 placeholder-base-100"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text text-base-100">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="input input-bordered w-full bg-primary text-base-100 placeholder-base-100 pr-12"
                required
              />
              <button
                type="button"
                className="absolute top-3 right-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-base-100 w-6 h-6" />
                ) : (
                  <Eye className="text-base-100 w-6 h-6" />
                )}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 font-medium">{error}</p>}

          {/* Login button */}
          <button
            type="submit"
            className="btn w-full bg-accent text-base-100 text-2xl font-bold border-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentLogin;
