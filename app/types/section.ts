export type SectionType = 
  | 'introduction'    // Introduction du cours
  | 'objectives'      // Objectifs d'apprentissage
  | 'content'         // Contenu principal
  | 'practice'        // Exercices pratiques
  | 'assessment'      // Évaluation
  | 'resources'       // Ressources supplémentaires
  | 'summary';        // Résumé/Conclusion

export type SectionLayout = 'full' | 'columns' | 'hero' | 'header';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  description: string;
  layout: SectionLayout;
  components: any[];
  columnCount?: number;
}

export const sectionLayouts: Record<SectionLayout, {
  label: string;
  description: string;
  defaultColumnCount?: number;
}> = {
  full: {
    label: 'Pleine largeur',
    description: 'Contenu sur toute la largeur'
  },
  columns: {
    label: 'Colonnes',
    description: 'Contenu organisé en colonnes',
    defaultColumnCount: 2
  },
  hero: {
    label: 'Hero',
    description: 'Grande image avec texte'
  },
  header: {
    label: 'En-tête',
    description: 'Section d\'en-tête avec 3 colonnes'
  }
};