import React, { useState } from 'react';
import { MoodTracker } from './components/MoodTracker'
import { SelfTest } from './components/SelfTest'
import { Resources } from './components/Resources'
import { ChatBot } from './components/ChatBot'
import { Auth } from './components/Auth'

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'mood':
        return <MoodTracker />
      case 'test':
        return <SelfTest />
      case 'resources':
        return <Resources />
      case 'chat':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
            <div className="container mx-auto py-8">
              <ChatBot />
            </div>
          </div>
        )
      default:
        return <Home onPageChange={setCurrentPage} />
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto py-8">
        {renderPage()}
        
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