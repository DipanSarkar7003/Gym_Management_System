import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import Navbar from "../components/Navbar";
import { IoChevronBack } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function SingleMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // Fetch data from API
    fetch(`${import.meta.env.VITE_BASE_URL}/members/member/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setMember(result.data);
      })
      .finally(() => setLoading(false)) // Always set loading to false after fetching data

      .catch((error) => console.error("Error:", error));
  }, [id]); // Fetch data when the id changes

  if (loading) return <div>Loading...</div>;

  if (!member) return <div>No Data found </div>;

  console.log(member); // Debugging purposes

  const nextDue = format(new Date(member?.nextBillDate), "MMMM dd, yyyy");

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
            src={member?.photo}
            alt="member photo"
            className="w-[70px] rounded-xl "
          />
        </div>
        <div className="text-center my-4">
          <h1 className="font-medium text-lg text-slate-600">
            {member?.fullName || "no Data found"}
          </h1>
        </div>

        <div
          className="bg-[#2C62FF] flex justify-around rounded-lg p-4
          "
        >
          <div className=" text-center">
            <p className="text-[#BCBEC2] text-sm font-semibold ">
              Monthly bill
            </p>
            <p className="font-bold text-black-700">
              {member?.monthlyBill || "No  data found"}
            </p>
          </div>
          <div className="text-center">
            <p className="text-[#BCBEC2] text-sm font-semibold ">
              Next Due date
            </p>
            <p className="font-bold text-black-600">
              {nextDue || "No  data found"}
            </p>
          </div>
        </div>
        <h1 className="font-bold mt-4 leading-loose text-lg ">
          Contact Details
        </h1>

        <div className="mt-3">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
            <p className="font-medium text-sm text-gray-600">Email:</p>
            <p className="font-bold text-gray-700">
              {member?.email || "No  data found"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
            <p className="font-medium text-sm text-gray-600">Phone:</p>
            <p className="font-bold text-gray-700">
              {member?.phone || "No  data found"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
            <p className="font-medium text-sm text-gray-600">Status:</p>
            <p className="font-bold text-gray-700">
              {member?.status || "No  data found"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
            <p className="font-medium text-sm text-gray-600">Address:</p>
            <p className="font-bold text-gray-700">
              {member?.address || "No  data found"}
            </p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between border-b-2 border-gray-300 pb-4">
            <p className="font-medium text-sm text-gray-600">Assigned By:</p>
            <p className="font-bold text-gray-700">
              {member?.assignedby || "No  data found"}
            </p>
          </div>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default SingleMember;
