import React, { useState } from 'react';
import { Button } from './components';
import texts from './data/texts.json';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <section className="bg-[#FFFFFF] rounded-[40px] mx-2 sm:mx-4 lg:mx-20 mt-2 sm:mt-4 shadow-sm">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-800">
              <span className="font-bold">{texts.header.logo.main}</span>
              <span className="font-normal text-sm sm:text-base lg:text-lg">{texts.header.logo.sub}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <a href="#" className="text-gray-800 hover:text-red-800 text-sm xl:text-base">{texts.header.navigation.inicio}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-sm xl:text-base">{texts.header.navigation.servicios}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-sm xl:text-base">{texts.header.navigation.sobre_nosotros}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-sm xl:text-base">{texts.header.navigation.clientes}</a>
              <Button
                variant="outline"
                className="border-2 border-[#960C41] text-[#960C41] rounded-full w-[165px] h-[66px] flex items-center justify-center text-sm xl:text-base"
              >
                {texts.header.button.hablemos}
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-[3px] border-[#960C41] text-[#960C41] rounded-full w-[165px] h-[66px] flex items-center justify-center text-[20px] sm:text-sm font-[600]"
              >
                {texts.header.button.hablemos}
              </Button>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 hover:text-red-800 p-2"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden mt-4 pt-4 border-t border-gray-200 transition-all duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col space-y-3">
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-sm py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.inicio}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-sm py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.servicios}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-sm py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.sobre_nosotros}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-sm py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.clientes}
              </a>
            </nav>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center h-[400px] sm:h-[500px] lg:h-[700px] px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-[60px] sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2E193B] mb-8 sm:mb-12 leading-tight font-[500]">
            {texts.main.title.line1}<br />
            {texts.main.title.line2}
          </h1>
          <div className="flex sm:flex-row sm:gap-4 justify-center space-x-6">
            <Button
              className="bg-[#960C41] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-[40px] text-[20px] sm:text-lg"
            >
              {texts.main.buttons.soy_empresa}
            </Button>
            <Button
              className="bg-[#2E193B] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-[40px] text-[20px] sm:text-lg"
            >
              {texts.main.buttons.soy_profesional}
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[700px]">
        <div className="flex justify-center items-center space-x-1 sm:space-x-2 lg:space-x-4 px-4">
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-gray-200 rounded-l-full"></div>
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-gray-200 rounded-r-full"></div>
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-gray-200 rounded-full"></div>
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-[#8B1A3F] rounded-r-full"></div>
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-gray-200 rounded-l-full"></div>
          <div className="w-16 h-12 sm:w-24 sm:h-16 md:w-32 md:h-20 lg:w-[400px] lg:h-[350px] bg-[#2F1E40] rounded-r-full"></div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 text-white" style={{ backgroundColor: '#2F1E40' }}>
        <div className="text-center px-4 sm:px-6 lg:px-8">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed">
            Combinamos datos y criterio de un equipo<br />
            experimentado para alinear cada búsqueda a tu<br />
            <span className="bg-[#8B1A3F] px-2 py-1 rounded">estrategia y cultura empresarial</span>
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 gap-8 lg:gap-12">
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <Button className="mb-6 sm:mb-8 bg-[#8B1A3F] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base">
              {texts.what_we_do.button}
            </Button>
            <div className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#2F1E40] mb-6 sm:mb-8">
              <p>
                En <span className="font-bold text-[#8B1A3F]">CBC</span><span className="text-[#8B1A3F]">Group</span> conectamos empresas
              </p>
              <p>{texts.what_we_do.text.line2}</p>
              <p>{texts.what_we_do.text.line3}</p>
              <p>{texts.what_we_do.text.line4}</p>
              <p>{texts.what_we_do.text.line5}</p>
            </div>
            <Button className="bg-[#2F1E40] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-3xl text-sm sm:text-base">
              {texts.what_we_do.cta_button}
            </Button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
              <div className="w-16 h-32 sm:w-24 sm:h-48 lg:w-32 lg:h-64 bg-[#8B1A3F] rounded-r-full"></div>
              <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#2F204A] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-100 relative">
        <div className="px-4 sm:px-6 lg:px-8">
          <Button className="mb-6 sm:mb-8 bg-[#8B1A3F] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
            {texts.services.button}
          </Button>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#3A2D4F] leading-tight">
              {texts.services.title.line1}<br />
              {texts.services.title.line2}
            </h2>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {texts.services.cards.map((card, index) => (
              <div key={index} className="bg-white border border-gray-200 w-full max-w-sm mx-auto sm:max-w-none sm:w-auto lg:w-[380px] min-h-[400px] sm:min-h-[450px] lg:h-[500px] p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between items-center">
                <div className="flex justify-between items-start mb-4 w-full">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#3A2D4F] flex-1">{card.title}</h3>
                  <button className="ml-4 w-6 h-6 sm:w-8 sm:h-8 bg-gray-100/70 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-300 font-bold text-sm sm:text-base">
                    +
                  </button>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex justify-center my-8 sm:my-12 lg:my-20 px-4">
        <Button className="bg-[#8B1A3F] text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium border-white">
          {texts.cta.button}
        </Button>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-[#8B1A3F] min-h-[200px] sm:min-h-[250px] lg:h-[300px] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
            {texts.specialization.text} <span className="italic font-bold text-3xl sm:text-4xl md:text-5xl lg:text-8xl">{texts.specialization.industry}</span>
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="flex flex-col text-center lg:text-left">
              <Button className="mb-4 sm:mb-6 bg-[#8B1A3F] text-white px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto lg:mx-0 text-sm sm:text-base">
                {texts.distinction.tag}
              </Button>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2F1E40] leading-tight mb-6 sm:mb-8">
                {texts.distinction.title.line1}<br />
                {texts.distinction.title.line2}<br />
                {texts.distinction.title.line3}
              </h2>
              <div className="flex flex-col space-y-3 sm:space-y-4 items-center lg:items-start">
                <div className="w-32 h-16 sm:w-40 sm:h-20 lg:w-[250px] lg:h-[120px] bg-[#8B1A3F] rounded-t-full"></div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-[250px] lg:h-[250px] bg-[#2F1E40] rounded-full"></div>
              </div>
            </div>
            <div className="flex flex-col space-y-3 sm:space-y-4">
              {texts.distinction.points.map((point, index) => (
                <div key={index} className="bg-[#2F1E40] p-4 sm:p-6">
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{point.title}</h3>
                  <p className="text-white leading-relaxed text-sm sm:text-base">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="flex flex-col text-center lg:text-left">
              <Button className="mb-4 sm:mb-6 bg-[#8B1A3F] text-white px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto lg:mx-0 text-sm sm:text-base">
                {texts.clients.tag}
              </Button>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2F1E40] leading-tight mb-6 sm:mb-8">
                {texts.clients.title}
              </h2>
              <Button className="bg-[#2F1E40] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg w-fit mx-auto lg:mx-0">
                {texts.clients.button}
              </Button>
            </div>
            <div className="bg-[#8B1A3F] rounded-lg p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-lg mb-4 sm:mb-0 sm:mr-4 lg:mr-6 flex-shrink-0"></div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-white text-base sm:text-lg leading-relaxed mb-3 sm:mb-4">
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

      <section className="py-12 sm:py-16 lg:py-20 bg-[#2F1E40] text-center relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button className="mb-6 sm:mb-8 bg-[#8B1A3F] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
            {texts.final_cta.tag}
          </Button>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 sm:mb-12">
            {texts.final_cta.title.line1}<br />
            {texts.final_cta.title.line2}
          </h2>
          <Button className="bg-white text-[#8B1A3F] px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium">
            {texts.final_cta.button}
          </Button>
        </div>
      </section>

      <section className="bg-[#2F1E40] h-[100px] sm:h-[150px] lg:h-[200px] flex justify-center items-end space-x-1 sm:space-x-2 lg:space-x-4 pb-0 px-4">
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[100px] bg-white rounded-t-full"></div>
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[100px] bg-white rounded-t-full"></div>
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[100px] bg-white rounded-t-full"></div>
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[200px] bg-[#8B1A3F] rounded-t-full"></div>
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[100px] bg-white rounded-t-full"></div>
        <div className="w-12 h-8 sm:w-16 sm:h-10 md:w-24 md:h-12 lg:w-[200px] lg:h-[100px] bg-white rounded-t-full"></div>
      </section>

      <footer className="bg-[#8B1A3F] text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <div className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                <span className="font-bold">{texts.footer.company.logo.main}</span>
                <span className="font-normal text-base sm:text-lg">{texts.footer.company.logo.sub}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                {texts.footer.company.description}
              </p>
              <a href={`mailto:${texts.footer.company.email}`} className="text-xs sm:text-sm underline mb-2 block">
                {texts.footer.company.email}
              </a>
              <p className="text-xs sm:text-sm">{texts.footer.company.location}</p>
            </div>

            {/* Servicios */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4">{texts.footer.navigation.servicios.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {texts.footer.navigation.servicios.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs sm:text-sm hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sobre nosotros */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4">{texts.footer.navigation.sobre_nosotros.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {texts.footer.navigation.sobre_nosotros.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs sm:text-sm hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4">{texts.footer.navigation.legal.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {texts.footer.navigation.legal.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs sm:text-sm hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-xs sm:text-sm mb-3 sm:mb-4">{texts.footer.navigation.redes_sociales.title}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {texts.footer.navigation.redes_sociales.items.map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-xs sm:text-sm hover:underline">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom section with copyright and PDF button */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-600 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-center sm:text-left mb-4 sm:mb-0">
              {texts.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
