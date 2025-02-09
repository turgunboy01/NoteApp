import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { useAuthStore } from "../../store/authStore";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const { login, isLogin } = useAuthStore();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!validateEmail(email)) {
      setError("Please enter a valid email address. ");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");

    login(formData);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 bg-white px-7 py-10 rounded border">
          <form onSubmit={handleLogin}>
            <h4 className="mb-7 text-2xl">Login</h4>
            <input
              type="email"
              placeholder="Email"
              className="input-box"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <PasswordInput
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {error && <p className="text-red-500 pb-1 text-sm">{error}</p>}

            <button className="btn-primary">Login</button>
            <p className="text-sm mt-4 text-center">
              Not registered yet?{" "}
              <Link
                to={"/signup"}
                className=" font-medium underline text-primary"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
