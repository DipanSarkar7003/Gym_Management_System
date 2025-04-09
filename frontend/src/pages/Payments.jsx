import { useContext, useEffect, useState } from "react";
import { paymentContext } from "../context/PaymentContextProvider";
import { Link } from "react-router-dom";
import PaymentInfoBox from "../components/PaymentInfoBox";
import Navbar from "../components/Navbar";

function Payments() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const { payments } = useContext(paymentContext);

  if (loading) {
    return (
      <div className="h-screen items-center justify-center flex bg-blue-100">
        <h1 className="text-xl capitalize font-bold">Loading your data ...</h1>
      </div>
    );
  }

  if (payments.length == 0) {
    return (
      <div className="h-screen items-center justify-center flex bg-blue-100">
        <h1 className="text-xl capitalize font-bold">No payments found.</h1>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#EFEFFD] w-full h-screen pt-4">
        <h1 className="text-2xl ms-4 font-bold ">Payments</h1>
        <div className="p-4">
          {payments.map((payment) => (
            <PaymentInfoBox payment={payment} key={payment._id} />
          ))}
        </div>

        <Link to="/dashboard">Back to dashboard</Link>
      </div>
      <Navbar />
    </>
  );
}

export default Payments;
