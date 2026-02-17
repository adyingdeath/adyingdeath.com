export const siteUrl = "https://www.adyingdeath.com";

export function getCanonicalUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}
