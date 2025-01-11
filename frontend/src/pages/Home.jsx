import homeBg from "../assets/images/homeBg.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home">
      <div
        className={`h-screen w-full bg-cover bg-center flex flex-col  justify-end`}
        style={{
          backgroundImage: `url(${homeBg})`,
        }}
      >
        <div
          className="bottom-part flex justify-center
         bg-white py-6 "
        >
          <Link
            className=" imline-block px-9 rounded py-3 bg-[#915F56]"
            to={"/login"}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
