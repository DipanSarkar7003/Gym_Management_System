import { useContext, useEffect, useReducer, useState } from "react";
import { memberContext } from "../context/MemberContextProvider";
import PersonInfoBox from "../components/personBox/PersonInfoBox";
import { CiSearch } from "react-icons/ci";
import { TrainerContext } from "../context/TrainerContext";
import Navbar from "../components/Navbar";

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case "initial":
      return action.payload;
    case "active":
      return action.payload.filter((val) => val.status == "active");
    case "inactive":
      return action.payload.filter((val) => val.status == "inactive");
    case "banned":
      return action.payload.filter((val) => val.status == "banned");
    default:
      return state;
  }
}
function Members() {
  const { setMembers, members } = useContext(memberContext);
  const { jwtToken } = useContext(TrainerContext);
  const [memberStatus, dispatch] = useReducer(reducer, members);
  const [loading, setLoading] = useState(false);
  // console.log(memberStatus);
  const base_url = import.meta.env.VITE_BASE_URL;
  const url = `${base_url}members`;
  // console.log(jwtToken);

  useEffect(() => {
    const getMembers = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await response.json();
        // console.log(result.data);
        setMembers(result.data);
        dispatch({ type: "initial", payload: result.data });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getMembers();
  }, []);

  if (loading)
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-xl font-bold ">Loading your data ...</h1>
        </div>
      </div>
    );

  if (!members || members.length == 0 || members == null)
    return (
      <div>
        <h2>No members found</h2>
      </div>
    );

  return (
    <>
      <div className="w-full h-screen ">
        <h2 className="text-3xl font-bold ps-4 mb-3">Members </h2>

        <div className="searchMember p-4 ">
          <div className="searchBox flex items-center border rounded-lg  bg-[#F7F7F7] shadow-lg px-4  ">
            <CiSearch fontSize="25px" className=" me-1" />
            <input
              type="text"
              placeholder="search by name or email"
              className="   py-3  bg-[#F7F7F7]  inline-block w-full  text-lg  outline-none"
            />
          </div>
        </div>

        <div className="filters flex justify-evenly items-center  bg-[#F5F4F7] m-4 px-1 py-2 shadow-lg">
          <button
            className="border  px-6 py-2  rounded-lg bg-white shadow-lg text-slate-900 font-bold capitalize text-lg"
            onClick={() => dispatch({ type: "active", payload: members })}
          >
            active
          </button>
          <button
            className="border  px-6 py-2  rounded-lg bg-white shadow-lg text-slate-900 font-bold capitalize text-lg"
            onClick={() => dispatch({ type: "inactive", payload: members })}
          >
            inactive
          </button>
          <button
            className="border  px-6 py-2  rounded-lg bg-white shadow-lg text-slate-900 font-bold capitalize text-lg"
            onClick={() => dispatch({ type: "banned", payload: members })}
          >
            banned
          </button>
        </div>

        <ul className="p-4 bg-white mx-4 rounded-xl shadow-xl">
          {memberStatus.map((member) => (
            <PersonInfoBox key={member._id} person={member} />
          ))}
        </ul>
      </div>
      <Navbar />
    </>
  );
}

export default Members;
