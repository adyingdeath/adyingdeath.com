import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import WidthLimit from "@/components/container";

export default function NotFound() {
  return (
    <div className="bg-background flex items-center">
      <WidthLimit className="my-12">
        <div className="text-center">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-foreground mb-4 tracking-tight">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Lost in the Void
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            This page is playing hide and seek...<br />
            and it's winning.
          </p>
          <Link href="/">
            <Button size="lg" className="cursor-pointer">
              <Home className="h-4 w-4 mr-2" />
              Escape to Home
            </Button>
          </Link>
        </div>
      </WidthLimit>
    </div>
  );
}
