import React from "react";
import { Link } from "react-router-dom";
function PersonInfoBox({ person }) {
  return (
    <Link
      to={`/members/member/${person._id}`}
      className="collection flex justify-between items-center  mb-3 "
    >
      <img
        src={person.photo}
        alt=""
        className="imgae w-14  h-14 object-cover rounded-3xl "
      />
      <div className="collection-details">
        <p className="collection-name text-gray-500 text-xs">
          {person.fullName}
        </p>
        <h1 className="collection-amount">&#8377;{person.monthlyBill}</h1>
      </div>
      <p className="collection-da">25th jan</p>
    </Link>
  );
}

export default PersonInfoBox;
