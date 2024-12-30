"use client";

import Image from "next/image";
import { cn } from "@/src/lib/utils";

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  isPreview?: boolean;
}

export function ImageBlock({
  src,
  alt,
  caption,
  width,
  height,
  isPreview = false,
}: ImageBlockProps) {
  if (!src) return null;

  return (
    <figure className="my-4">
      <div
        className={cn(
          "relative overflow-hidden rounded-lg mx-auto",
          // Si pas de dimensions spécifiées, prendre toute la largeur
          !width && !height && "w-full",
        )}
        style={{
          width: width ? `${width}px` : "100%",
          height: height ? `${height}px` : "auto",
          maxWidth: "100%", // Évite le débordement sur mobile
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={cn(
            "rounded-lg",
            width || height
              ? "object-contain w-full h-full"
              : "object-cover w-full",
          )}
          style={{
            width: width ? `${width}px` : "100%",
            height: height ? `${height}px` : "auto",
          }}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
