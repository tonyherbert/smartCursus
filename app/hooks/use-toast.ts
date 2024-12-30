"use client";

import { useToast as useToastUI } from "@/src/components/ui/use-toast";

export function useToast() {
  return useToastUI();
}
