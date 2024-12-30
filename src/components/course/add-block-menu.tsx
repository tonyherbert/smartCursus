"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Plus, Type, Image, Code, List } from "lucide-react";
import { Block } from "./block-editor";

interface AddBlockMenuProps {
  onAddBlock: (type: Block["type"]) => void;
}

export function AddBlockMenu({ onAddBlock }: AddBlockMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un bloc
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onAddBlock("text")}>
          <Type className="mr-2 h-4 w-4" />
          Texte
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddBlock("image")}>
          <Image className="mr-2 h-4 w-4" />
          Image
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddBlock("code")}>
          <Code className="mr-2 h-4 w-4" />
          Code
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onAddBlock("list")}>
          <List className="mr-2 h-4 w-4" />
          Liste
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
