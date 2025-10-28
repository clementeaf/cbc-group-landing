import React from 'react';
import { Button } from './components';
import texts from './data/texts.json';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-gray-50 px-20">
      <header className="bg-white rounded-lg mx-4 mt-4 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-red-800">
              <span className="font-bold">{texts.header.logo.main}</span>
              <span className="font-normal text-lg">{texts.header.logo.sub}</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-800 hover:text-red-800">{texts.header.navigation.inicio}</a>
              <a href="#" className="text-gray-800 hover:text-red-800">{texts.header.navigation.servicios}</a>
              <a href="#" className="text-gray-800 hover:text-red-800">{texts.header.navigation.sobre_nosotros}</a>
              <a href="#" className="text-gray-800 hover:text-red-800">{texts.header.navigation.clientes}</a>
              <Button 
                variant="outline" 
                className="border-red-800 text-red-800 hover:bg-red-800 hover:text-white rounded-full px-6 py-2"
              >
                {texts.header.button.hablemos}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-12 leading-tight">
            {texts.main.title.line1}<br />
            {texts.main.title.line2}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-red-700 text-white px-8 py-3 rounded-full text-lg"
            >
              {texts.main.buttons.soy_empresa}
            </Button>
            <Button 
              className="bg-purple-900 text-white px-8 py-3 rounded-full text-lg"
            >
              {texts.main.buttons.soy_profesional}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
