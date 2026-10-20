"use client";

import { signIn } from "@/lib/auth-client";
import { FaGithubSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success("Sign in successful!");
      console.log(data);
    }
    if (error) {
      toast.error(error.message);
      console.log(error);
    }
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
    <div className="mx-auto w-full max-w-md py-6 sm:py-8">
      <h1 className="py-4 text-center text-2xl font-bold text-red-700">
        সাইন ইন
      </h1>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset w-full rounded-box border border-base-300 bg-base-200 p-5 sm:p-6">
          <label className="label">ইমেইল</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="input w-full"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            className="input w-full"
            placeholder="Password"
          />

          <button
            type="submit"
            className="btn mt-4 w-full bg-red-700 text-white hover:bg-red-800"
          >
            সাইন ইন করুন
          </button>
        </fieldset>
      </form>
      <div>
        <span className="mt-4 flex justify-center text-sm font-bold sm:text-base">
          Or, sign in with
        </span>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn btn-link"
          >
            <FcGoogle /> Google
          </button>
          <button
            type="button"
            onClick={handleGithubSignIn}
            className="btn btn-link"
          >
            <FaGithubSquare /> Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
