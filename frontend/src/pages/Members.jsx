import { useEffect } from "react";

function Members() {
  const port = import.meta.env.VITE_PORT;

  const url = `http://localhost:${port}/v1/api/members`;

  useEffect(() => {
    const getMembers = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    };

    getMembers();
  });

  return <div>MEMBERS</div>;
}

export default Members;
