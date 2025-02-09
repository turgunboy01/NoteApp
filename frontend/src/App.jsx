import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signUp/SignUp";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? <Navigate to="/dash" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dash"
          element={
            authUser ? <Home user={authUser} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dash" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/dash" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
