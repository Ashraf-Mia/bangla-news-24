// import MarqueeText from "react-marquee-text";
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
    <div className=" bg-red-700 text-white">
      <div className=" flex max-w-7xl mx-auto">
        <div className=" bg-red-800 py-1 px-3 font-bold">সর্বশেষ</div>
        <MarqueeText className=" py-1" direction="right" duration={15}>
          {headLines.map((h) => (
            <span key={h.id}>
              <span>{h.title}</span>
              <span className=" px-4">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
