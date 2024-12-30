"use client";

import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { uploadImageAction } from "@/src/features/images/upload-image.action";
import { useMutation } from "@tanstack/react-query";
import { resolveActionResult } from "@/src/lib/actions/actions-utils";
import { toast } from "sonner";
import { Switch } from "@/src/components/ui/switch";
import { AspectRatio } from "@/src/components/ui/aspect-ratio";
import { Badge } from "@/src/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { useState, useEffect } from "react";

interface ImageBlockProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
  isPreview?: boolean;
  isSelected?: boolean;
  onSrcChange?: (src: string) => void;
  onAltChange?: (alt: string) => void;
  onCaptionChange?: (caption: string) => void;
  onWidthChange?: (width: number) => void;
  onHeightChange?: (height: number) => void;
  onMaintainAspectRatioChange?: (maintain: boolean) => void;
}

type ImageDimensions = {
  width: number;
  height: number;
  aspectRatio: number;
};

type PresetSize = {
  label: string;
  width: number;
  height?: number;
  aspectRatio?: number;
};

const commonPresets: PresetSize[] = [
  { label: "Petite", width: 320 },
  { label: "Moyenne", width: 640 },
  { label: "Grande", width: 1024 },
  { label: "Pleine largeur", width: 1920 },
];

const aspectRatioPresets: PresetSize[] = [
  { label: "Carré 1:1", width: 600, height: 600, aspectRatio: 1 },
  { label: "Paysage 16:9", width: 800, height: 450, aspectRatio: 16 / 9 },
  { label: "Paysage 4:3", width: 800, height: 600, aspectRatio: 4 / 3 },
  { label: "Paysage 3:2", width: 800, height: 533, aspectRatio: 3 / 2 },
  { label: "Portrait 2:3", width: 600, height: 900, aspectRatio: 2 / 3 },
  { label: "Portrait 3:4", width: 600, height: 800, aspectRatio: 3 / 4 },
];

