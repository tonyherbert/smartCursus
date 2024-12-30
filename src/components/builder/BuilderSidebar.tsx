"use client";

import { BuilderComponent } from "@/src/types/builder";
import { Card } from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { TextFormatToolbar } from "./text/TextFormatToolbar";

interface BuilderSidebarProps {
  selectedComponent: BuilderComponent | undefined;
  isHeaderSection?: boolean;
  onUpdate: (updates: Partial<BuilderComponent>) => void;
}

export function BuilderSidebar({
  selectedComponent,
  isHeaderSection,
  onUpdate,
}: BuilderSidebarProps) {
  if (!selectedComponent) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground">
          Cliquez sur un élément pour modifier ses propriétés
        </p>
      </Card>
    );
  }

  const updateProps = (updates: Record<string, any>) => {
    onUpdate({
      props: {
        ...selectedComponent.props,
        ...updates,
      },
    });
  };

  return (
    <Card className="p-4 space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Type de composant</h3>
        <p className="text-sm text-muted-foreground capitalize">
          {selectedComponent.type}
        </p>
      </div>

      {/* Position dans l'en-tête si applicable */}
      {isHeaderSection && (
        <div className="space-y-2">
          <Label>Position dans l'en-tête</Label>
          <Select
            value={selectedComponent.props.position || "left"}
            onValueChange={(value) => updateProps({ position: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choisir une position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Gauche</SelectItem>
              <SelectItem value="center">Centre</SelectItem>
              <SelectItem value="right">Droite</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Contrôles spécifiques selon le type */}
      {selectedComponent.type === "heading" && (
        <>
          <div className="space-y-2">
            <Label>Niveau de titre</Label>
            <Select
              value={selectedComponent.props.level?.toString()}
              onValueChange={(value) => updateProps({ level: parseInt(value) })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir un niveau" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <SelectItem key={level} value={level.toString()}>
                    Niveau {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Style du texte</Label>
            <TextFormatToolbar
              style={selectedComponent.props.style || {}}
              onChange={(style) => updateProps({ style })}
            />
          </div>
        </>
      )}

      {/* Autres contrôles spécifiques inchangés... */}

      {/* Champ de contenu commun à tous les types */}
      <div className="space-y-2">
        <Label>Contenu</Label>
        {selectedComponent.type === "paragraph" ? (
          <Textarea
            value={selectedComponent.props.content || ""}
            onChange={(e) => updateProps({ content: e.target.value })}
            className="min-h-[150px]"
          />
        ) : (
          <Input
            value={selectedComponent.props.content || ""}
            onChange={(e) => updateProps({ content: e.target.value })}
          />
        )}
      </div>
    </Card>
  );
}
