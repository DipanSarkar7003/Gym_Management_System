import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

function Profile() {
  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [logOutPopup, setLogoutPopup] = useState(false);

  useEffect(() => {
    const trainerId = localStorage.getItem("trainerId");
    // Fetch user data from API
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}trainers/${trainerId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const result = await response.json();
        if (!result.ok) {
          toast(result.message, { type: "error" });
          return;
        }

        setTrainer(result.data);
        console.log(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    fetchProfile();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    localStorage.removeItem("trainerId");
    navigate("/login");
  };

  if (loading) return <div>Loading...</div>;
  if (!trainer) return <div>No trainer data found</div>;
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-[#2C62FF] p-2 rounded-xl"
          >
            <IoChevronBack fontSize={"30px"} color="white" />
          </button>
          <Link>
            <CiEdit fontSize={"30px"} />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <img
            src={trainer?.photo}
            alt="Trainer photo"
            className="w-[70px] rounded-xl "
          />
        </div>
        <div className="text-center my-4">
          <h1 className="font-medium text-lg text-slate-600">
            {trainer?.fullName || "no Data found"}
          </h1>
        </div>

        <div
          className="bg-[#2C62FF] flex justify-around rounded-lg p-4
        
      "
        >
          <div className=" text-center">
            <p className="text-[#BCBEC2] text-sm font-semibold ">
              Monthly Salary
            </p>
            <p className="font-bold text-black-700">
              {trainer?.monthlySalary || "No  data found"}
            </p>
          </div>
        </div>
        <h1 className="font-bold mt-4 leading-loose text-lg ">
          Contact Details
        </h1>
        <div className="overflow-scroll ">
          <div className="mt-3">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
              <p className="font-medium text-sm text-gray-600">Email:</p>
              <p className="font-bold text-gray-700">
                {trainer?.email || "No  data found"}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
              <p className="font-medium text-sm text-gray-600">Phone:</p>
              <p className="font-bold text-gray-700">
                {trainer?.phone || "No  data found"}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
              <p className="font-medium text-sm text-gray-600">Role:</p>
              <p className="font-bold text-gray-700">
                {trainer?.role || "No  data found"}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
              <p className="font-medium text-sm text-gray-600">Address:</p>
              <p className="font-bold text-gray-700">
                {trainer?.address || "No  data found"}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
              <p className="font-medium text-sm text-gray-600">Assigned By:</p>
              <p className="font-bold text-gray-700">
                {trainer?.assignedby || "No  data found"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-[50px]">
          <button
            className="flex items-center gap-2 text-red-600"
            onClick={() => setLogoutPopup(true)}
          >
            {" "}
            <IoIosLogOut />
            Logout
          </button>
        </div>
      </div>
      {logOutPopup && (
        <div
          className="fixed top-0 h-screen w-full bg-[#666666] backdrop-blur-xs bg-opacity-70
 flex items-center justify-center"
        >
          <div className="bg-white  p-6 rounded-xl">
            <h1 className="text-2xl font-bold">Log Out ?</h1>
            <p className="text-lg mt-3 ">Are you sure want to log out ?</p>
            <div className="flex justify-evenly mt-6">
              <button
                className="border bg-[#DDDDDD] px-4 py-1 rounded text-gray-800 font-bold"
                onClick={() => setLogoutPopup(false)}
              >
                Cancel
              </button>
              <button
                className="border bg-red-300 px-4 py-2 rounded font-bold text-red-800"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <Navbar />
    </>
  );
}

export default Profile;
