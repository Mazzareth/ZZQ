"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'zzq';
  timestamp: Date;
  context?: string;
}

interface ZZQChatContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  currentContext: string | null;
  openChat: (context?: string) => void;
  closeChat: () => void;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

const ZZQChatContext = createContext<ZZQChatContextType | undefined>(undefined);

export function ZZQChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentContext, setCurrentContext] = useState<string | null>(null);

  const openChat = (context?: string) => {
    setIsOpen(true);
    if (context) {
      setCurrentContext(context);
      // Add a system message about the context
      const contextMessage: ChatMessage = {
        id: Date.now().toString(),
        content: `I'm here to help you with ${context}. What would you like to know?`,
        sender: 'zzq',
        timestamp: new Date(),
        context
      };
      setMessages(prev => [...prev, contextMessage]);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      context: currentContext || undefined
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate ZZQ response (in a real app, this would call an AI service)
    setTimeout(() => {
      const zzqResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for asking about ${currentContext || 'that'}! I'm ZZQ, your friendly AI assistant. I'd love to help you with more specific questions about your ${currentContext || 'data'}.`,
        sender: 'zzq',
        timestamp: new Date(),
        context: currentContext || undefined
      };
      setMessages(prev => [...prev, zzqResponse]);
    }, 1000);
  };

  const clearMessages = () => {
    setMessages([]);
    setCurrentContext(null);
  };

  return (
    <ZZQChatContext.Provider value={{
      isOpen,
      messages,
      currentContext,
      openChat,
      closeChat,
      sendMessage,
      clearMessages
    }}>
      {children}
    </ZZQChatContext.Provider>
  );
}

export function useZZQChat() {
  const context = useContext(ZZQChatContext);
  if (context === undefined) {
    throw new Error('useZZQChat must be used within a ZZQChatProvider');
  }
  return context;
}