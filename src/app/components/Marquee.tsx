// import MarqueeText from "react-marquee-text";
import Link from "next/link";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
export interface IMarquee {
  id: string;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
  type: string;
  isLive: boolean;
  firstPublished: string;
  lastPublished: string;
  source: string;
}

const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  const data = await res.json();
  const headLines: IMarquee[] = data.data;
  return (
    <div className="w-full bg-red-700 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="shrink-0 bg-red-800 px-3 py-1 font-bold">সর্বশেষ</div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText className=" py-1" direction="right" duration={15}>
            {headLines.map((h) => (
              <Link
                href={`/news/${h.id}`}
                key={h.id}
                className=" hover:underline"
              >
                <span>{h.title}</span>
                <span className=" px-4">•</span>
              </Link>
            ))}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
