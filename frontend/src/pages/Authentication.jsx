import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Authentication({ children }) {
  const navigate = useNavigate();

  // Check if user is authenticated and redirect to login page if not
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return <div>{children}</div>;
}

export default Authentication;
