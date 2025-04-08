import { Link } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";
import { RiMoneyRupeeCircleLine } from "react-icons/ri";
import { BsPersonArmsUp } from "react-icons/bs";
import Navbar from "../components/Navbar";
import { useContext, useEffect, useState } from "react";
import { paymentContext } from "../context/PaymentContextProvider";

function Dashboard() {
  const { payments, setPayments } = useContext(paymentContext);
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const d = new Date();
  const thisMonth = d.getMonth();
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = monthArr[thisMonth];
  let monthlyCollection;
  let todayDate = d.getDate();
  let todayPayments = [];
  let todayTotalCollection;

  // Fetch payments to show the details on dashboard
  useEffect(() => {
    async function getPayments() {
      try {
        setLoading(true);
        const url = `${baseUrl}payments`;
        const response = await fetch(url);
        const result = await response.json();
        // set the fetched data to the context
        setPayments(result.data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred while fetching payments data");
        return;
      }
    }
    getPayments();
  }, []);

  // get total payment collection this month

  if (payments.length) {
    monthlyCollection = payments.reduce((acc, curr) => {
      const paymentMonth = new Date(curr.createdAt).getMonth();
      if (paymentMonth == thisMonth) {
        return acc + curr.amount;
      }
      return acc;
    }, 0);

    // get total collection of the day
    todayTotalCollection = payments.reduce(
      (acc, curr) => {
        let paymentDate = new Date(curr.createdAt).getDate();
        if (todayDate == paymentDate) {
          todayPayments.push(curr);
          return acc + curr.amount;
        }
        return acc;
      },

      0
    );
  }

  return (
    <div>
      <div className="bg-[#F7F8F9] h-screen">
        <div className="flex justify-between items-center px-3 pt-6">
          <h1 className="text-4xl font-bold ">Dashboard</h1>
          {/* {trainerData.fullName} */}
        </div>

        <div className="p-4 ">
          <div className="monthCollaction bg-[#2C62FF] rounded-xl p-4 ">
            <p className="monthName block  text-white text-lg mb-2">
              {monthName || "No data"}
            </p>
            <h1 className="text-5xl text-white font-semibold">
              &#8377;
              <span>
                {loading ? "..." : monthlyCollection || "Data not found"}
              </span>
            </h1>
            <p className="text-white mt-2">
              Today's collection : &#8377;<span>{todayTotalCollection}</span>
            </p>
          </div>
        </div>

        <div className="p-4">
          <div className="collection-headding flex justify-between px-3 py-2">
            <p className="font-bold uppercase text-slate-500 text-sm">
              Daily Collection
            </p>
            <Link
              to={"/payments"}
              className="capitalize text-blue-600 font-bold text-base"
            >
              {" "}
              See all
            </Link>
          </div>
          <div className="todays-collection rounded-xl px-3 py-2 bg-white shadow-lg">
            {todayPayments.length ? (
              todayPayments.map((payment , index) => {
                return (
                  <>
                    <div key={index} className="collection flex justify-between items-center  mb-3">
                      <img
                        src={payment.senderId.photo}
                        alt=""
                        className="imgae w-14  h-14 object-cover rounded-3xl "
                      />
                      <div className="collection-details">
                        <p className="collection-name text-gray-500 text-xs">
                          {payment.senderId.fullName}
                        </p>
                        <h1 className="collection-amount">
                          &#8377;{payment.amount}
                        </h1>
                      </div>
                      <p className="collection-da">
                        {
                          new Date(payment.createdAt)
                            .toTimeString()
                            .split(" ")[0]
                        }
                      </p>
                    </div>
                  </>
                );
              })
            ) : (
              <p className="Bold text-gray-700 "> No collection today</p>
            )}

            
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

      <Navbar />
    </div>
  );
}

export default Dashboard;
