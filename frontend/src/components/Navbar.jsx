import React from "react";
import { Link, NavLink } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";

function Navbar() {
  return (
    <div className="max-w-4xl bg-red-700">
      <nav className="fixed bottom-0 left-0 w-full  flex  justify-around items-center bg-white shadow-lg">
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center text-slate-500"
        >
          <IoHomeOutline size="30px" />
          <p to="/" className="text-xs">
            Home
          </p>
        </NavLink>

        <NavLink
          to="/members"
          className="flex flex-col items-center text-slate-500"
        >
          <FaPeopleGroup size="30px" />
          <p to="/" className="text-xs">
            Members
          </p>
        </NavLink>

        <Link
          className="flex flex-col items-center bg-[#2C62FF]  p-4 rounded-full "
          to={"/members/add"}
        >
          <FaPlus color="white" size={"25px"} />
        </Link>

        <NavLink
          to="/payments"
          className="flex flex-col items-center text-slate-500"
        >
          <RiMoneyRupeeCircleLine size={"30px"} />
          <p to="/" className="text-xs">
            Payments
          </p>
        </NavLink>
        <NavLink
          to="/profile"
          className="flex flex-col items-center text-slate-500"
        >
          <IoPersonOutline size={"30px"} />
          <p to="/" className="text-xs">
            Profile
          </p>
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
