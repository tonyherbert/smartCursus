'use client';

import { useState } from 'react';
import { BlockList } from './block-list';
import { AddBlockMenu } from './add-block-menu';

export type Block = {
  id: string;
  type: 'text' | 'image' | 'code' | 'list';
  content: string;
  language?: string;
};

interface BlockEditorProps {
  isPreview?: boolean;
}

export function BlockEditor({ isPreview = false }: BlockEditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const addBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'list' ? '[]' : '',
      language: type === 'code' ? 'javascript' : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  return (
    <div className="space-y-4">
      {!isPreview && <AddBlockMenu onAddBlock={addBlock} />}
      <BlockList blocks={blocks} setBlocks={setBlocks} isPreview={isPreview} />
    </div>
  );
}