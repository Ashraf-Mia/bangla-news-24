"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = useSession();
  const user = session?.user;
  console.log(user);
  return (
    <div>
      {user ? (
        <div className=" flex gap-4 items-center">
          <span>Welcome, {user.name}</span>
          <button className="btn  btn-error" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <Link href={"/sign-in"}>
            <button className=" btn btn-outline">সাইন ইন</button>
          </Link>
          <Link href={"/sign-up"}>
            <button className=" btn btn-error">সাইন আপ</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;
