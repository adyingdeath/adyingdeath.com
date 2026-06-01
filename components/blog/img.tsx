import NextImage from "next/image";

interface BlogImgProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Optional caption displayed below the image */
  caption?: string;
}

export function Img({ src, width, height, alt, caption }: BlogImgProps) {
  return (
    <figure className="not-prose my-6 flex flex-col items-center">
      <NextImage
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="rounded-md"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
