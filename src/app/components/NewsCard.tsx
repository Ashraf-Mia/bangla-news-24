import Image from "next/image";

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
    <div>
      <div className="card bg-base-100 shadow-sm">
        <figure>
          <Image
            src={news.imageUrl}
            alt={news.imageAlt}
            width={500}
            height={300}
          />
        </figure>
        <div className="card-body">
          <p className=" text-red-500 font-bold">{news.category}</p>
          <h2 className="card-title">{news.title}</h2>
          <p>{news.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
