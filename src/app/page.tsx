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
    <div className="pt-4 sm:pt-5">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
        {/* news section */}
        <div className="min-w-0 lg:col-span-2">
          <MainNews news={mainNews} />
          <div>
            {otherSections.map((os) => (
              <div key={os.curationId}>
                <h2 className="mt-6 border-b-2 border-red-700 text-xl font-bold sm:text-2xl">
                  {os.title}
                </h2>
                <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* most read section */}
        <aside className="min-w-0 lg:col-span-1">
          <MostRead />
        </aside>
      </div>
    </div>
  );
}
