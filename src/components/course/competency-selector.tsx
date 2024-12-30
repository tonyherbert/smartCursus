"use client";

import { useState } from "react";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Plus, X } from "lucide-react";

export function CompetencySelector() {
  const [competencies, setCompetencies] = useState<string[]>([]);
  const [newCompetency, setNewCompetency] = useState("");

  const addCompetency = () => {
    if (newCompetency.trim() && !competencies.includes(newCompetency)) {
      setCompetencies([...competencies, newCompetency.trim()]);
      setNewCompetency("");
    }
  };

  const removeCompetency = (competency: string) => {
    setCompetencies(competencies.filter((c) => c !== competency));
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          value={newCompetency}
          onChange={(e) => setNewCompetency(e.target.value)}
          placeholder="Ajouter une compétence"
          onKeyPress={(e) => e.key === "Enter" && addCompetency()}
        />
        <Button onClick={addCompetency}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {competencies.map((competency) => (
          <Badge key={competency} variant="secondary">
            {competency}
            <button
              onClick={() => removeCompetency(competency)}
              className="ml-2 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
