import NewsCard from "@/app/components/NewsCard";

interface INews {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

const CategoryNews = async ({ params }: { params: { categoryId: string } }) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );
  const data = await res.json();
  const categoryNews: INews[] = data.data;

  return (
    <div>
      <h2 className=" text-2xl font-bold border-b-2 border-red-700 pt-3">
        {data.title}
      </h2>
      <div className=" grid grid-cols-3 pt-4">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;
