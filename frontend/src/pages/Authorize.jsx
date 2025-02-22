import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

function Authorize({ children, role }) {
  const navigate = useNavigate();

  // Check if trainer is authenticated and redirect to login page if
  useEffect(() => {
    const trainerId = localStorage.getItem("trainerId");
    const token = localStorage.getItem("token");
    if (!trainerId || !token) {
      navigate("/login");
    }
    // cHECK TRAINER HAS AUTHORIZATION TO ACCRESS THIS PAGE
    async function getTrainerData() {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}trainers/${trainerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (!result.ok) {
        toast(result.message, { type: "error" });
        navigate("/dashboard");
        return;
      }

      const trainerRole = result.data.role;
      if (trainerRole !== role) {
        toast("Unauthorized Access", { type: "error" });
        navigate("/dashboard");
        return;
      }
    }
    getTrainerData();
  }, []); // run once when component mounts
  return (
    <div>
      <ToastContainer />
      {children}
    </div>
  );
}

export default Authorize;
