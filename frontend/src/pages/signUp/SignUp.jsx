import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/input/PasswordInput";
import { validateEmail } from "../../utils/helper";
import { useAuthStore } from "../../store/authStore";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const { singup } = useAuthStore();
  const handleSignUp = (e) => {
    e.preventDefault();
    const { email, password, fullName } = formData;

    if (!fullName) {
      setError("Please enter your name");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address. ");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }
    setError("");
    singup(formData);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-28">
        <div className="w-96 bg-white px-7 py-10 rounded border">
          <form onSubmit={handleSignUp}>
            <h4 className="mb-7 text-2xl">SignUp</h4>
            <input
              type="text"
              placeholder="Name"
              className="input-box"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
            />
            <input
              type="text"
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

            <button className="btn-primary">Create Account</button>
            <p className="text-sm mt-4 text-center">
              Already have an account{" "}
              <Link
                to={"/login"}
                className=" font-medium underline text-primary"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
