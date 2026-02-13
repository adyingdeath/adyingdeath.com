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
          "w-full px-4 sm:px-6 lg:px-8",
          "max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl xl:max-w-5xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
