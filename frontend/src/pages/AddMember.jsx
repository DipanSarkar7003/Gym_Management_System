import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";

function AddMember() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [joindate, setJoinDate] = useState("");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [assignedby, setAssignedBy] = useState("");
  // const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trainerId = localStorage.getItem("trainerId");
    setAssignedBy(trainerId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("fullName", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("joindate", joindate);
    formData.append("monthlyBill", monthlyBill);
    formData.append("assignedby", assignedby);
    formData.append("status", "active");
    formData.append("photo", photo);

    console.log(formData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}members`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const result = await response.json();

      setLoading(false);
      if (!result.ok) toast(result.message, { type: "error" });

      toast("Member added successfully!", { type: "success" });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <ToastContainer />

      <div className="w-full mb-[100px]">
        <form
          action=""
          className="px-4"
          onSubmit={handleSubmit}
          method="post"
          encType="multipart/form-data"
        >
          <div className="formHeaddig text-center mb-3">
            <h1 className="text-3xl font-bold text-slate-700 capitalize mb-2">
              Add new Member
            </h1>
            <p className="text-base text-slate-500">
              Please enter all the details of the member{" "}
            </p>
          </div>

          <div className="form-control  flex flex-col mb-2 ">
            <label htmlFor="name" className=" mb-1 text-base  ">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="p-2 rounded-lg border-2 font-semibold text-gray-600 text-sm"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-col mb-2">
            <label htmlFor="email" className="text-base mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email "
              className="p-2 rounded-lg font-semibold border-2 text-gray-600 text-sm"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-col mb-2">
            <label htmlFor="phone" className="text-base mb-1">
              Phone Number:
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number "
              className="p-2 rounded-lg border-2 font-semibold  text-gray-600 "
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col ">
            <label htmlFor="address" className="text-base mb-1">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              required
              placeholder="Enter your address"
              className="p-2 rounded-lg  font-semibold  text-gray-600 border-2"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="form-control  flex-col flex">
            <label htmlFor="joindate" className="text-base mb-1">
              Join Date:
            </label>
            <input
              type="date"
              id="joindate"
              name="jondate"
              required
              className="p-2 rounded-lg border  text-gray-600 "
              onChange={(e) => setJoinDate(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="monthlyBill" className="text-base mb-1">
              Monthly bill:
            </label>
            <input
              type="number"
              id="monthlyBill"
              name="monthlyBill"
              required
              placeholder="Enter monthly bill"
              className="p-2 rounded-lg border-2 font-semibold  text-gray-600 "
              onChange={(e) => setMonthlyBill(e.target.value)}
            />
          </div>
          <div className="form-control flex flex-col">
            <label htmlFor="photo" className="text-base mb-1">
              Photo:
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              required
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col mt-2 ">
            <button
              type="submit"
              className="bg-[#253239] p-3 mt-3 text-white rounded "
            >
              {" "}
              Create Member
            </button>
          </div>
        </form>
      </div>

      <Navbar />
    </>
  );
}

export default AddMember;
