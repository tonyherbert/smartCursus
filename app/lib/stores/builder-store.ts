"use client";

import { create } from "zustand";
import { BuilderSection, BuilderComponent } from "../../types/builder";

interface BuilderStore {
  sections: BuilderSection[];
  selectedSectionId: string | null;
  selectedComponentId: string | null;
  addSection: (section: BuilderSection) => void;
  updateSection: (id: string, updates: Partial<BuilderSection>) => void;
  deleteSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  reorderSections: (activeId: string, overId: string) => void;
  addComponent: (type: BuilderComponent["type"]) => void;
  updateComponent: (
    sectionId: string,
    componentId: string,
    updates: Partial<BuilderComponent>,
  ) => void;
  deleteComponent: (sectionId: string, componentId: string) => void;
  selectSection: (id: string | null) => void;
  selectComponent: (id: string | null) => void;
  updateSectionLayout: (id: string, layout: BuilderSection["layout"]) => void;
  updateColumnCount: (id: string, count: number) => void;
}

export const useBuilderStore = create<BuilderStore>((set) => ({
  // Initialize with empty arrays and null values
  sections: [],
  selectedSectionId: null,
  selectedComponentId: null,

  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, section],
      selectedSectionId: section.id,
      selectedComponentId: null,
    })),

  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section,
      ),
    })),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
      selectedSectionId:
        state.selectedSectionId === id ? null : state.selectedSectionId,
      selectedComponentId: null,
    })),

  duplicateSection: (id) =>
    set((state) => {
      const sectionToDuplicate = state.sections.find(
        (section) => section.id === id,
      );
      if (!sectionToDuplicate) return state;

      const duplicatedSection = {
        ...sectionToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        components: sectionToDuplicate.components.map((component) => ({
          ...component,
          id: Math.random().toString(36).substr(2, 9),
        })),
      };

      return {
        sections: [...state.sections, duplicatedSection],
      };
    }),

  reorderSections: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.sections.findIndex((s) => s.id === activeId);
      const newIndex = state.sections.findIndex((s) => s.id === overId);

      const newSections = [...state.sections];
      const [removed] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, removed);

      return { sections: newSections };
    }),

  addComponent: (type) =>
    set((state) => {
      if (!state.selectedSectionId) return state;

      const newComponent: BuilderComponent = {
        id: Math.random().toString(36).substr(2, 9),
        type,
        props: { content: "", style: {} },
      };

      return {
        sections: state.sections.map((section) =>
          section.id === state.selectedSectionId
            ? { ...section, components: [...section.components, newComponent] }
            : section,
        ),
        selectedComponentId: newComponent.id,
      };
    }),

  updateComponent: (sectionId, componentId, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: section.components.map((component) =>
                component.id === componentId
                  ? { ...component, ...updates }
                  : component,
              ),
            }
          : section,
      ),
    })),

  deleteComponent: (sectionId, componentId) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              components: section.components.filter(
                (component) => component.id !== componentId,
              ),
            }
          : section,
      ),
      selectedComponentId:
        state.selectedComponentId === componentId
          ? null
          : state.selectedComponentId,
    })),

  selectSection: (id) =>
    set({ selectedSectionId: id, selectedComponentId: null }),

  selectComponent: (id) => set({ selectedComponentId: id }),

  updateSectionLayout: (id, layout) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id
          ? {
              ...section,
              layout,
              columnCount:
                layout === "columns" ? section.columnCount || 2 : undefined,
            }
          : section,
      ),
    })),

  updateColumnCount: (id, count) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, columnCount: count } : section,
      ),
    })),
}));
