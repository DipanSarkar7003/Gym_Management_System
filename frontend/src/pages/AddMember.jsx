import React from "react";

function AddMember() {
  return (
    <div className="w-full h-screen bg-red-400 px-4">
      <form action="" className="bg-green-300 p-4">
        <div className="formHeaddig text-center">
          <h1 className="text-3xl font-bold text-slate-700 capitalize mb-2">Add new Member</h1>
          <p className="text-base text-slate-500">Please enter all the details of the member </p>
        </div>

        <div className="form-control  flex flex-col ">
          <label htmlFor="name" className="text-sm mb-2  ">Name:</label>
          <input type="text" id="name" name="name" required className="p-2 rounded-lg border " />
        </div>
        <div className="form-control flex flex-col">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-control" >
          <label htmlFor="email">Phone Number:</label>
          <input type="phone" id="phone" name="phone" required />
        </div>

        <div className="form-control ">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" required />
        </div>
        <div className="form-control ">
          <label htmlFor="joindate">Join Date:</label>
          <input type="date" id="joindate" name="jondate" required />
        </div>
        <div className="form-control">
          <label htmlFor="monthlyBill">Monthly bill:</label>
          <input type="number" id="monthlyBill" name="monthlyBill" required />
        </div>
        <div className="form-control ">
          <label htmlFor="photo">Monthly bill:</label>
          <input type="file" id="photo" name="photo" required />
        </div>

        <button type="submit"> Create Member</button>
      </form>
    </div>
  );
}

export default AddMember;
