import Image from "next/image";
import TwoPost from "./components/twoPost";
import PostList from "./components/postList";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="">
      <TwoPost></TwoPost>
      <Suspense fallback={<div>Cargando artículos...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
}
