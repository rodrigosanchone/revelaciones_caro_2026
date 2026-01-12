import Image from "next/image";
import type { Metadata } from "next";
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

import { getArticleById } from "@/lib/firebase/articles.services"; // 👈 servicio
import { db } from "@/lib/firebase/environments"; // 👈 db
import { doc, getDoc } from "firebase/firestore"; // 👈 Firestore
import type { PageProps } from "@/app/types/types";

export const dynamic = "force-dynamic";

// ✅ Metadata usando el servicio
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // 👈 aquí sí necesitas await
  const post = await getArticleById(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
      description: "Este artículo no existe o fue eliminado.",
    };
  }

  return {
    title: post.titulo,
    description: post.description ?? "Artículo sobre locución y comunicación.",
    openGraph: {
      title: post.titulo,
      description:
        post.description ?? "Artículo sobre locución y comunicación.",
      images: [
        {
          url: post.img ?? "https://carovictorialocutora.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.titulo,
        },
      ],
      url: `https://carovictorialocutora.com/post/${slug}`,
      siteName: "Carovictoria Locutora",
      locale: "es_CR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description:
        post.description ?? "Artículo sobre locución y comunicación.",
      images: [post.img ?? "https://carovictorialocutora.com/og-image.jpg"],
    },
  };
}
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params; // 👈 await porque params es Promise

  try {
    const post = await getArticleById(slug);

    if (!post) {
      return (
        <div className="text-center py-20 text-red-500">Post no encontrado</div>
      );
    }

    // meta de Firestore
    const metaRef = doc(db, "postMeta", slug);
    const metaSnap = await getDoc(metaRef);
    const meta = metaSnap.exists() ? metaSnap.data() : null;

    // fecha
    const fecha = post?.fecha
      ? new Date(post.fecha).toLocaleDateString("es-CR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : "Fecha desconocida";

    const autorNombre = post.autor || "Autor desconocido";
    const autorFoto = null; // si no tienes foto en tu modelo
    const contenidoSeguro =
      typeof post.contenido === "string" ? post.contenido : "";
    const hasVideo =
      typeof post.youtubeVideoId === "string" &&
      post.youtubeVideoId.length === 11;

    return (
      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        <article>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {post.titulo}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {post.contenido}
              </p>
            </div>
          </div>

          {/*  <div className="prose prose-lg dark:prose-invert max-w-none">
            {contenidoSeguro ? (
              contenidoSeguro.includes("<p>") ? (
                <div dangerouslySetInnerHTML={{ __html: contenidoSeguro }} />
              ) : (
                contenidoSeguro.split("\n").map((p, i) => <p key={i}>{p}</p>)
              )
            ) : (
              <p className="text-red-500">Contenido no disponible</p>
            )}
          </div> */}

          {meta && (
            <div className="mt-10 text-sm text-gray-500 dark:text-gray-400">
              <span>👁️ {meta.views ?? 0} vistas</span> ·{" "}
              <span>❤️ {meta.likes ?? 0} likes</span>
            </div>
          )}

          {hasVideo ? (
            <div className="mt-16 flex justify-center">
              <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-md">
                <iframe
                  src={`https://www.youtube.com/embed/${post.youtubeVideoId}`}
                  title="Video de YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : post.img ? (
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-4xl h-80 sm:h-[28rem]">
                {/*   <Image
                  src={post.img}
                  alt={post.titulo}
                  fill
                  className="object-cover rounded-xl shadow-md"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                /> */}
              </div>
            </div>
          ) : null}

          <div className="mt-8 mx-4 text-justify">{post.contenido}</div>

          <p className="text-xs text-black-500 mt-15">{fecha}</p>

          <div className="mt-12 flex justify-end">
            <Link
              href="/"
              className="inline-block px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Volver
            </Link>
          </div>

          <div className="mt-10 flex gap-6 justify-center text-gray-600 dark:text-gray-300">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://revelacionesdecaro.com/post/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              title="Compartir en Facebook"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=https://revelacionesdecaro.compost/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
              title="Compartir en WhatsApp"
            >
              <FaWhatsapp size={24} />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=https://revelacionesdecaro.com/post/${slug}&text=${encodeURIComponent(
                post.titulo
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white"
              title="Compartir en X"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </article>

        {/*   <aside className="hidden lg:block mt-12">
          <AsideTags />
        </aside> */}
      </div>
    );
  } catch (error) {
    console.error("Error al cargar el post:", error);
    return (
      <div className="text-center py-20 text-red-500">
        Error al cargar el post. Revisa los logs del servidor.
      </div>
    );
  }
}
