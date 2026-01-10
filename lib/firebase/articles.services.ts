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

// Función para obtener los últimos 6 artículos
export async function getLastArticles() {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, orderBy("fecha", "desc"), limit(6)); // ajusta a 6 si quieres realmente 6
  const results = await getDocs(q);
  const articles = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
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

  return allArticles;
}

// Función para obtener un artículo por ID
export async function getArticleById(id: string) {
  // 👈 aquí tipamos el parámetro
  try {
    const docRef = doc(db, "articles", String(id));
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
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
