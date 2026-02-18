import { Timestamp } from "firebase/firestore";

export interface Article {
  id: string;
  titulo: string;
  img: string;
  fecha?: string;
  description: string;
  autor: string;
  urlVideo: string;
  contenido: string;
}

export interface PageProps {
  params: Promise<{ slug: string }>;
}
