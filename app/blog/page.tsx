"use client";

import PostList from "@/app/components/postList";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <Suspense>
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}
