import Image from "next/image";
import Link from "next/link";

interface INews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const MainNews = ({ news }: { news: INews[] }) => {
  const [firstNews, ...otherNews] = news;

  if (!firstNews) return null;

  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-5">
      <Link
        href={`/news/${firstNews.id}`}
        className="w-full min-w-0 md:w-80 md:shrink-0 lg:w-96"
      >
        <div className="card w-full bg-base-100 shadow-sm">
          <figure>
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              width={500}
              height={300}
              sizes="(max-width: 768px) 100vw, 384px"
              className="h-auto w-full object-cover"
            />
          </figure>
          <div className="card-body p-4 sm:p-5">
            <p className="text-sm font-bold text-red-500 sm:text-base">
              {firstNews.category}
            </p>
            <h2 className="card-title text-lg sm:text-xl">{firstNews.title}</h2>
            <p className="text-sm text-gray-600 sm:text-base">
              {firstNews.description}
            </p>
          </div>
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
        {otherNews.slice(0, 5).map((h) => (
          <Link href={`/news/${h.id}`} key={h.id} className="min-w-0">
            <div className="card card-xs bg-base-100 p-3 shadow-sm sm:p-4">
              <h2 className="text-sm font-bold text-red-500 sm:text-base">
                {h.category}
              </h2>
              <p className="text-sm leading-snug sm:text-base">{h.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
