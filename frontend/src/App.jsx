import "./App.css";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
// import Route from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
