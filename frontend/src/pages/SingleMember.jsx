import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SingleMember() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    // Fetch data from API
    fetch(`${import.meta.env.VITE_BASE_URL}/members/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setMember(result.data);
      })
      .finally(() => setLoading(false)) // Always set loading to false after fetching data

      .catch((error) => console.error("Error:", error));
  }, [id]); // Fetch data when the id changes

  if (loading) return <div>Loading...</div>;

  if (!member) return <div>No Data found </div>;

  console.log(member); // Debugging purposes

  return <>
  <div className="text-center">
    <img src={member?.photo} alt="member photo" className="w-[100px] rounded-xl " />
  </div>
  </>;
}

export default SingleMember;
