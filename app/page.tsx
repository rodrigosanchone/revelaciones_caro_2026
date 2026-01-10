import Image from "next/image";
import TwoPost from "./components/twoPost";
import PostList from "./components/postList";

export default function Home() {
  return (
    <div className="">
      <TwoPost></TwoPost>
      <PostList></PostList>
    </div>
  );
}
