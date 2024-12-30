export type ComponentType = 
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'image'
  | 'list'
  | 'callout';

export type SectionLayout = 'full' | 'columns' | 'hero';

export interface BuilderComponent {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
}

export interface BuilderSection {
  id: string;
  type: string;
  title: string;
  description: string;
  layout: SectionLayout;
  components: BuilderComponent[];
  columnCount?: number;
}

export const sectionLayouts = {
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
  }
} as const;