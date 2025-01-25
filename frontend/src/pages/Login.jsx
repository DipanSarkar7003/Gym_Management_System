import { useContext, useState } from "react";
import { TrainerContext } from "../context/TrainerContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setTrainerData, setTrainerIsLoggedin } = useContext(TrainerContext);

  const navigate = useNavigate();

  const [trainerInfo, setTrainerInfo] = useState({
    email: "",
    phone: "",
    password: "",
  });

  // handling login here

  const handleLogin = async (e) => {
    e.preventDefault();

    // send login request to backend here

    const url = "http://localhost:3000/v1/api/trainers/login";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(trainerInfo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.ok) {
      alert(result.message);
      const trainer = result.trainer;
      setTrainerData(trainer);
      localStorage.setItem("token", result.token);
      setTrainerIsLoggedin(true);
      navigate("/dashboard");
    }
  };

  const handleChangeLoginInfo = (e) => {
    const name = e.target.name;
    const tempTrainerInfo = {
      ...trainerInfo,
    };
    tempTrainerInfo[name] = e.target.value;
    setTrainerInfo(tempTrainerInfo);
  };

  return (
    <div className="bg-[] h-screen w-full flex  flex-col align-center justify-center">
      <form
        action=""
        onSubmit={handleLogin}
        className="bg-[#F9FFFB] px-3 py-3 "
      >
        <h3 className="text-3xl mb-4 ">Login as trainer</h3>
        <div className="formControll flex flex-col">
          <label htmlFor="phone" className="pb-2">
            Phone number:
          </label>
          <input
            placeholder="Enter phone number "
            type="text"
            id="phone"
            name="phone"
            required
            className="px-3 py-2 border rounded "
            value={trainerInfo.phone}
            onChange={handleChangeLoginInfo}
          />
        </div>
        <div className="formControll flex flex-col">
          <label htmlFor="email" className="pb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="px-3 py-2 border rounded"
            value={trainerInfo.email}
            onChange={handleChangeLoginInfo}
          />
        </div>
        <div className="formControll flex flex-col">
          <label htmlFor="password" className="pb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="px-3 py-2 border rounded "
            value={trainerInfo.password}
            onChange={handleChangeLoginInfo}
          />
        </div>
        <div className="formControll flex flex-col my-5">
          <button type="submit" className="py-2   bg-[#253239] text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
