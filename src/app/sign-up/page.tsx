import React from "react";

const SignUpPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-red-700 py-4 text-center">
        সাইন আপ
      </h2>
      <form>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input
            name="name"
            type="email"
            className="input"
            placeholder="name"
          />

          <label className="label">Image</label>
          <input
            name="image"
            type="email"
            className="input"
            placeholder="Image"
          />

          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
          />

          <button className="btn bg-red-700 hover:bg-red-800 text-white mt-4">
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
