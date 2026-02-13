import { allPosts } from "@/.content-collections/generated";

export const sortedPosts = [...allPosts].sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
);