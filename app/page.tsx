import { allPosts } from "content-collections";
import Link from "next/link";

function PostItem({
  url,
  title,
  summary,
}: {
  url: string;
  title: string;
  summary: string;
}) {
  return (
    <Link href={url}>
      <div className="m-2 p-4 border flex flex-col">
        <div className="text-xl">{title}</div>
        <div className="opacity-70">{summary}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div>
      <div className="flex flex-col">
        {allPosts.map((post) => (
          <PostItem
            key={post._meta.path}
            url={`/blog/${post._meta.path}`}
            title={post.title}
            summary={post.summary}
          />
        ))}
      </div>
    </div>
  );
}
