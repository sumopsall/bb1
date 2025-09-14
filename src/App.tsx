import React from 'react';
import { ChatBot } from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto py-8">
        <ChatBot />
        
        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">
            Care4U is here to provide support and guidance for your mental well-being.
          </p>
          <p className="text-xs">
            If you're experiencing a mental health crisis, please contact a professional immediately or call a crisis helpline.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;