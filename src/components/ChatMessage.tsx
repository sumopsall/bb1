import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div className={`flex gap-3 p-4 ${isAssistant ? 'bg-blue-50' : 'bg-gray-50'}`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isAssistant ? 'bg-blue-500 text-white' : 'bg-gray-500 text-white'
      }`}>
        {isAssistant ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-sm text-gray-900">
            {isAssistant ? 'Care4U' : 'You'}
          </span>
          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {message.content}
        </div>
      </div>
    </div>
  );
};