import NewsCard from "@/app/components/NewsCard";

interface INews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );
  const data = await res.json();
  const categoryNews: INews[] = data.data;

  return (
    <div className="pt-4 sm:pt-5">
      <h1 className="border-b-2 border-red-700 pb-2 text-xl font-bold sm:text-2xl">
        {data.title}
      </h1>
      <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
