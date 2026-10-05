"use client";

import { authClient, signIn } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { FaGithubSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      redirect("/");
    }
    if (error) {
      console.log(error);
    }

    toast.warning("USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL");
  };

  const handleGoogleSignIn = async () => {
    await signIn.social({
      provider: "google",
    });
  };
  const handleGithubSignIn = async () => {
    await signIn.social({
      provider: "github",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-700 py-4 text-center">
        সাইন আপ
      </h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>
          <input name="name" type="text" className="input" placeholder="name" />

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

          <button
            type="submit"
            className="btn bg-red-700 hover:bg-red-800 text-white mt-4"
          >
            সাইন আপ করুন
          </button>
        </fieldset>
      </form>
      <div>
        <span className=" flex justify-center mt-3 font-bold">
          Or, sign up with
        </span>
        <div className=" text-center">
          <button onClick={handleGoogleSignIn} className="btn btn-link">
            {" "}
            <FcGoogle /> Google
          </button>
          <button onClick={handleGithubSignIn} className="btn btn-link">
            <FaGithubSquare /> Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
