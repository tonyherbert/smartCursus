"use client";

import { CollapsiblePanel } from "../../layout/collapsible-panel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";
import { TableOfContents } from "../table-of-contents";
import { EditorSidebar } from "./editor-sidebar";

interface EditorLayoutProps {
  isPreview: boolean;
  children: React.ReactNode;
}

export function EditorLayout({ isPreview, children }: EditorLayoutProps) {
  return (
    <ResizablePanelGroup direction="horizontal">
      {!isPreview && (
        <>
          <CollapsiblePanel side="left" className="border-r">
            <EditorSidebar />
          </CollapsiblePanel>
          <ResizableHandle />
        </>
      )}

      <ResizablePanel defaultSize={isPreview ? 100 : 60}>
        <div className="h-full overflow-y-auto">
          <div className="container max-w-5xl mx-auto py-8 px-4">
            {children}
          </div>
        </div>
      </ResizablePanel>

      {!isPreview && (
        <>
          <ResizableHandle />
          <CollapsiblePanel side="right" className="border-l">
            <TableOfContents />
          </CollapsiblePanel>
        </>
      )}
    </ResizablePanelGroup>
  );
}