export function ImageBlock({
  src,
  alt,
  caption,
  width,
  height,
  maintainAspectRatio = true,
  isPreview = false,
  isSelected = false,
  onSrcChange,
  onAltChange,
  onCaptionChange,
  onWidthChange,
  onHeightChange,
  onMaintainAspectRatioChange,
}: ImageBlockProps) {
  const [originalDimensions, setOriginalDimensions] =
    useState<ImageDimensions | null>(null);
  const [activeTab, setActiveTab] = useState<"libre" | "presets" | "ratios">(
    "libre",
  );

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      return resolveActionResult(uploadImageAction({ formData }));
    },
    onSuccess: (data) => {
      onSrcChange?.(data.url);
      toast.success("Image téléchargée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors du téléchargement de l'image");
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMutation.mutate(file);
    }
  };

  const getImageDimensions = (url: string): Promise<ImageDimensions> => {
    if (typeof window === "undefined") {
      return Promise.resolve({ width: 0, height: 0, aspectRatio: 1 });
    }

    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight,
          aspectRatio: img.naturalWidth / img.naturalHeight,
        });
      };
      img.src = url;
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && src) {
      getImageDimensions(src).then(setOriginalDimensions);
    }
  }, [src]);

  const handlePresetSelect = (preset: PresetSize) => {
    if (!originalDimensions) return;

    if (preset.aspectRatio) {
      const newWidth = preset.width;
      const newHeight = Math.round(newWidth / preset.aspectRatio);
      onWidthChange?.(newWidth);
      onHeightChange?.(newHeight);
    } else {
      const scale = preset.width / originalDimensions.width;
      const newHeight = Math.round(originalDimensions.height * scale);
      onWidthChange?.(preset.width);
      onHeightChange?.(newHeight);
    }
  };

  const DimensionsIndicator = () => (
    <div className="absolute top-2 right-2 bg-black/75 text-white px-2 py-1 rounded-md text-xs">
      {width || "100%"} × {height || "auto"}
    </div>
  );

  if (isPreview) {
    return (
      <figure className="mb-4 relative">
        {src && (
          <div
            className="relative overflow-hidden rounded-lg"
            style={{
              width: width ? `${width}px` : "100%",
              height: height ? `${height}px` : "auto",
              margin: "0 auto",
            }}
          >
            <Image
              src={src}
              alt={alt}
              width={width || undefined}
              height={height || undefined}
              className={
                width || height
                  ? "object-contain w-full h-full"
                  : "object-cover"
              }
            />
            {(width || height) && <DimensionsIndicator />}
          </div>
        )}
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <Card className={cn("p-4 space-y-4", isSelected && "ring-2 ring-primary")}>
      <div className="space-y-2">
        <Label>Image</Label>
        <div className="flex items-center gap-2">
          <Input
            value={src}
            onChange={(e) => onSrcChange?.(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="max-w-[200px]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Texte alternatif</Label>
        <Input
          value={alt}
          onChange={(e) => onAltChange?.(e.target.value)}
          placeholder="Description de l'image"
        />
      </div>
      <div className="space-y-2">
        <Label>Légende (optionnelle)</Label>
        <Input
          value={caption}
          onChange={(e) => onCaptionChange?.(e.target.value)}
          placeholder="Légende sous l'image"
        />
      </div>
      <Tabs defaultValue="libre" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="libre">Libre</TabsTrigger>
          <TabsTrigger value="presets">Tailles</TabsTrigger>
          <TabsTrigger value="ratios">Ratios</TabsTrigger>
        </TabsList>

        <TabsContent value="libre" className="space-y-4">
          <div className="flex items-center gap-2">
            <Label htmlFor="maintain-ratio" className="flex items-center gap-2">
              <Switch
                id="maintain-ratio"
                checked={maintainAspectRatio}
                onCheckedChange={onMaintainAspectRatioChange}
              />
              Conserver le ratio d'aspect
            </Label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Largeur (px)</Label>
              <Input
                type="number"
                value={width || ""}
                onChange={(e) => {
                  const newWidth = parseInt(e.target.value);
                  onWidthChange?.(isNaN(newWidth) ? 0 : newWidth);
                  if (maintainAspectRatio && originalDimensions) {
                    const newHeight = Math.round(
                      newWidth / originalDimensions.aspectRatio,
                    );
                    onHeightChange?.(newHeight);
                  }
                }}
                placeholder="Auto"
              />
            </div>
            <div className="space-y-2">
              <Label>Hauteur (px)</Label>
              <Input
                type="number"
                value={height || ""}
                onChange={(e) => {
                  const newHeight = parseInt(e.target.value);
                  onHeightChange?.(isNaN(newHeight) ? 0 : newHeight);
                  if (maintainAspectRatio && originalDimensions) {
                    const newWidth = Math.round(
                      newHeight * originalDimensions.aspectRatio,
                    );
                    onWidthChange?.(newWidth);
                  }
                }}
                placeholder="Auto"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="presets" className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {commonPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                onClick={() => {
                  onWidthChange?.(preset.width);
                  if (originalDimensions && maintainAspectRatio) {
                    const newHeight = Math.round(
                      preset.width / originalDimensions.aspectRatio,
                    );
                    onHeightChange?.(newHeight);
                  }
                }}
                className="w-full justify-between"
              >
                <span>{preset.label}</span>
                <span className="text-xs text-muted-foreground">
                  {preset.width}px
                </span>
              </Button>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ratios" className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {aspectRatioPresets.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                onClick={() => {
                  onWidthChange?.(preset.width);
                  onHeightChange?.(preset.height);
                }}
                className="w-full justify-between"
              >
                <span>{preset.label}</span>
                <span className="text-xs text-muted-foreground">
                  {preset.width}×{preset.height}
                </span>
              </Button>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {originalDimensions && (
        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-2">
          <Badge variant="secondary">
            Original : {originalDimensions.width} × {originalDimensions.height}
            px
          </Badge>
          <Badge variant="secondary">
            Actuel : {width || "100%"} × {height || "auto"}
          </Badge>
        </div>
      )}
    </Card>
  );
}
