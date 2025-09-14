import { useState, useCallback } from 'react';
import { Message, ChatState } from '../types/chat';
import { geminiService } from '../services/geminiService';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: "Hi there! I'm Care4U, your supportive digital assistant. I'm here to help you manage stress, anxiety, and support your emotional well-being. How are you feeling today?",
        role: 'assistant',
        timestamp: new Date(),
      },
    ],
    isLoading: false,
    error: null,
  });

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await geminiService.sendMessage(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  }, []);

  const clearError = useCallback(() => {
    setChatState(prev => ({ ...prev, error: null }));
  }, []);

  const clearChat = useCallback(() => {
    setChatState({
      messages: [
        {
          id: '1',
          content: "Hi there! I'm Care4U, your supportive digital assistant. I'm here to help you manage stress, anxiety, and support your emotional well-being. How are you feeling today?",
          role: 'assistant',
          timestamp: new Date(),
        },
      ],
      isLoading: false,
      error: null,
    });
  }, []);

  return {
    ...chatState,
    sendMessage,
    clearError,
    clearChat,
    isConfigured: geminiService.isConfigured(),
  };
};