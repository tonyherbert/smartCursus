"use client";

import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Trash2, Copy } from "lucide-react";
import {
  BuilderSection,
  SectionLayout,
  sectionLayouts,
} from "@/app/types/builder";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

interface SectionControlsProps {
  section: BuilderSection;
  onLayoutChange: (layout: SectionLayout) => void;
  onColumnCountChange: (count: number) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function SectionControls({
  section,
  onLayoutChange,
  onColumnCountChange,
  onDelete,
  onDuplicate,
}: SectionControlsProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="flex items-center gap-4 flex-wrap flex-1 min-w-0">
        <Select value={section.layout} onValueChange={onLayoutChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de section" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(sectionLayouts).map(([key, layout]) => (
              <SelectItem key={key} value={key}>
                <div className="flex flex-col">
                  <span className="truncate">{layout.label}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {layout.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {section.layout === "columns" && (
          <Select
            value={section.columnCount?.toString() || "2"}
            onValueChange={(value) => onColumnCountChange(parseInt(value))}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Colonnes" />
            </SelectTrigger>
            <SelectContent>
              {[2, 3, 4].map((count) => (
                <SelectItem key={count} value={count.toString()}>
                  {count} colonnes
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onDuplicate}
          className="hover:bg-secondary"
        >
          <Copy className="h-4 w-4" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Supprimer la section</AlertDialogTitle>
              <AlertDialogDescription>
                Êtes-vous sûr de vouloir supprimer cette section ? Cette action
                est irréversible.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} className="bg-destructive">
                Supprimer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
