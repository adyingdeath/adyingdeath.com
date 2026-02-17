import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import WidthLimit from "@/components/container";
import BlogCard from "@/components/blog-card";
import { sortedPosts } from "@/app/utils/sorted-posts";
import { getCanonicalUrl } from "@/lib/site-config";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const metadata: Metadata = {
  title: "Blog",
  alternates: {
    canonical: getCanonicalUrl("/blog"),
  },
};

const POSTS_PER_PAGE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));
  const totalPosts = sortedPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const postsToShow = sortedPosts.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <WidthLimit className="my-12">
        <div className="mb-12 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Blog
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Thoughts, tutorials, and updates from my journey as a developer.
          </p>
        </div>
        <div className="flex flex-col">
          {postsToShow.map((post, index) => (
            <div key={post._meta.path}>
              <BlogCard
                variant="default"
                url={`/blog/${post._meta.path}`}
                title={post.title}
                summary={post.summary}
                date={post.date}
              />
              {index < postsToShow.length - 1 && <Separator />}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={
                        currentPage !== 2
                          ? `/blog?page=${currentPage - 1}`
                          : "/blog"
                      }
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            href={page === 1 ? "/blog" : `/blog?page=${page}`}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }

                    if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }

                    return null;
                  },
                )}

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationNext href={`/blog?page=${currentPage + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </WidthLimit>
    </div>
  );
}
