import { createContext, useState } from "react";
export const paymentContext = createContext();

function PaymentContextProvider({ children }) {
  const [payments, setPayments] = useState([]);
  return (
    <paymentContext.Provider value={{ setPayments, payments }}>
      {children}
    </paymentContext.Provider>
  );
}

export default PaymentContextProvider;
