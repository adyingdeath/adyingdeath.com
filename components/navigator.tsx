"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import headerNavLinks from "@/data/headerNavLinks";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navigator() {
  return (
    <nav className="w-full sticky top-0 z-50 py-4">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-muted/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <Avatar>
              <AvatarImage src="/static/favicons/android-chrome-96x96.png" alt="Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-4 flex-1 justify-center">
              {headerNavLinks.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground hover:underline sm:hidden"
                >
                  {link.title}
                </Link>
              ))}
              <div className="hidden sm:flex items-center gap-6">
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:underline"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
            <div className="sm:hidden">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="cursor-pointer">
                    <Menu size={20} />
                  </Button>
                </DrawerTrigger>
                <DrawerContent title="Website navigator">
                  <ul className="flex flex-col gap-1 p-4">
                    {headerNavLinks.map((link) => (
                      <li key={link.href}>
                        <DrawerClose asChild>
                          <Link
                            href={link.href}
                            className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-background/50 rounded-lg cursor-pointer"
                          >
                            {link.title}
                          </Link>
                        </DrawerClose>
                      </li>
                    ))}
                  </ul>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
