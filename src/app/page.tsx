import MainNews from "./components/MainNews";

import MostRead from "./components/MostRead";
import NewsCard from "./components/NewsCard";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
  }[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;

  const otherSections: IOtherSection[] = sections.slice(1);

  return (
    <div>
      <div className="grid grid-cols-3 gap-5  pt-5">
        {/* news section */}
        <div className=" col-span-2 ">
          <MainNews news={mainNews} />
          <div>
            {otherSections.map((os) => (
              <div className=" " key={os.curationId}>
                <h1 className="font-bold border-b-2 border-red-700 text-2xl mt-6">
                  {os.title}
                </h1>
                <div className=" grid grid-cols-3 gap-3 pt-4">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* most read section */}
        <div className=" col-span-1 ">
          <MostRead />
        </div>
      </div>
    </div>
  );
}
