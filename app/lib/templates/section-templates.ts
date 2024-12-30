"use client";

import { BuilderSection } from "@/src/types/builder";

export interface SectionTemplate extends Omit<BuilderSection, "id"> {
  key: string;
  icon: string;
  tooltip: string;
}

export const pedagogicalSectionTemplates: SectionTemplate[] = [
  {
    key: "introduction",
    type: "introduction",
    title: "Introduction",
    description: "Présentez votre cours et son contexte",
    tooltip:
      "Commencez par une introduction qui présente le sujet et capte l'attention",
    icon: "BookOpen",
    layout: "full",
    components: [
      {
        id: "intro-title",
        type: "heading",
        props: {
          content: "Introduction",
          level: 1,
          style: { align: "center" },
        },
      },
      {
        id: "intro-description",
        type: "paragraph",
        props: {
          content: "Présentez votre cours et son contexte",
          style: {},
        },
      },
    ],
  },
  {
    key: "objectives",
    type: "objectives",
    title: "Objectifs",
    description: "Définissez les objectifs d'apprentissage",
    tooltip: "Listez les compétences que les apprenants acquerront",
    icon: "Target",
    layout: "full",
    components: [
      {
        id: "obj-title",
        type: "heading",
        props: {
          content: "Objectifs d'apprentissage",
          level: 2,
        },
      },
      {
        id: "obj-list",
        type: "list",
        props: {
          items: [
            "Premier objectif",
            "Deuxième objectif",
            "Troisième objectif",
          ],
        },
      },
    ],
  },
  {
    key: "practice",
    type: "practice",
    title: "Pratique",
    description: "Créez des exercices pratiques",
    tooltip: "Proposez des exercices pour mettre en pratique les concepts",
    icon: "PenTool",
    layout: "full",
    components: [
      {
        id: "practice-title",
        type: "heading",
        props: {
          content: "Exercices pratiques",
          level: 2,
        },
      },
      {
        id: "practice-intro",
        type: "callout",
        props: {
          type: "info",
          title: "Instructions",
          content: "Complétez les exercices suivants",
        },
      },
    ],
  },
  {
    key: "assessment",
    type: "assessment",
    title: "Évaluation",
    description: "Évaluez les acquis des apprenants",
    tooltip: "Créez une évaluation pour vérifier la compréhension",
    icon: "ClipboardCheck",
    layout: "full",
    components: [
      {
        id: "assessment-title",
        type: "heading",
        props: {
          content: "Évaluation des acquis",
          level: 2,
        },
      },
    ],
  },
  {
    key: "resources",
    type: "resources",
    title: "Ressources",
    description: "Ajoutez des ressources complémentaires",
    tooltip: "Listez les ressources supplémentaires pour approfondir",
    icon: "Library",
    layout: "full",
    components: [
      {
        id: "resources-title",
        type: "heading",
        props: {
          content: "Ressources supplémentaires",
          level: 2,
        },
      },
      {
        id: "resources-list",
        type: "list",
        props: {
          items: [
            "Documentation officielle",
            "Articles complémentaires",
            "Vidéos explicatives",
          ],
        },
      },
    ],
  },
  {
    key: "summary",
    type: "summary",
    title: "Résumé",
    description: "Résumez les points clés du cours",
    tooltip: "Récapitulez les points importants abordés",
    icon: "FileCheck",
    layout: "full",
    components: [
      {
        id: "summary-title",
        type: "heading",
        props: {
          content: "Résumé du cours",
          level: 2,
        },
      },
      {
        id: "summary-content",
        type: "callout",
        props: {
          type: "info",
          title: "Points clés",
          content: "Récapitulatif des points importants",
        },
      },
    ],
  },
];
