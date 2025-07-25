"use client";

import React from 'react';
import { useZZQChat } from '@/contexts/ZZQChatContext';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Sparkles } from 'lucide-react';

interface ZZQContextMenuProps {
  children: React.ReactNode;
  contextLabel: string;
  className?: string;
}

export function ZZQContextMenu({ children, contextLabel, className }: ZZQContextMenuProps) {
  const { openChat } = useZZQChat();

  const handleAskZZQ = () => {
    openChat(contextLabel);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger className={className}>
        {children}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem 
          onClick={handleAskZZQ}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="h-4 w-4 text-purple-600" />
          <span>Ask ZZQ</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}