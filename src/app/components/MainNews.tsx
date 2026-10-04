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

  return (
    <div className=" flex gap-5 ">
      <Link href={`/news/${firstNews.id}`}>
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure>
            <Image
              src={firstNews.imageUrl}
              alt={firstNews.imageAlt}
              width={500}
              height={300}
            />
          </figure>
          <div className="card-body">
            <p className=" text-red-500 font-bold">{firstNews.category}</p>
            <h2 className="card-title">{firstNews.title}</h2>
            <p>{firstNews.description}</p>
          </div>
        </div>
      </Link>
      <div className=" flex flex-col gap-4 ">
        {otherNews.slice(0, 5).map((h) => (
          <Link href={`/news/${h.id}`} key={h.id}>
            <div className="card bg-base-100 card-xs shadow-sm p-2">
              <h2 className="card-title text-red-500 font-bold">
                {h.category}
              </h2>
              <p>{h.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainNews;
