import React, { useState } from 'react';
import { ViewMode } from './types';

// POPRAWKA: Usunięcie '/components/' ze ścieżek importu
// Teraz importujemy pliki leżące w tym samym folderze.
import Sidebar from './Sidebar';
import ChatView from './ChatView';
import ImageView from './ImageView';
import DeploymentHelper from './DeploymentHelper';
import LiveView from './LiveView';
import GalleryView from './GalleryView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.CHAT);

  const renderContent = () => {
    switch (activeView) {
      case ViewMode.CHAT:
        return <ChatView />;
      case ViewMode.IMAGE:
        return <ImageView />;
      case ViewMode.LIVE:
        return <LiveView />;
      case ViewMode.DEPLOY:
        return <DeploymentHelper />;
      case ViewMode.GALLERY:
        return <GalleryView />;
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar activeView={activeView} onNavigate={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
