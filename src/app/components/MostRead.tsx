import Link from "next/link";

interface IMostRead {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news: IMostRead[] = data.data;
  console.log("dddata", news);
  return (
    <div className=" card p-4 bg-base-100 border border-gray-300">
      <h1 className=" font-bold text-red-600 mb-3">সর্বাধিক পঠিত</h1>
      {news.map((ms, i: number) => (
        <Link
          href={`/news/${ms.id}`}
          className=" flex gap-2 space-y-2"
          key={ms.id}
        >
          <p
            className=" font-bold  text-red-700
          "
          >
            {i + 1}
          </p>
          <h2>{ms.title}</h2>
        </Link>
      ))}
    </div>
  );
};

export default MostRead;
