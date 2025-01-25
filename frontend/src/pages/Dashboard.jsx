import React, { useContext } from "react";
import { TrainerContext } from "../context/TrainerContext";
import { Link } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BsPersonArmsUp } from "react-icons/bs";

function Dashboard() {
  const { trainerData } = useContext(TrainerContext);
  console.log(trainerData);

  if (!trainerData)
    return (
      <div className="h-screen w-full bg-green-100 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-medium mb-3 ">OOPS ! No data found !</h1>
        <p className="text-lg capitalize font-medium">
          please{" "}
          <Link className="text-blue-600" to={"/login"}>
            Login
          </Link>{" "}
          again !
        </p>
      </div>
    );

  return (
    <div className="bg-[#F7F8F9] h-screen">
      <div className="flex justify-between items-center px-3 pt-6">
        <h1 className="text-4xl font-bold ">Dashboard</h1>
        {trainerData.fullName}
      </div>

      <div className="p-4 ">
        <div className="monthCollaction bg-[#2C62FF] rounded-xl p-4 ">
          <p className="monthName block  text-white text-lg mb-2">January</p>
          <h1 className="text-5xl text-white font-semibold">
            &#8377;<span>5000</span>
          </h1>
          <p className="text-white mt-2">
            Today's collection : &#8377;<span>500</span>
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="collection-headding flex justify-between px-3 py-2">
          <p className="font-bold uppercase text-slate-500 text-sm">
            Daily Collection
          </p>
          <Link className="capitalize text-blue-600 font-bold text-base">
            {" "}
            See all
          </Link>
        </div>
        <div className="todays-collection rounded-xl px-3 py-2 bg-white shadow-lg">
          <div className="collection flex justify-between items-center  mb-3">
            <img
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
              alt=""
              className="imgae w-14  h-14 object-cover rounded-3xl "
            />
            <div className="collection-details">
              <p className="collection-name text-gray-500 text-xs">Rajkumar</p>
              <h1 className="collection-amount">&#8377;400</h1>
            </div>
            <p className="collection-da">25th jan</p>
          </div>
          <div className="collection flex justify-between items-center mb-3 ">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww"
              alt=""
              className="imgae w-14  h-14 object-cover rounded-3xl "
            />
            <div className="collection-details">
              <p className="collection-name text-gray-500 text-xs">Rajkumar</p>
              <h1 className="collection-amount">&#8377;400</h1>
            </div>
            <p className="collection-da">25th Feb</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="option_boxes  flex justify-between">
          <div className="option_box flex flex-col items-center px-2 py-4 rounded-lg bg-[#2C62FF] text-white ">
            <FaPeopleGroup />
            <Link to="/members" className="inline-block">
              <p>Members</p>
            </Link>
          </div>
          <div className="option_box flex flex-col items-center px-2 py-4 rounded-lg bg-red-400 text-white">
            <RiMoneyRupeeCircleLine />
            <Link to="/payments">
              <p>Payments</p>
            </Link>
          </div>

          <div className="option_box flex flex-col items-center px-2 py-4 rounded-lg bg-[#34AFFF] text-white">
              <BsPersonArmsUp />
            <Link to="/trainers">
              <p>Trainers</p>
            </Link>
          </div>
          <div className="option_box flex flex-col items-center px-2 py-4 rounded-lg bg-green-400 text-white">
              <BsPersonArmsUp />
            <Link to="/trainers">
              <p>Trainers</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
