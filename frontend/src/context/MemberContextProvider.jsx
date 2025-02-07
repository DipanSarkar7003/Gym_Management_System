import { createContext, useState } from "react";

export const memberContext = createContext();

function MemberContextProvider({ children }) {
  const [members, setMembers] = useState([]);
  return (
    <memberContext.Provider value={{ setMembers, members }}>
      {children}
    </memberContext.Provider>
  );
}

export default MemberContextProvider;
