"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";

const heading = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700"],
});
const body = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500"],
});

const NotFound = () => {
  const router = useRouter();

  return (
    <main
      className={`${body.className} flex min-h-screen items-center justify-center bg-white px-4 text-slate-800`}
    >
      <section className="w-full max-w-xl text-center">
        <p
          aria-hidden="true"
          className={`${heading.className} select-none text-[8rem] font-bold leading-none text-teal-700 sm:text-[11rem]`}
        >
          404
        </p>

        <h1
          className={`${heading.className} mt-4 text-2xl font-bold leading-snug text-slate-900 sm:text-3xl`}
        >
          খবরটি খুঁজে পাওয়া যায়নি
        </h1>

        <p className="mx-auto mt-4 max-w-md text-lg leading-loose text-slate-600">
          আপনি যে পেজটি খুঁজছেন সেটি মুছে ফেলা হয়েছে, সরিয়ে নেওয়া হয়েছে,
          অথবা লিংকটি ভুল।
        </p>

        <div
          className={`${heading.className} mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row`}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="w-full rounded-md bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto"
          >
            ← আগের পেজে ফিরে যান
          </button>

          <Link
            href="/"
            className="w-full rounded-md border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 sm:w-auto"
          >
            হোম পেজে যান
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
