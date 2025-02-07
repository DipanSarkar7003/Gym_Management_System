import { createContext, useEffect, useState } from "react";

export const TrainerContext = createContext();

function TrainerContextProvider({ children }) {
  const [trainerData, setTrainerData] = useState(null);
  const [trainerIsLoggedin, setTrainerIsLoggedin] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setJwtToken(token);
  }, []);

  return (
    <TrainerContext.Provider
      value={{
        jwtToken,
        setTrainerData,
        trainerData,
        setTrainerIsLoggedin,
        trainerIsLoggedin,
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
}
export default TrainerContextProvider;
