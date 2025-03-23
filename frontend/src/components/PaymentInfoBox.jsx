import React from "react";
import { Link } from "react-router-dom";

function PaymentInfoBox({ payment }) {
  const date = new Date(payment.createdAt);
  const formatedDate = date.toLocaleDateString();

  console.log(formatedDate);
  return (
    <Link
      to={`/payments/payment/${payment._id}`}
      className="collection flex justify-between items-center  mb-3 border p-4 rounded-xl bg-[#F6F4FF] shadow-lg "
    >
      <div className="flex items-center gap-4">
        <img
          src={payment.senderId?.photo}
          alt="member Immage"
          className="imgae w-14  h-14 object-cover rounded-3xl "
        />
        <div className="collection-details">
          <h1 className="collection-name">{payment?.senderId?.fullName}</h1>
          <p className="collection-amount text-gray-500 text-xs">
            {formatedDate}
          </p>
        </div>
      </div>
      <p className="collection-da font-bold text-lg text-green-400">
        &#8377; {payment.amount}
      </p>
    </Link>
  );
}

export default PaymentInfoBox;
