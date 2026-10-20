import Link from "next/link";

interface IMostRead {
  id: string;
  title: string;
}

const MostRead = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
  const data = await res.json();
  const news: IMostRead[] = data.data;

  return (
    <div className="card h-full border border-gray-300 bg-base-100 p-4 sm:p-5">
      <h2 className="mb-3 text-lg font-bold text-red-600 sm:text-xl">
        সর্বাধিক পঠিত
      </h2>
      <div className="flex flex-col gap-3">
        {news.map((ms, i: number) => (
          <Link
            href={`/news/${ms.id}`}
            className="flex min-w-0 gap-2"
            key={ms.id}
          >
            <p className="shrink-0 font-bold text-red-700">{i + 1}</p>
            <h3 className="min-w-0 text-sm leading-snug hover:text-red-700 sm:text-base">
              {ms.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
