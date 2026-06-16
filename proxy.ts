import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { postsData } from "./data/blog/redirects-data";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const rest = pathname.split("/").filter((p) => p.length > 0).slice(1);

  if (rest.length === 0) {
    return NextResponse.next();
  }

  const idPost = postsData.find((p) => p.id === rest[0]);
  if (idPost) {
    const currentSlug = rest.slice(1).join("/");
    if (currentSlug !== idPost.slug) {
      return NextResponse.redirect(
        new URL(`/blog/${idPost.id}/${idPost.slug}`, request.url),
        { status: 308 },
      );
    }
    return NextResponse.next();
  }

  // Fallback for `/blog/{slug}` instead of `/blog/{id}/{slug}`
  const oldPost = postsData.find((p) => p.slug === rest.join("/"));
  if (oldPost) {
    return NextResponse.redirect(
      new URL(`/blog/${oldPost.id}/${oldPost.slug}`, request.url),
      { status: 308 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/blog/:path*",
};
