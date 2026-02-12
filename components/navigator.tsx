import Link from "next/link";
import headerNavLinks from "@/data/headerNavLinks";

export default function Navigator() {
  return (
    <nav className="w-full sticky top-0 z-50 py-4">
      <div className="max-w-md mx-auto">
        <div className="bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
          <ul className="flex items-center justify-center gap-6">
            {headerNavLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
