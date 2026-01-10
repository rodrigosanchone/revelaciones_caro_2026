"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/firebase/articles.services";

interface Article {
  id: string;
  titulo: string;
  img: string;
  fecha?: string;
}

export default function TwoPost() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = (await getAllArticles()) as Article[];
        const sorted = data.sort((a, b) =>
          a.fecha && b.fecha
            ? new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            : 0
        );
        setArticles(sorted.slice(0, 2));
      } catch (error) {
        console.error("Error cargando artículos:", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section
      className="
    flex flex-col items-center gap-y-6
    md:flex-row md:justify-center md:gap-x-10
  "
    >
      {articles.map((article) => (
        <div
          key={article.id}
          className="
        w-full md:w-1/2 lg:w-2/5 xl:w-1/3
        overflow-hidden rounded-md
        bg-gray-100 transition-all hover:scale-105
        dark:bg-gray-800
      "
        >
          {/* Imagen */}
          <div
            className="
          overflow-hidden rounded-md
          bg-gray-100 transition-all hover:scale-105
          dark:bg-gray-800
        "
          >
            <Link
              className="relative block aspect-square"
              href={`/post/${article.id}`}
            >
              <Image
                src={article.img}
                alt={article.titulo || "Thumbnail"}
                className="object-cover transition-all"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </Link>
          </div>

          {/* Título */}
          <h2 className="m-5 text-center dark:text-white">
            <Link href={`/post/${article.id}`}>
              <span
                className="
              bg-gradient-to-r from-green-200 to-green-100
              bg-[length:0px_10px] bg-left-bottom bg-no-repeat
              transition-[background-size] duration-500
              hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]
              dark:from-purple-800 dark:to-purple-900
            "
              >
                {article.titulo}
              </span>
            </Link>
          </h2>
        </div>
      ))}
    </section>
  );
}
