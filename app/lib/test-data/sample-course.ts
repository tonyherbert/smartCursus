"use client";

import { BuilderSection } from "@/src/types/builder";
import { CourseMetadata } from "@/src/types/course";

export const sampleMetadata: CourseMetadata = {
  title: "Introduction à la Programmation Web",
  description:
    "Un cours complet sur les fondamentaux du développement web moderne",
};

export const sampleSections: BuilderSection[] = [
  {
    id: "intro-section",
    type: "introduction",
    title: "Introduction",
    description: "Section d'introduction du cours",
    layout: "full",
    components: [
      {
        id: "intro-title",
        type: "heading",
        props: {
          content: "Bienvenue dans ce cours",
          level: 1,
          style: { align: "center" },
        },
      },
      {
        id: "intro-text",
        type: "paragraph",
        props: {
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          style: {},
        },
      },
    ],
  },
  {
    id: "content-section",
    type: "content",
    title: "Contenu Principal",
    description: "Section de contenu",
    layout: "columns",
    columnCount: 2,
    components: [
      {
        id: "content-1",
        type: "heading",
        props: {
          content: "Premier Chapitre",
          level: 2,
          style: {},
        },
      },
      {
        id: "content-2",
        type: "paragraph",
        props: {
          content:
            "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
          style: {},
        },
      },
    ],
  },
  {
    id: "practice-section",
    type: "practice",
    title: "Exercices",
    description: "Section d'exercices pratiques",
    layout: "full",
    components: [
      {
        id: "practice-title",
        type: "heading",
        props: {
          content: "Exercices Pratiques",
          level: 2,
          style: {},
        },
      },
      {
        id: "practice-callout",
        type: "callout",
        props: {
          type: "info",
          title: "Instructions",
          content:
            "Complétez les exercices suivants pour mettre en pratique les concepts appris.",
        },
      },
      {
        id: "practice-list",
        type: "list",
        props: {
          items: [
            "Premier exercice: Lorem ipsum dolor sit amet",
            "Deuxième exercice: Consectetur adipiscing elit",
            "Troisième exercice: Sed do eiusmod tempor",
          ],
        },
      },
    ],
  },
];
