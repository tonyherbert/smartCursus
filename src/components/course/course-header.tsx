"use client";

import { Button } from "@/src/components/ui/button";
import { Save } from "lucide-react";

export function CourseHeader() {
  return (
    <div className="border-b">
      <div className="container flex h-16 items-center px-4 justify-between">
        <h1 className="text-lg font-semibold">Nouveau Cours</h1>
        <div className="flex items-center space-x-4">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Enregistrer
          </Button>
        </div>
      </div>
    </div>
  );
}
