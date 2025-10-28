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
          <div className="w-[400px] h-[350px] bg-[#8B1A3F] rounded-r-full"></div>
          <div className="w-[400px] h-[350px] bg-gray-200 rounded-l-full"></div>
          <div className="w-[400px] h-[350px] bg-[#2F1E40] rounded-r-full"></div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ backgroundColor: '#2F1E40' }}>
        <div className="text-center px-8">
          <p className="text-4xl leading-relaxed">
            Combinamos datos y criterio de un equipo<br />
            experimentado para alinear cada búsqueda a tu<br />
            <span className="bg-[#8B1A3F] px-2 py-1 rounded">estrategia y cultura empresarial</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="flex items-center justify-between px-20">
          <div className="flex-1 max-w-2xl">
            <Button className="mb-8 bg-[#8B1A3F] text-white px-6 py-3 rounded-lg">
              {texts.what_we_do.button}
            </Button>
            <div className="text-2xl leading-relaxed text-[#2F1E40] mb-8">
              <p>
                En <span className="font-bold text-[#8B1A3F]">CBC</span><span className="text-[#8B1A3F]">Group</span> conectamos empresas
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
              <div className="w-32 h-64 bg-[#8B1A3F] rounded-r-full"></div>
              <div className="w-64 h-64 bg-[#2F204A] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100 relative">
        <div className="ml-8">
          <Button className="mb-8 bg-[#8B1A3F] text-white px-6 py-3">
            {texts.services.button}
          </Button>
          <div className="text-start">
            <h2 className="text-4xl font-light text-[#3A2D4F] leading-tight">
              {texts.services.title.line1}<br />
              {texts.services.title.line2}
            </h2>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {texts.services.cards.map((card, index) => (
              <div key={index} className="bg-white border border-gray-200 w-[380px] h-[500px] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-center">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-[#3A2D4F] flex-1">{card.title}</h3>
                  <button className="ml-4 w-8 h-8 bg-gray-100/70 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-300 font-bold">
                    +
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center my-20">
        <Button className="bg-[#8B1A3F] text-white px-12 py-4 rounded-full text-lg font-medium border-white ">
          {texts.cta.button}
        </Button>
      </section>

      <section className="py-16 bg-[#8B1A3F] h-[300px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-6xl">
            {texts.specialization.text} <span className="italic font-bold text-8xl">{texts.specialization.industry}</span>
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <Button className="mb-6 bg-[#8B1A3F] text-white px-6 py-3 w-fit">
                {texts.distinction.tag}
              </Button>
              <h2 className="text-6xl font-bold text-[#2F1E40] leading-tight mb-8">
                {texts.distinction.title.line1}<br />
                {texts.distinction.title.line2}<br />
                {texts.distinction.title.line3}
              </h2>
              <div className="flex flex-col space-y-4">
                <div className="w-[250px] h-[120px] bg-[#8B1A3F] rounded-t-full"></div>
                <div className="w-[250px] h-[250px] bg-[#2F1E40] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              {texts.distinction.points.map((point, index) => (
                <div key={index} className="bg-[#2F1E40] p-6">
                  <h3 className="text-white text-xl font-semibold mb-3">{point.title}</h3>
                  <p className="text-white leading-relaxed">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col">
              <Button className="mb-6 bg-[#8B1A3F] text-white px-6 py-3 w-fit">
                {texts.clients.tag}
              </Button>
              <h2 className="text-5xl font-bold text-[#2F1E40] leading-tight mb-8">
                {texts.clients.title}
              </h2>
              <Button className="bg-[#2F1E40] text-white px-8 py-4 rounded-full text-lg w-fit">
                {texts.clients.button}
              </Button>
            </div>
            <div className="bg-[#8B1A3F] rounded-lg p-8 flex items-center">
              <div className="w-32 h-32 bg-white rounded-lg mr-6 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-white text-lg leading-relaxed mb-4">
                  "{texts.clients.testimonial.quote}"
                </p>
                <p className="text-white text-sm">
                  {texts.clients.testimonial.author}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#2F1E40] text-center relative">
        <div className="max-w-4xl mx-auto px-8">
          <Button className="mb-8 bg-[#8B1A3F] text-white px-6 py-3">
            {texts.final_cta.tag}
          </Button>
          <h2 className="text-5xl font-bold text-white leading-tight mb-12">
            {texts.final_cta.title.line1}<br />
            {texts.final_cta.title.line2}
          </h2>
          <Button className="bg-white text-[#8B1A3F] px-12 py-4 rounded-full text-lg font-medium">
            {texts.final_cta.button}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default App;
