import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Payments from "./pages/Payments";
import SingleMember from "./pages/SingleMember";
import AddMember from "./pages/AddMember";
import SinglePayment from "./pages/SinglePayment";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/payment/:id" element={<SinglePayment />} />
          <Route path="/members" element={<Members />} />
          <Route path="/members/member/:id" element={<SingleMember />} />
          <Route path="/members/add" element={<AddMember />} />
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
