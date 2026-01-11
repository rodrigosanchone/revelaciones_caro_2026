"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { getAllArticles } from "@/lib/firebase/articles.services";
import Paginator from "./paginator";

import { LoaderCircle } from "lucide-react"; // spinner

interface Article {
  id: string;
  titulo: string;
  img: string;
  fecha?: string;
}

export default function PostList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageIndex = parseInt(searchParams.get("page") || "1", 10);

  const pageSize = 6; // artículos por página
  const totalPages = Math.ceil(articles.length / pageSize);

  const isFirstPage = pageIndex === 1;
  const isLastPage = pageIndex === totalPages;

  const currentArticles = articles.slice(
    (pageIndex - 1) * pageSize,
    pageIndex * pageSize
  );

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = (await getAllArticles()) as Article[];
        // Ordenar por fecha descendente si existe
        const sorted = data.sort((a, b) =>
          a.fecha && b.fecha
            ? new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
            : 0
        );
        setArticles(sorted);
      } catch (error) {
        console.error("Error cargando artículos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <LoaderCircle className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 mt-10 flex justify-center">
              <h2 className="text-5xl font-bold">Artículos</h2>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
              {currentArticles.map((article) => (
                <div key={article.id} className="group cursor-pointer">
                  <div className="overflow-hidden rounded-md bg-gray-100 transition-all hover:scale-105 dark:bg-gray-800">
                    <Link
                      className="relative block aspect-square"
                      href={`/post/${article.id}`}
                    >
                      <Image
                        src={article.img}
                        alt={article.titulo || "Thumbnail"}
                        className="object-cover transition-all"
                        fill
                        sizes="(max-width: 768px) 30vw, 33vw"
                      />
                    </Link>
                  </div>

                  <h2 className="mt-2 dark:text-white">
                    <Link href={`/post/${article.id}`}>
                      <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
                        {article.titulo}
                      </span>
                    </Link>
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <Paginator
            current={pageIndex}
            total={articles.length} // ✅ ahora sí son 45
            perPage={pageSize}
            onPageChange={(newPage: number) => router.push(`/?page=${newPage}`)}
          />
        </>
      )}
    </>
  );
}
