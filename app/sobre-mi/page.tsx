import type { Metadata } from "next";
import Link from "next/link";

export const dynamic = "force-dynamic";

// 👉 Metadata para SEO y redes sociales
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sobre mí | Revelaciones de Caro",
    description:
      "Astróloga y tarotista con más de 30 años de experiencia en consultas, talleres, cursos y programas de radio y televisión. Investigadora de temas filosóficos y espirituales, comprometida con brindar contenido de calidad y asesoría personalizada.",
    openGraph: {
      title: "Sobre mí | Revelaciones de Caro",
      description:
        "Descubre más sobre Caro: astróloga y tarotista con más de 30 años de experiencia.",
      url: "https://carovictorialocutora.com/sobre-mi",
      siteName: "Revelaciones de Caro",
      locale: "es_CR",
      type: "profile",
      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Finstagram_4494489.png?alt=media&token=39323f0a-f0a6-4892-9960-020a7633c25f",
          width: 800,
          height: 600,
          alt: "Sobre mí - Caro",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sobre mí | Revelaciones de Caro",
      description:
        "Astróloga y tarotista con más de 30 años de experiencia en consultas y programas.",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Finstagram_4494489.png?alt=media&token=39323f0a-f0a6-4892-9960-020a7633c25f",
      ],
    },
  };
}

export default function SobreMiPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-brand-primary mb-3 mt-2 text-center text-3xl font-semibold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
        Sobre mí
      </h1>

      <div className="text-center">
        <p>
          Astróloga-Tarotista con más de 30 años de experiencia en consultas,
          talleres, cursos, seminarios, programas de radio y televisión.
        </p>
      </div>

      <div className="prose mx-auto mt-14 text-center dark:prose-invert">
        <p>
          Investigadora y estudiosa de temas filosóficos, holísticos y
          espirituales.
        </p>
        <p>
          Procuro estar en constante aprendizaje para brindarles contenido e
          información de calidad a través de nuestro sitio web, así como también
          asesoría personalizada a través de la Astrología y el Tarot con la
          mayor empatía y apoyo espiritual.
        </p>
        <p>
          <Link href="/contacto">Mantente en contacto</Link>
        </p>
      </div>

      {/* Íconos sociales */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        {/* YouTube */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.youtube.com/@revelacionesdecaro"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Fyoutube_4494485.png?alt=media&token=c712a602-66c4-47fa-8a20-7a616a6a1b99"
            alt="youtube"
          />
        </a>
        {/* Facebook */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.facebook.com/revelacionesdecaro"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ffacebook-logo_2504792.png?alt=media&token=cb0ce98c-7148-44e0-824e-966f8de84ae2"
            alt="facebook"
          />
        </a>
        {/* Instagram */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.instagram.com/revelacionesdecaro/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Finstagram_4494489.png?alt=media&token=39323f0a-f0a6-4892-9960-020a7633c25f"
            alt="instagram"
          />
        </a>
        {/* Twitter */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://twitter.com/carorevela/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ftwitter_5969020.png?alt=media&token=51501e23-e068-4bea-9f0c-48874c731fb3"
            alt="twitter"
          />
        </a>
        {/* TikTok */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.tiktok.com/@revelacionesdecaro?_t=8hxlOKxZgJh&_r=1"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ftik-tok_4782345.png?alt=media&token=ae5b81c8-715e-4079-9af5-cc8902ab89ea"
            alt="tiktok"
          />
        </a>
        {/* Threads */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.threads.net/@revelacionesdecaro"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Fthreads.png?alt=media&token=449b7a0d-c9bd-44fb-97f3-a928fc006257"
            alt="threads"
          />
        </a>
      </div>
    </div>
  );
}
