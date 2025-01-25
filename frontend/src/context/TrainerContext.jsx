import { createContext, useState } from "react";

export const TrainerContext = createContext();

function TrainerContextProvider({ children }) {
  const [trainerData, setTrainerData] = useState(null);
  const [trainerIsLoggedin , setTrainerIsLoggedin] = useState(false)
  return (
    <TrainerContext.Provider value={{ setTrainerData, trainerData , setTrainerIsLoggedin , trainerIsLoggedin }}>
      {children}
    </TrainerContext.Provider>
  );
}
export default TrainerContextProvider;
