export interface HtmlMetaOverrides {
  /** Override the <title> meta tag */
  title?: string;
  /** Override the <meta name="description"> tag */
  description?: string;
  /** Override the canonical URL */
  canonical?: string;
}

export interface BlogMeta {
  /** Display title of the blog post */
  title: string;
  /** Short description / excerpt */
  summary: string;
  /** Publish date string parseable by `new Date()` (e.g. "2025-05-03" or "2025-1-1 22:53") */
  date: string;
  /** Whether the post is still a draft (excluded from production build) */
  draft?: boolean;
  /** Optional hero image path */
  image?: string;
  /** Override auto-computed HTML meta tags (title, description, canonical) */
  htmlMeta?: HtmlMetaOverrides;
}

export interface BlogPost {
  /** unique identifier for routing and binding with external data (e.g. database) */
  id: string;
  /** URL-safe slug (e.g., "ai/do-ai-have-consciousness") */
  slug: string;
  /** Structured metadata */
  meta: BlogMeta;
  /** The article content component (server component) */
  component: React.ComponentType;
  /** Pre-computed canonical URL path (/blog/{id}/{slug}) */
  path: string;
}
