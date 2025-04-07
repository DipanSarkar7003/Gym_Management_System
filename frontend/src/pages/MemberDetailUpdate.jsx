import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


function MemberDetailUpdate() {
  const [member, SetMember] = useState({});
  const { id } = useParams();
  const [inputData, setInputData] = useState({});
  const navigate = useNavigate()
  // get member detasils
  useEffect(() => {
    const getMemberDetsils = async (id) => {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}members/member/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      SetMember(result.data);
    };
    getMemberDetsils(id);
  }, [id]);

  useEffect(() => {
    if (member) {
      setInputData({
        email: member.email || "",
        phone: member.phone || "",
        address: member.address || "",
        monthlyBill: member.monthlyBill || "",
        status: member.status || "active",
      });
    }
  }, [member]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    const tempData = { ...inputData };
    tempData[name] = value;
    setInputData(tempData);
    console.log(JSON.stringify(inputData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}members/member/update/${member._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(inputData),
        }
      );
      const result = await response.json();

      if (!result.ok) {
        console.log(result);
        return;
      }
      toast(result.message);
      setTimeout(() => {
      navigate(`/members/member/${member._id}`);
      }, 4000);
    } catch (err) {
      console.error(err);
      return;
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full mb-[100px]">
        <form action="" className="px-4" onSubmit={handleSubmit}>
          <div className="formHeaddig text-center mb-3">
            <h1 className="text-3xl font-bold text-slate-700 capitalize mb-2">
              Update member Detasils
            </h1>
            <p className="text-base text-slate-500">
              Please enter New details of the member{" "}
            </p>
          </div>

          <div className="form-control flex flex-col mb-2">
            <label htmlFor="email" className="text-base mb-1">
              Email:
            </label>
            <input
              value={inputData.email}
              type="email"
              id="email"
              name="email"
              placeholder={member.email}
              className="p-2 rounded-lg font-semibold border-2 text-gray-600 text-sm"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control flex flex-col mb-2">
            <label htmlFor="phone" className="text-base mb-1">
              Phone Number:
            </label>
            <input
              value={inputData.phone}
              type="phone"
              id="phone"
              name="phone"
              placeholder={member.phone}
              className="p-2 rounded-lg border-2 font-semibold  text-gray-600 "
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control flex flex-col ">
            <label htmlFor="address" className="text-base mb-1">
              Address:
            </label>
            <input
              value={inputData.address}
              type="text"
              id="address"
              name="address"
              placeholder="Enter new address"
              className="p-2 rounded-lg  font-semibold  text-gray-600 border-2"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-control flex flex-col">
            <label htmlFor="monthlyBill" className="text-base mb-1">
              Monthly bill:
            </label>
            <input
              value={inputData.monthlyBill}
              type="number"
              id="monthlyBill"
              name="monthlyBill"
              placeholder={member.monthlyBill}
              className="p-2 rounded-lg border-2 font-semibold  text-gray-600 "
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="status" className="text-base mb-1">
              Status:
            </label>

            <select
              value={inputData.status}
              name="status"
              id="status"
              className="text-gray-600 p-2 rounded-lg border-2 font-semibold   "
              onChange={handleInputChange}
            >
              <option value="active" className=" font-semibold  text-gray-600">
                Active
              </option>
              <option
                value="inactive"
                className=" font-semibold  text-gray-600"
              >
                Inactive
              </option>
              <option value="banned" className=" font-semibold  text-gray-600">
                Banned
              </option>
            </select>
          </div>

          <div className="flex flex-col mt-2 ">
            <button
              type="submit"
              className="bg-[#253239] p-3 mt-3 text-white rounded "
            >
              {" "}
              Update Member
            </button>
          </div>
        </form>
      </div>

      <Navbar />
    </>
  );
}

export default MemberDetailUpdate;
