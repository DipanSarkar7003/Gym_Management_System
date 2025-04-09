import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TrainerContextProvider from "./context/TrainerContext.jsx";
import MemberContextProvider from "./context/MemberContextProvider.jsx";
import PaymentContextProvider from "./context/PaymentContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <TrainerContextProvider>
    <MemberContextProvider>
      <PaymentContextProvider>
        {/* <div className="max-w-4xl flex "> */}
          <App />
        {/* </div> */}
      </PaymentContextProvider>
    </MemberContextProvider>
  </TrainerContextProvider>
  // </StrictMode>
);
