import React, { useEffect, useState } from 'react';
import { Button } from './components';
import texts from './data/texts.json';
import headHuntingImage from './assets/headHunting.png';
import reclutamientoImage from './assets/reclutamiento.png';
import mapeoTalentoImage from './assets/mapeoTalento.png';
import evaluacionesImage from './assets/evaluaciones.png';
import consultoriaImage from './assets/consultoria.png';
import onBoardingImage from './assets/onBoarding.png';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [overrideIndex, setOverrideIndex] = useState<number | null>(null);
  const specializationSlides: ReadonlyArray<string> = [
    'Procesos en 10 días',
    'Match cultural sobre 75%',
    'Adecuación de perfil sobre 80%',
    'Funel de prospección'
  ];
  const [currentSpecializationIndex, setCurrentSpecializationIndex] = useState<number>(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  /**
   * Detecta el ancho de la ventana para calcular el desplazamiento del carrusel.
   */
  useEffect((): (() => void) => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  /**
   * Calcula el desplazamiento del carrusel según el breakpoint.
   * @returns Porcentaje de desplazamiento por tarjeta
   */
  const getCarouselOffset = (): number => {
    if (windowWidth >= 1024) {
      return 100 / 3;
    } else if (windowWidth >= 640) {
      return 100 / 2;
    }
    return 100;
  };

  /**
   * Avanza automáticamente el carrusel de especialización.
   */
  useEffect((): (() => void) => {
    const intervalId: number = window.setInterval(() => {
      setCurrentSpecializationIndex((prev: number) => (prev + 1) % specializationSlides.length);
    }, 3000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [specializationSlides.length]);

  /**
   * Avanza automáticamente el carrusel de servicios.
   */
  useEffect((): (() => void) => {
    const intervalId: number = window.setInterval(() => {
      setCurrentServiceIndex((prev: number) => (prev + 1) % texts.services.cards.length);
    }, 4000);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [texts.services.cards.length]);

  /**
   * Reemplaza la descripción de la tarjeta "Headhunting Ejecutivo" por un texto personalizado
   * cuando se hace clic en el botón de esa tarjeta.
   * @param index - índice de la tarjeta dentro del listado
   * @param title - título de la tarjeta clickeada
   */
  const handleServiceCardClick = (index: number, title: string): void => {
    const isToggleable =
      title === 'Headhunting Ejecutivo' ||
      title === 'Reclutamiento Continuo' ||
      title === 'Mapeo de Talento y Benchmark Salarial' ||
      title === 'Evaluaciones por Competencias y Psicométricas' ||
      title === 'Consultoría en Personas y Cultura' ||
      title === 'Onboarding';
    if (!isToggleable) {
      return;
    }
    setOverrideIndex((prev) => (prev === index ? null : index));
  };

  /**
   * Mapea el título de una tarjeta de servicio a su imagen correspondiente.
   * @param title - Título de la tarjeta de servicio
   * @returns Ruta de la imagen correspondiente
   */
  const getServiceImage = (title: string): string => {
    const imageMap: Record<string, string> = {
      'Headhunting Ejecutivo': headHuntingImage,
      'Reclutamiento Continuo': reclutamientoImage,
      'Mapeo de Talento y Benchmark Salarial': mapeoTalentoImage,
      'Evaluaciones por Competencias y Psicométricas': evaluacionesImage,
      'Consultoría en Personas y Cultura': consultoriaImage,
      'Onboarding': onBoardingImage,
    };
    return imageMap[title] || '';
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] overflow-x-hidden w-full max-w-full items-center">
      {/* Navbar */}
      <section className="bg-[#FFFFFF] rounded-[20px] w-[90%] shadow-sm fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 lg:py-4">
          <div className="flex justify-between items-center gap-1">
            <div className="text-[20px] font-bold text-red-800">
              <span className="font-bold whitespace-nowrap">{texts.header.logo.main}</span>
              <span className="font-normal text-[16px] ml-1 whitespace-nowrap">{texts.header.logo.sub}</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-6 flex-shrink-0">
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.inicio}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.servicios}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.sobre_nosotros}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.clientes}</a>
              <Button
                variant="outline"
                className="border-2 border-[#960C41] text-[#960C41] rounded-full w-[100px] lg:w-[120px] xl:w-[140px] 2xl:w-[165px] h-[40px] lg:h-[50px] xl:h-[58px] 2xl:h-[66px] flex items-center justify-center text-[10px] lg:text-xs xl:text-sm 2xl:text-base flex-shrink-0"
              >
                {texts.header.button.hablemos}
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                className="border-[1.5px] sm:border-2 border-[#960C41] text-[#960C41] rounded-full w-[70px] sm:w-[90px] md:w-[110px] h-[32px] sm:h-[40px] md:h-[48px] flex items-center justify-center text-[9.6px] sm:text-[10px] md:text-xs font-[600] flex-shrink-0"
              >
                {texts.header.button.hablemos}
              </Button>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 hover:text-red-800 p-1 sm:p-1.5 flex-shrink-0"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className={`lg:hidden absolute top-full left-0 right-0 mt-2 bg-white rounded-b-[10px] sm:rounded-b-[20px] md:rounded-b-[30px] shadow-lg border-t border-gray-200 transition-all duration-300 z-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            <nav className="flex flex-col space-y-1.5 sm:space-y-2 md:space-y-3 px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4">
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-[14.4px] sm:text-sm md:text-base py-1.5 sm:py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.inicio}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-[14.4px] sm:text-sm md:text-base py-1.5 sm:py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.servicios}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-[14.4px] sm:text-sm md:text-base py-1.5 sm:py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.sobre_nosotros}
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-red-800 text-[14.4px] sm:text-sm md:text-base py-1.5 sm:py-2 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {texts.header.navigation.clientes}
              </a>
            </nav>
          </div>
        </div>
      </section>

      {/* Presentation and buttons Section */}
      <section className="flex items-center min-h-[700px] sm:min-h-[720px] px-4">
        <div className="text-center max-w-4xl w-full h-full">
          <div className="flex-1 flex justify-center lg:justify-end items-center my-10">
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
              <div className="w-12 h-24 sm:w-20 sm:h-40 md:w-24 md:h-48 lg:w-28 lg:h-56 xl:w-32 xl:h-64 bg-[#960C41] rounded-r-full flex-shrink-0"></div>
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-[#2E193B] rounded-full flex-shrink-0"></div>
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2E193B] mb-6 sm:mb-8 md:mb-12 leading-tight font-[500]">
            {texts.main.title.line1}<br />
            {texts.main.title.line2}
          </h1>
          <div className="flex flex-col sm:flex-row gap-[25px] sm:gap-[19.2px] justify-center items-center">
            <Button
              className="bg-[#960C41] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-[40px] text-sm sm:text-base md:text-lg w-4/5 sm:w-auto"
            >
              {texts.main.buttons.soy_empresa}
            </Button>
            <Button
              className="bg-[#2E193B] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-[40px] text-sm sm:text-base md:text-lg w-4/5 sm:w-auto"
            >
              {texts.main.buttons.soy_profesional}
            </Button>
          </div>
        </div>
      </section>

      {/* 1st Geometric bar section */}
      <section className="hidden md:block py-8 sm:py-12 lg:py-16 bg-white w-full min-h-[200px] sm:min-h-[300px] md:min-h-[400px] lg:min-h-[500px] xl:min-h-[700px]">
        <div className="flex justify-center items-center flex-wrap gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-2 sm:px-4">
          <div className="w-12 h-10 sm:w-20 sm:h-14 md:w-28 md:h-20 lg:w-32 lg:h-48 xl:w-[400px] xl:h-[350px] bg-gray-200 rounded-t-[50%] flex-shrink-0"></div>
          <div className="w-12 h-10 sm:w-[72px] sm:h-14 md:w-24 md:h-20 lg:w-28 lg:h-48 xl:w-[230px] xl:h-[350px] bg-gray-200 rounded-l-full flex-shrink-0"></div>
          <div className="w-14 h-10 sm:w-[88px] sm:h-14 md:w-[120px] md:h-20 lg:w-36 lg:h-48 xl:w-[350px] xl:h-[350px] bg-gray-200 rounded-full flex-shrink-0"></div>
          <div className="w-12 h-10 sm:w-[72px] sm:h-14 md:w-24 md:h-20 lg:w-28 lg:h-48 xl:w-[220px] xl:h-[350px] bg-[#8B1A3F] rounded-r-full flex-shrink-0"></div>
          <div className="w-14 h-10 sm:w-20 sm:h-14 md:w-28 md:h-20 lg:w-32 lg:h-48 xl:w-[320px] xl:h-[350px] bg-gray-200 rounded-r-full flex-shrink-0"></div>
          <div className="w-12 h-10 sm:w-[72px] sm:h-14 md:w-24 md:h-20 lg:w-28 lg:h-48 xl:w-[220px] xl:h-[350px] bg-[#2F1E40] rounded-l-full flex-shrink-0"></div>
        </div>
      </section>

      {/* Combinamos datos */}
      <section className="py-8 sm:py-12 lg:py-16 text-white min-h-[250px] sm:min-h-[300px] md:h-[350px] lg:h-[397px] flex items-center justify-center px-4" style={{ backgroundColor: '#2E193B' }}>
        <p className="text-[17.92px] sm:text-2xl md:text-3xl lg:text-4xl font-[500] text-center leading-tight sm:leading-normal" style={{ lineHeight: '1.2' }}>
          Combinamos datos y criterio de un equipo<br className="hidden sm:block" />
          <span className="sm:inline"> </span>experimentado para alinear cada búsqueda a tu<br className="hidden sm:block" />
          <span className="bg-[#960C41] inline-block px-2 py-1 mt-1 sm:mt-0 w-full sm:w-auto sm:min-w-[200px] md:min-w-[400px] lg:min-w-[600px] xl:min-w-[788px] max-w-[85%]">estrategia y cultura empresarial</span>
        </p>
      </section>

      {/* Qué hacemos */}
      <section className="py-16 flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
          <div className="flex-1 max-w-2xl text-center lg:text-left flex flex-col justify-center gap-12">
            <Button className="bg-[#960C41] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-[206px] h-[38px] flex items-center justify-center mx-auto lg:mx-0">
              {texts.what_we_do.button}
            </Button>
            <div className="text-[20px] font-[500] text-[#2F1E40] text-justify flex flex-col justify-center">
              <p className="text-center">
                En <span className="font-[700] text-[#960C41]">CBC</span><span className="text-[#960C41] font-[50]">Group</span> conectamos empresas {texts.what_we_do.text.line2} {texts.what_we_do.text.line3} {texts.what_we_do.text.line4} {texts.what_we_do.text.line5}
              </p>
            </div>
            <Button className="bg-[#2E193B] font-[600] text-base sm:text-lg lg:text-[20px] text-white rounded-[40px] text-sm sm:text-base w-[200px] h-[50px] flex items-center justify-center mx-auto lg:mx-0">
              {texts.what_we_do.cta_button}
            </Button>
          </div>
          <div className="flex-1 flex justify-center lg:justify-end items-center mt-8 lg:mt-0">
            <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
              <div className="w-12 h-24 sm:w-20 sm:h-40 md:w-24 md:h-48 lg:w-28 lg:h-56 xl:w-32 xl:h-64 bg-[#960C41] rounded-r-full flex-shrink-0"></div>
              <div className="w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 bg-[#2E193B] rounded-full flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-100 relative px-4 sm:pl-6 lg:pl-12">
        <div className="px-0 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center sm:items-start">
            <Button className="mb-6 sm:mb-8 bg-[#960C41] w-[231px] h-[38px] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex items-center justify-center">
              {texts.services.button}
            </Button>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-3xl lg:text-4xl font-[500] font-light text-[#2E193B] leading-tight">
                {texts.services.title.line1}<br />
                {texts.services.title.line2}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Cards*/}
      <section className="py-8 overflow-hidden w-[90%] flex justify-center flex-col my-10">
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentServiceIndex * getCarouselOffset()}%)`
            }}
          >
            {texts.services.cards.map((card, index) => (
              <div
                key={index}
                className="flex-shrink-0 px-2 w-full"
              >
                <div className="relative w-full min-h-[400px] sm:min-h-[450px] lg:h-[500px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={getServiceImage(card.title)}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-between p-4 sm:p-6">
                    <div className="flex justify-between items-start w-full">
                      <h3 className="text-white text-lg sm:text-xl font-semibold flex-1">{card.title}</h3>
                      <button
                        onClick={() => handleServiceCardClick(index, card.title)}
                        aria-label={`${index === overrideIndex ? 'Ocultar' : 'Mostrar'} detalle de ${card.title}`}
                        aria-pressed={index === overrideIndex}
                        className="ml-4 w-6 h-6 sm:w-8 sm:h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base transition-all duration-300 hover:rotate-45 flex-shrink-0"
                      >
                        {index === overrideIndex ? '×' : '+'}
                      </button>
                    </div>
                    <p className="text-white leading-relaxed text-sm sm:text-base">
                      {index === overrideIndex
                        ? (card.title === 'Headhunting Ejecutivo'
                          ? 'Revolucionamos la búsqueda de talento con tecnología avanzada y un enfoque humano único que redefine el headhunting. Mantenemos un acompañamiento cercano y confidencial, que acelera el tiempo de contratación y reduce costos operativos.'
                          : card.title === 'Reclutamiento Continuo'
                            ? 'Muy pronto, una nueva forma de enfrentar la bsuqueda de talentos.'
                            : card.title === 'Mapeo de Talento y Benchmark Salarial'
                              ? 'Análisis de mercado y mapeo de talentos disponibles, alineados con planes estratégicos del cliente, para anticipar necesidades de contratación y desarrollo de liderazgo.\n\nEstos servicios combinan tecnología, enfoque humano y estratégico,  porque mantenemos un constante conocimiento del mercado, sus rentas, descripciones de cargos, formación de equipos, y otros escenarios innovadores y disruptivos en el mercado.'
                              : card.title === 'Evaluaciones por Competencias y Psicométricas'
                                ? 'Servicios especializados que no solo buscan candidatos, sino que diseñan estrategias integrales para promover diversidad y equidad en los niveles ejecutivos. Evaluamos a los candidatos con test únicos, creados a la medida de la empresa, orientados a encontrar las habilidades y competencias para el cargo, alineados a conocimientos tecnicos del rol y habilidades blandas necesarias para integrarse al equipo.'
                                : card.title === 'Consultoría en Personas y Cultura'
                                  ? 'Implementamos una metodología propia, rigurosa, cuyo enfoque reduce riesgos y mejora la calidad de los procesos asegurando que el talento encaje no solo en habilidades técnicas sino también en valores y cultura organizacional.'
                                  : card.title === 'Onboarding'
                                    ? 'Coordinamos y facilitamos la orientación inicial en la empresa y la presentación a los equipos de trabajo. El criterio de éxito es lograr una integración exitosa desde el primer momento, por eso el proceso tiene un seguimiento estructurado hasta los 90 días, evaluando la adaptación progresiva.'
                                    : card.description)
                        : card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Indicadores de navegación */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-2">
          {texts.services.cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentServiceIndex(index)}
              aria-label={`Ir a tarjeta ${index + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentServiceIndex
                ? 'bg-[#960C41] w-8 sm:w-10'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      </section>

      <section className="flex justify-center px-4">
        <Button className="bg-[#960C41] text-white rounded-full text-base sm:text-lg font-medium w-[200px] h-[42px] flex items-center justify-center">
          {texts.cta.button}
        </Button>
      </section>

      {/* Carrousel */}
      <section className="bg-[#8B1A3F] flex items-center justify-center overflow-x-hidden w-full py-8 my-12">
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 p-0">
          <p className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-[400] leading-tight mb-2 p-0 whitespace-nowrap text-center sm:text-left">
            Somos especialistas
          </p>
          <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl leading-tight whitespace-nowrap m-0 p-0 text-center sm:text-left">
            {specializationSlides[currentSpecializationIndex]}
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            <div className="flex flex-col text-center lg:text-left">
              <Button className="mb-4 sm:mb-6 bg-[#960C41] text-white px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto lg:mx-0 text-[20px] font-[500] sm:text-base w-[238px] h-[38px] flex items-center justify-center">
                {texts.distinction.tag}
              </Button>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[500] text-[#2E193B] leading-tight mb-6 sm:mb-8 pt-8 sm:pt-12 lg:pt-20" style={{ lineHeight: '1.1' }}>
                <span className="inline-block px-2 py-1 w-full sm:w-auto break-words">{texts.distinction.title.line1}</span><br />
                <span className="inline-block px-2 py-1 w-full sm:w-auto break-words">{texts.distinction.title.line2}</span><br />
                <span className="inline-block px-2 py-1 w-full sm:w-auto font-[900] break-words">{texts.distinction.title.line3}</span>
              </p>
              <div className="flex flex-col space-y-3 sm:space-y-4 items-center lg:items-start">
                <div className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 xl:w-[280px] xl:h-[150px] bg-[#960C41] rounded-t-full flex-shrink-0"></div>
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-[280px] xl:h-[280px] bg-[#2E193B] rounded-full flex-shrink-0"></div>
              </div>
            </div>
            <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-[40px]">
              {texts.distinction.points.map((point, index) => (
                <div key={index} className="bg-[#2E193B] p-4 sm:p-6 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[647px] min-h-[100px] sm:min-h-[120px] md:h-auto lg:h-[133px]">
                  <h3 className="text-white text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{point.title}</h3>
                  <p className="text-white leading-relaxed text-sm sm:text-base">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 bg-[#2E193B] text-center relative mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
          <Button className="mb-6 sm:mb-8 bg-[#960C41] w-[272px] h-[38px] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex items-center justify-center">
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
