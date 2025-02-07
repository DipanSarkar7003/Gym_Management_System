import { useContext, useEffect, useState } from "react";
import { paymentContext } from "../context/PaymentContextProvider";
import { Link } from "react-router-dom";
import PaymentInfoBox from "../components/personBox/PaymentInfoBox";

function Payments() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [loading, setLoading] = useState(false);
  const { payments, setPayments } = useContext(paymentContext);

  useEffect(() => {
    async function getPayments() {
      try {
        setLoading(true);
        const url = `${baseUrl}payments`;
        // fetch payments data from the backend API
        const response = await fetch(url);
        const result = await response.json();
        setPayments(result.data);
        setLoading(false);

        // set the fetched data to the context
      } catch (error) {
        console.error("An error occurred while fetching payments data");
        return;
      }
    }
    getPayments();
  }, []);

  console.log(payments);

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
    <div className="bg-[#EFEFFD] w-full h-screen pt-4">
      <h1 className="text-2xl ms-4 font-bold ">Payments</h1>
      <div className="p-4">
        {payments.map((payment) => (
          <PaymentInfoBox payment={payment} key={payment._id} />
        ))}
      </div>

      <Link to="/dashboard">Back to dashboard</Link>
    </div>
  );
}

export default Payments;
