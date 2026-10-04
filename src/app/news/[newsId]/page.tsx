import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hind_Siliguri, Noto_Serif_Bengali } from "next/font/google";
import ScrollButton from "@/app/components/ScrollButton";

const heading = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["500", "600", "700"],
});
const body = Noto_Serif_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500"],
});

type Block =
  | {
      type: "image";
      url: string;
      caption?: string | null;
      altText?: string | null;
      copyrightHolder?: string | null;
    }
  | { type: "subheading"; text: string }
  | { type: "text"; text: string };

type Article = {
  id: string;
  title: string;
  link: string;
  firstPublished: string;
  imageUrl?: string;
  body: Block[];
  topics?: { id: string; name: string }[];
  wordCount?: number;
  source?: string;
  sourceUrl?: string;
};

const bn = (n: number) => n.toLocaleString("bn-BD");

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  }).format(new Date(iso));

const NewsDetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;
  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    { next: { revalidate: 300 } },
  );
  if (!res.ok) notFound();

  const json = await res.json();
  const news: Article | undefined = json?.data;
  if (!news) notFound();

  // প্রথম ইমেজ ব্লকটি হিরো হিসেবে ব্যবহার হবে
  const heroIndex = news.body.findIndex((b) => b.type === "image");
  const hero =
    heroIndex === 0
      ? (news.body[0] as Extract<Block, { type: "image" }>)
      : null;
  const blocks = hero ? news.body.slice(1) : news.body;
  const readMinutes = Math.max(1, Math.round((news.wordCount ?? 0) / 180));

  return (
    <main className={`${body.className} min-h-screen bg-white text-slate-800`}>
      <article className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <Link
          href="/"
          className={`${heading.className} inline-flex items-center gap-1 text-sm font-medium text-teal-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600`}
        >
          ← সব খবর
        </Link>

        <header className="mt-6">
          {news.topics && news.topics.length > 0 && (
            <ul className={`${heading.className} flex flex-wrap gap-2`}>
              {news.topics.slice(0, 4).map((t) => (
                <li
                  key={t.id}
                  className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800"
                >
                  {t.name}
                </li>
              ))}
            </ul>
          )}

          <h1
            className={`${heading.className} mt-4 text-3xl font-bold leading-snug text-slate-900 sm:text-4xl sm:leading-snug`}
          >
            {news.title}
          </h1>

          <div
            className={`${heading.className} mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-slate-200 py-3 text-sm text-slate-600`}
          >
            <span className="font-semibold text-slate-800">
              {news.source ?? "অজানা সূত্র"}
            </span>
            <time dateTime={news.firstPublished}>
              {formatDate(news.firstPublished)}
            </time>
            {news.wordCount ? (
              <span>পড়তে সময় {bn(readMinutes)} মিনিট</span>
            ) : null}
          </div>
        </header>

        {hero && (
          <figure className="mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.url}
              alt={hero.altText ?? news.title}
              className="aspect-video w-full rounded-lg object-cover"
            />
            {hero.copyrightHolder && (
              <figcaption className="mt-2 text-right text-xs text-slate-500">
                ছবি: {hero.copyrightHolder}
              </figcaption>
            )}
          </figure>
        )}

        <div className="mt-8 space-y-6 text-lg leading-loose sm:text-xl sm:leading-[2.1]">
          {blocks.map((block, i) => {
            if (block.type === "subheading") {
              return (
                <h2
                  key={i}
                  className={`${heading.className} border-l-4 border-teal-600 pl-4 pt-4 text-2xl font-semibold leading-snug text-slate-900`}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={i} className="!my-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={block.altText ?? ""}
                    loading="lazy"
                    className="w-full rounded-lg"
                  />
                  {(block.caption || block.copyrightHolder) && (
                    <figcaption
                      className={`${heading.className} mt-2 text-sm leading-relaxed text-slate-500`}
                    >
                      {block.caption}
                      {block.copyrightHolder && (
                        <span className="ml-1 text-xs">
                          ({block.copyrightHolder})
                        </span>
                      )}
                    </figcaption>
                  )}
                </figure>
              );
            }

            // text: নতুন লাইন অনুযায়ী আলাদা প্যারাগ্রাফ
            return block.text
              .split("\n")
              .map((p) => p.trim())
              .filter(Boolean)
              .map((p, j) => {
                const isQuote = p.startsWith('"') && p.length > 60;
                return isQuote ? (
                  <blockquote
                    key={`${i}-${j}`}
                    className="border-l-4 border-slate-300 bg-slate-50 py-3 pl-5 pr-4 text-slate-700"
                  >
                    {p}
                  </blockquote>
                ) : (
                  <p key={`${i}-${j}`}>{p}</p>
                );
              });
          })}
        </div>

        <footer
          className={`${heading.className} mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600`}
        >
          <span>সূত্র: {news.source}</span>
          {news.sourceUrl && (
            <a
              href={news.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-teal-700 px-4 py-2 font-medium text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              মূল প্রতিবেদন পড়ুন
            </a>
          )}
        </footer>
      </article>
      <ScrollButton />
    </main>
  );
};

export default NewsDetailsPage;
