"use client";

import { signOut, useSession } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="max-w-32 truncate text-sm sm:max-w-none sm:text-base">
            Welcome, {user.name}
          </span>
          <button
            className="btn btn-error btn-sm sm:btn-md"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <Link href={"/sign-in"}>
            <button className="btn btn-outline btn-sm sm:btn-md">
              সাইন ইন
            </button>
          </Link>
          <Link href={"/sign-up"}>
            <button className="btn btn-error btn-sm sm:btn-md">সাইন আপ</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default UserInfo;


