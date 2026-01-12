import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  getDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "./environments";
import { Article } from "@/app/types/types";

// Función para obtener los últimos 6 artículos
export async function getLastArticles(): Promise<Article[]> {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, orderBy("fecha", "desc"), limit(2)); // ajusta el límite a 2 si solo quieres los dos últimos
  const results = await getDocs(q);

  const articles: Article[] = results.docs.map((doc) => {
    const data = doc.data() as Article; // aquí extraes los campos del documento
    return {
      id: doc.id,
      titulo: data.titulo,
      img: data.img,
      fecha: data.fecha ?? "Fecha desconocida",
      description: data.description ?? "",
      autor: data.autor ?? "Autor desconocido",
      youtubeVideoId: data.youtubeVideoId ?? "",
      contenido: data.contenido ?? "",
    };
  });

  return articles;
}

// Función para obtener todos los artículos
export async function getAllArticles() {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, orderBy("fecha", "desc"));
  const results = await getDocs(q);
  const allArticles = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("Total artículos:", allArticles.length);

  return allArticles;
}

// Función para obtener un artículo por ID
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    const docRef = doc(db, "articles", String(id));
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...(docSnapshot.data() as Omit<Article, "id">),
      };
    } else {
      console.warn("No se encontró ningún artículo con el ID proporcionado.");
      return null;
    }
  } catch (error) {
    console.error("Error al buscar el artículo por ID:", error);
    return null;
  }
}

// Función para buscar artículos por título
