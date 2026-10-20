import Link from "next/link";
import { Key } from "react";
export interface INavs {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  const navs: INavs[] = data.data;
  const filteredNavs = navs.filter((n) => n.scrapable);
  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm sm:mt-5 sm:gap-x-5 sm:text-base">
      <Link href="/" className="hover:text-red-700">
        হোম
      </Link>
      {filteredNavs.map((n, i: Key | null | undefined) => (
        <Link
          key={i}
          href={`/category/${n.slug}`}
          className="hover:text-red-700"
        >
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
