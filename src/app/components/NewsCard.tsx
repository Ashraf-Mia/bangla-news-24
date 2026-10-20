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

const NewsCard = ({ news }: { news: INews }) => {
  return (
    <Link href={`/news/${news.id}`} className="block h-full min-w-0">
      <div className="card h-full min-w-0 bg-base-100 shadow-sm">
        <figure>
          <Image
            src={news.imageUrl}
            alt={news.imageAlt}
            width={500}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="h-44 w-full object-cover sm:h-48"
          />
        </figure>
        <div className="card-body p-4 sm:p-5">
          <p className="text-sm font-bold text-red-500">{news.category}</p>
          <h2 className="card-title line-clamp-2 text-base sm:text-lg">
            {news.title}
          </h2>
          <p className="line-clamp-3 text-sm text-gray-600 sm:text-base">
            {news.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
