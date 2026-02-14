import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function WidthLimit({
  children,
  className,
}: Readonly<ContainerProps>) {
  return (
    <div className="w-full flex flex-col items-center">
      <div
        className={cn(
          "w-full px-8 lg:px-0",
          "max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-5xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
