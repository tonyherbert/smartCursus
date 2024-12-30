'use client';

import { Block } from './block-editor';
import { TextBlock } from './block-types/text-block';
import { CodeBlock } from './block-types/code-block';
import { ListBlock } from './block-types/list-block';

interface BlockListProps {
  blocks: Block[];
  setBlocks: (blocks: Block[]) => void;
  isPreview?: boolean;
}

export function BlockList({ blocks, setBlocks, isPreview = false }: BlockListProps) {
  const updateBlockContent = (id: string, content: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const updateBlockLanguage = (id: string, language: string) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, language } : block
      )
    );
  };

  return (
    <div className={`space-y-8 ${isPreview ? 'prose prose-slate max-w-none' : 'space-y-4'}`}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'text':
            return (
              <TextBlock
                key={block.id}
                content={block.content}
                onChange={(content) => updateBlockContent(block.id, content)}
                isPreview={isPreview}
              />
            );
          case 'code':
            return (
              <CodeBlock
                key={block.id}
                content={block.content}
                language={block.language}
                onChange={(content) => updateBlockContent(block.id, content)}
                onLanguageChange={(language) => updateBlockLanguage(block.id, language)}
                isPreview={isPreview}
              />
            );
          case 'list':
            return (
              <ListBlock
                key={block.id}
                content={block.content}
                onChange={(content) => updateBlockContent(block.id, content)}
                isPreview={isPreview}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}