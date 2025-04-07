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
import Authentication from "./pages/Authentication";
import Profile from "./pages/Profile";
import AddTrainer from "./pages/AddTrainer";
import Authorize from "./pages/Authorize";
import MemberDetailUpdate from "./pages/MemberDetailUpdate";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <Authentication>
                <Dashboard />
              </Authentication>
            }
          />
          <Route
            path="/payments"
            element={
              <Authentication>
                <Payments />
              </Authentication>
            }
          />
          <Route path="/payments/payment/:id" element={<SinglePayment />} />
          <Route
            path="/members"
            element={
              <Authentication>
                <Members />
              </Authentication>
            }
          />
          <Route
            path="/members/member/:id"
            element={
              <Authentication>
                <SingleMember />
              </Authentication>
            }
          />
          <Route
            path="/members/member/update/:id"
            element={
              <Authentication>
                <MemberDetailUpdate />
              </Authentication>
            }
          />
          <Route
            path="/members/add"
            element={
              <Authentication>
                <AddMember />
              </Authentication>
            }
          />

          <Route
            path="/profile"
            element={
              <Authentication>
                <Profile />
              </Authentication>
            }
          />
          <Route
            path="/trainers/add"
            element={
              <Authorize role={"admin"}>
                <AddTrainer />
              </Authorize>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Navbar /> */}
    </>
  );
}

export default App;
