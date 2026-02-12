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
    <Link href={url} target="_blank">
      <div className="group relative m-3 p-6 bg-card border border-border rounded-xl shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-primary/0 to-primary/5 group-hover:from-primary/5 group-hover:via-primary/2 group-hover:to-primary/10 transition-all duration-300" />
        <div className="relative z-10">
          <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-300 mb-2">{title}</h2>
          <p className="text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-300 line-clamp-2">{summary}</p>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-foreground mb-4 tracking-tight">Welcome to My Blog</h1>
          <p className="text-xl text-muted-foreground">Sharing technology, thoughts, and life</p>
        </div>
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
    </div>
  );
}
