import React from 'react';
import { Button } from './components';
import texts from './data/texts.json';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="bg-white rounded-lg mx-4 mt-4 shadow-sm mx-20">
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

      <main className="flex items-center justify-center h-[700px]">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2F1E40] mb-12 leading-tight">
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
              className="bg-[#2F1E40] text-white px-8 py-3 rounded-full text-lg"
            >
              {texts.main.buttons.soy_profesional}
            </Button>
          </div>
        </div>
      </main>

      <section className="py-16 bg-white w-full h-[700px]">
        <div className="flex justify-center items-center space-x-4">
          <div className="w-[400px] h-[350px] bg-gray-200 rounded-l-full"></div>
          <div className="w-[400px] h-[350px] bg-gray-200 rounded-r-full"></div>
          <div className="w-[400px] h-[350px] bg-gray-200 rounded-full"></div>
          <div className="w-[400px] h-[350px] bg-red-700 rounded-r-full"></div>
          <div className="w-[400px] h-[350px] bg-gray-200 rounded-l-full"></div>
          <div className="w-[400px] h-[350px] bg-[#2F1E40] rounded-r-full"></div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ backgroundColor: '#2F1E40' }}>
        <div className="text-center px-8">
          <p className="text-4xl leading-relaxed">
            Combinamos datos y criterio de un equipo<br />
            experimentado para alinear cada búsqueda a tu<br />
            <span className="bg-red-700 px-2 py-1 rounded">estrategia y cultura empresarial</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="flex items-center justify-between px-20">
          <div className="flex-1 max-w-2xl">
            <Button className="mb-8 bg-red-800 text-white px-6 py-3 rounded-lg">
              {texts.what_we_do.button}
            </Button>
            <div className="text-2xl leading-relaxed text-[#2F1E40] mb-8">
              <p>
                En <span className="font-bold text-red-800">CBC</span><span className="text-red-700">Group</span> conectamos empresas
              </p>
              <p>{texts.what_we_do.text.line2}</p>
              <p>{texts.what_we_do.text.line3}</p>
              <p>{texts.what_we_do.text.line4}</p>
              <p>{texts.what_we_do.text.line5}</p>
            </div>
            <Button className="bg-[#2F1E40] text-white px-6 py-3 rounded-3xl">
              {texts.what_we_do.cta_button}
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center space-x-8">
              <div className="w-64 h-64 bg-[#8B1A3F] rounded-l-full"></div>
              <div className="w-64 h-64 bg-[#2F204A] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
