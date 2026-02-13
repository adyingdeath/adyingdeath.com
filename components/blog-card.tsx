import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { format } from "date-fns";

const blogCardVariants = cva("", {
  variants: {
    variant: {
      featured: "py-8",
      recent: "py-6",
      default: "py-8",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BlogCardVariants = VariantProps<typeof blogCardVariants>;

interface BlogCardProps extends BlogCardVariants {
  url: string;
  title: string;
  summary: string;
  date: string;
  showReadMore?: boolean;
}

function BlogCard({
  variant = "default",
  url,
  title,
  summary,
  date,
  showReadMore = false,
}: BlogCardProps) {
  const titleClasses = cn(
    "font-semibold text-foreground group-hover:text-primary transition-colors duration-300",
    {
      "text-2xl mb-3": variant === "featured",
      "text-lg mb-2 line-clamp-1": variant === "recent",
      "text-xl mb-2 line-clamp-1": variant === "default",
    }
  );

  const summaryClasses = cn({
    "text-muted-foreground line-clamp-3": variant === "featured",
    "text-sm text-muted-foreground line-clamp-2": variant === "recent",
    "text-muted-foreground": variant === "default",
  });

  const formattedDate = format(new Date(date), "MMMM d, yyyy");

  return (
    <Link href={url} className="block group">
      <div className={cn(blogCardVariants({ variant }), "cursor-pointer")}>
        <h2 className={titleClasses}>{title}</h2>
        <p className={summaryClasses}>
          <Badge variant="outline">{formattedDate}</Badge> {summary}
        </p>
        {showReadMore && (
          <div className="mt-4 flex items-center text-primary group-hover:translate-x-1 transition-transform duration-300">
            <span className="text-sm font-medium">Read more</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        )}
      </div>
    </Link>
  );
}

export default BlogCard;
