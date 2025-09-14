import React, { useEffect, useRef } from 'react';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { AlertCircle, RefreshCw, Heart } from 'lucide-react';

export const ChatBot: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearError, clearChat, isConfigured } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!isConfigured) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Care4U - Mental Health Support</h1>
          </div>
        </div>
        <div className="p-8 text-center">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">API Key Required</h2>
          <p className="text-gray-600 mb-4">
            To use Care4U, you need to add your Google Gemini API key to the .env file.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <p className="text-sm text-gray-700 mb-2">Steps to set up:</p>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. Get your API key from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Google AI Studio</a></li>
              <li>2. Replace "your_gemini_api_key_here" in the .env file with your actual API key</li>
              <li>3. Refresh the page</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6" />
            <h1 className="text-xl font-semibold">Care4U - Mental Health Support</h1>
          </div>
          <button
            onClick={clearChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Start new conversation"
          >
            <RefreshCw size={16} />
          </button>
        </div>
        <p className="text-blue-100 text-sm mt-1">
          Your supportive digital assistant for stress and emotional well-being
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={clearError}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="h-96 overflow-y-auto">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex gap-3 p-4 bg-blue-50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Heart size={16} className="animate-pulse" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-900">Care4U</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <span className="ml-2 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
    </div>
  );
};