function Login() {
  return (
    <div className="bg-[] h-screen w-full flex  flex-col align-center justify-center">
      <form action="" className="bg-[#F9FFFB] px-3 py-3 ">
        <h3 className="text-3xl mb-4 ">Login as trainer</h3>
        <div className="formControll flex flex-col">
          <label htmlFor="phone" className="pb-2">
            Phone number:
          </label>
          <input
            placeholder="Enter phone number "
            type="text"
            id="phone"
            name="phone"
            required
            className="px-3 py-2 border rounded "
          />
        </div>
        <div className="formControll flex flex-col">
          <label htmlFor="email" className="pb-2">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="px-3 py-2 border rounded"
          />
        </div>
        <div className="formControll flex flex-col">
          <label htmlFor="password" className="pb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="enter password"
            className="px-3 py-2 border rounded "
          />
        </div>
        <div className="formControll flex flex-col my-5">
          <button type="submit" className="py-2   bg-[#253239] text-white">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
