import Image from "next/image";
import TwoPost from "./components/twoPost";
import PostListPreview from "./components/postListPreview";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <TwoPost></TwoPost>
      <PostListPreview></PostListPreview>
      <Suspense fallback={<div>Cargando artículos...</div>}></Suspense>
    </div>
  );
}
