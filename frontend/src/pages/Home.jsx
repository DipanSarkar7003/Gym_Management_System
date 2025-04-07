import homeBg from "../assets/images/homeBg.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="home flex justify-center ">
      <div
        className={`h-screen w-full max-w-4xl bg-cover bg-center flex flex-col  justify-end`}
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
