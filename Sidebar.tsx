import React from 'react';
import { ViewMode } from './types';

interface SidebarProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: ViewMode.CHAT, icon: 'fa-face-laugh-wink', label: 'Wojtek Germanek' },
    { id: ViewMode.GALLERY, icon: 'fa-star', label: 'Galeria Legendy' },
    { id: ViewMode.IMAGE, icon: 'fa-palette', label: 'Wojtek Maluje' },
    { id: ViewMode.LIVE, icon: 'fa-headset', label: 'Pogadaj z Wojtkiem' },
    { id: ViewMode.DEPLOY, icon: 'fa-gears', label: 'Konfiguracja' },
  ];

  return (
    <div className="w-16 md:w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full flex-shrink-0">
      <div className="p-4 border-b border-gray-800 flex items-center justify-center md:justify-start">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
          W
        </div>
        <span className="ml-3 font-bold text-white hidden md:block">
          ChatWojtek
        </span>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center px-4 py-3 transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
                <span className="ml-3 font-medium hidden md:block text-sm">
                  {item.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center justify-center md:justify-start text-gray-500 text-xs">
          <i className="fa-brands fa-github text-lg md:text-sm"></i>
          <span className="ml-2 hidden md:block">v2.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
