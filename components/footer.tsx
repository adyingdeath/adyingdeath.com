import Link from "next/link";
import { socialLinks } from "@/data/social-links";
import { Github } from "@/components/icons/github";
import { Instagram } from "@/components/icons/instagram";
import { X } from "@/components/icons/x";

const SocialLink = ({ children, url, label }: { children: React.ReactElement, url: string, label: string }) => (
  <Link
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-foreground transition-colors"
    aria-label={label}
  >
    {children}
  </Link>
);

export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-border/50">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-center gap-6 mb-4">
          <SocialLink url={socialLinks.github} label="GitHub">
            <Github />
          </SocialLink>
          <SocialLink url={socialLinks.x} label="X">
            <X />
          </SocialLink>
          <SocialLink url={socialLinks.instagram} label="Instagram">
            <Instagram />
          </SocialLink>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          © 2026 adyingdeath. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
