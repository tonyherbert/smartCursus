import { BuilderSection } from "@/src/types/builder";

// Types de sections pédagogiques
export type CourseLayoutType =
  | "introduction" // Introduction du cours
  | "objectives" // Objectifs d'apprentissage
  | "content" // Contenu principal
  | "practice" // Exercices pratiques
  | "assessment" // Évaluation
  | "resources" // Ressources supplémentaires
  | "summary"; // Résumé/Conclusion

// Templates de sections
export const courseTemplates: Record<CourseLayoutType, BuilderSection> = {
  introduction: {
    id: "introduction",
    type: "introduction",
    title: "Introduction",
    description: "Présentez votre cours et son contexte",
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

  objectives: {
    id: "objectives",
    type: "objectives",
    title: "Objectifs",
    description: "Définissez les objectifs d'apprentissage",
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
          content: JSON.stringify([
            "Premier objectif",
            "Deuxième objectif",
            "Troisième objectif",
          ]),
        },
      },
    ],
  },

  content: {
    id: "content",
    type: "content",
    title: "Contenu",
    description: "Ajoutez le contenu principal du cours",
    layout: "full",
    components: [],
  },

  practice: {
    id: "practice",
    type: "practice",
    title: "Pratique",
    description: "Créez des exercices pratiques",
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

  assessment: {
    id: "assessment",
    type: "assessment",
    title: "Évaluation",
    description: "Évaluez les acquis des apprenants",
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

  resources: {
    id: "resources",
    type: "resources",
    title: "Ressources",
    description: "Ajoutez des ressources complémentaires",
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
          content: JSON.stringify([
            "Documentation officielle",
            "Articles complémentaires",
            "Vidéos explicatives",
          ]),
        },
      },
    ],
  },

  summary: {
    id: "summary",
    type: "summary",
    title: "Résumé",
    description: "Résumez les points clés du cours",
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
};

// Layouts spéciaux pour le contenu
export const contentLayouts = {
  theory: {
    title: "Théorie",
    description: "Expliquez les concepts théoriques",
    layout: "full",
  },
  example: {
    title: "Exemple",
    description: "Illustrez avec des exemples concrets",
    layout: "columns",
    columnCount: 2,
  },
  demonstration: {
    title: "Démonstration",
    description: "Montrez une démonstration pratique",
    layout: "hero",
  },
};
