import {
  collection,
  getDocs,
  query,
  vercel --force
  limit,
  getDoc,
  doc,
  where,
  setDoc,
} from "firebase/firestore";
import { db } from "./environments";

// Función para obtener los últimos 6 artículos
export async function getLastArticles() {
  const articlesRef = collection(db, "articles");
  const q = query(articlesRef, orderBy("fecha", "desc"), limit(2));
  const results = await getDocs(q);
  const articles = results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return articles; // Devuelve solo los últimos 6 artículos
}

// Función para obtener todos los artículos excepto los últimos 6
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

export async function getArticleById(id) {
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

export async function searchArticlesByTitle(keyword) {
  try {
    const articlesRef = collection(db, "articles");
    const q = query(
      articlesRef,
      where("titulo", "array-contains-any", keyword), // Filtramos por título que contiene la palabra clave
      orderBy("fecha", "desc")
    );
    const results = await setDoc(q);
    const matchingArticles = results.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return matchingArticles;
  } catch (error) {
    console.error("Error al buscar artículos por título:", error);
    return [];
  }
}
