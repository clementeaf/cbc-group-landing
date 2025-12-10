import React, { useEffect, useState } from 'react';
import { Button } from './components';
import { useCalCom } from './hooks';
import texts from './data/texts.json';
import headHuntingImage from './assets/headHunting.png';
import reclutamientoImage from './assets/reclutamiento.png';
import mapeoTalentoImage from './assets/mapeoTalento.png';
import evaluacionesImage from './assets/evaluaciones.png';
import consultoriaImage from './assets/consultoria.png';
import onBoardingImage from './assets/onBoarding.png';
import cbcLogo from './assets/cbcLogo.png';
import cbcLogoWhite from './assets/cbcLogo-white.png';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [overrideIndex, setOverrideIndex] = useState<number | null>(null);
  const specializationSlides: ReadonlyArray<string> = [
    'Procesos en 15 días',
    'Match cultural sobre 75%',
    'Adecuación de perfil sobre 80%',
    'Funel de prospección'
  ];
  const [currentSpecializationIndex, setCurrentSpecializationIndex] = useState<number>(0);
  const [currentServiceIndex, setCurrentServiceIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useCalCom();

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
   * Inicializa el carrusel en el primer elemento real (índice 1, ya que 0 es el clon del último).
   */
  useEffect((): void => {
    setCurrentServiceIndex(1);
  }, []);

  /**
   * Detecta cuando el carrusel está en el clon del primer elemento y lo salta al elemento real.
   */
  useEffect((): (() => void) | void => {
    const totalCards: number = texts.services.cards.length;
    if (currentServiceIndex > totalCards) {
      setIsTransitioning(false);
      const timeoutId: number = window.setTimeout(() => {
        setCurrentServiceIndex(1);
        window.setTimeout(() => {
          setIsTransitioning(true);
        }, 20);
      }, 20);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }
  }, [currentServiceIndex, texts.services.cards.length]);

  /**
   * Avanza automáticamente el carrusel de servicios con transición infinita.
   */
  useEffect((): (() => void) => {
    const totalCards: number = texts.services.cards.length;
    const intervalId: number = window.setInterval(() => {
      setCurrentServiceIndex((prev: number) => {
        const nextIndex: number = prev + 1;
        if (nextIndex > totalCards) {
          return nextIndex;
        }
        return nextIndex;
      });
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
      {/* Navbar */} {/* Optimizado */}
      <section className="bg-[#FFFFFF] rounded-[20px] w-[90%] shadow-sm fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
        <div className="px-2 sm:px-3 md:px-4 lg:px-6 py-1.5 sm:py-2 md:py-3 lg:py-4">
          <div className="flex justify-between items-center gap-1">
            <img src={cbcLogo} alt="CBC Logo" className="h-[14px] sm:h-[25px]" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 xl:space-x-3 2xl:space-x-6 flex-shrink-0">
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.inicio}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.servicios}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.sobre_nosotros}</a>
              <a href="#" className="text-gray-800 hover:text-red-800 text-xs lg:text-sm xl:text-base whitespace-nowrap">{texts.header.navigation.clientes}</a>
              <Button
                variant="outline"
                className="border-2 border-[#960C41] text-[#960C41] rounded-full w-[100px] lg:w-[120px] xl:w-[140px] 2xl:w-[165px] h-[40px] lg:h-[50px] xl:h-[58px] 2xl:h-[66px] flex items-center justify-center text-[10px] lg:text-xs xl:text-sm 2xl:text-base flex-shrink-0"
                data-cal-namespace="30min"
                data-cal-link="cbcgroup/30min"
                data-cal-config='{"layout":"month_view"}'
              >
                {texts.header.button.hablemos}
              </Button>
            </nav>

            {/* Mobile Navigation */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                className="border-[1.5px] sm:border-2 border-[#960C41] text-[#960C41] rounded-full w-[70px] sm:w-[90px] md:w-[110px] h-[32px] sm:h-[40px] md:h-[48px] flex items-center justify-center text-[9.6px] sm:text-[10px] md:text-xs font-[600] flex-shrink-0"
                data-cal-namespace="30min"
                data-cal-link="cbcgroup/30min"
                data-cal-config='{"layout":"month_view"}'
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

      {/* Presentation and buttons Section */}{/* Optimizado */}
      <section className="flex flex-col items-center px-4 py-[130px]">
        {/* DOD */}
        <div className="flex-1 flex justify-center items-center pt-[80px]">
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8">
            <div className="w-12 h-24 bg-[#960C41] rounded-r-full flex-shrink-0"></div>
            <div className="w-24 h-24 bg-[#2E193B] rounded-full flex-shrink-0"></div>
            <div className="w-12 h-24 bg-[#960C41] rounded-l-full flex-shrink-0"></div>
          </div>
        </div>

        {/* Title and buttons */}{/* Optimizado */}
        <div className='flex flex-col items-center justify-center sm:py-[60px]'>
          <h1 className="text-2xl sm:text-[60px] sm:w-full font-bold text-[#2E193B] mb-6 sm:py-[25px] leading-tight font-[500] text-center">
            {texts.main.title.line1}<br />
            {texts.main.title.line2}
          </h1>

          <div className="flex flex-col sm:flex-row sm:w-full gap-[25px] pt-[25px] sm:gap-[60px] justify-center items-center w-[300px]">
            <Button
              className="bg-[#960C41] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-[40px] text-sm sm:text-base md:text-lg w-4/5 sm:w-auto"
            >
              {texts.main.buttons.soy_empresa}
            </Button>
            <a
              href="https://tally.so/r/BzzVGe"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2E193B] text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-[40px] text-sm sm:text-base md:text-lg w-4/5 sm:w-auto font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center text-center hover:opacity-90"
            >
              {texts.main.buttons.soy_profesional}
            </a>
          </div>
        </div>
      </section>

      {/* Combinamos datos */}
      <section className="text-white min-h-[150px] w-full flex flex-col items-center justify-center px-4" style={{ backgroundColor: '#2E193B' }}>
        <p className="text-[16px] sm:text-[27px] font-[500] text-center" style={{ lineHeight: '1.2' }}>
          Combinamos datos y la experiencia de nuestro equipo para alinear cada búsqueda a tú
        </p>
        <span className="bg-[#960C41] px-4 py mt-1 sm:text-[27px]">estrategia y cultura empresarial</span>
      </section>

      <section className="py-8 px-6 bg-white w-full sm:w-full">
        <div className="mb-4 sm:mb-6 bg-[#960C41] text-white px-4 sm:px-6 py-2 sm:py-3 w-fit mx-auto sm:ml-[100px] text-[20px] font-[500] sm:text-base w-[238px] h-[38px] flex items-center justify-center">
          {texts.distinction.tag}
        </div>
        <div className="gap-8 sm:flex sm:flex-row sm:items-center sm:justify-between sm:w-full">
          <div className="flex flex-col text-center lg:text-left sm:w-[50%] sm:ml-[90px]">
            <p className="text-3xl sm:text-[60px] font-[300] text-[#2E193B] mb-6 pt-8" style={{ lineHeight: '1.1' }}>
              <span className="inline-block px-2 py-1 w-full sm:w-auto break-words">{texts.distinction.title.line1}</span><br />
              <span className="inline-block px-2 py-1 w-full sm:w-auto break-words">{texts.distinction.title.line2}</span><br />
              <span className="inline-block px-2 py-1 w-full sm:w-auto font-[800] break-words">{texts.distinction.title.line3}</span>
            </p>
            <div className="flex flex-col space-y-3 sm:space-y-4 items-center lg:items-start pt-[65px]">
              <div className="w-24 h-12 sm:w-32 sm:h-16 md:w-40 md:h-20 lg:w-48 lg:h-24 xl:w-[280px] xl:h-[150px] bg-[#960C41] rounded-t-full flex-shrink-0"></div>
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-[280px] xl:h-[280px] bg-[#2E193B] rounded-full flex-shrink-0"></div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-4 w-full mt-20 justify-end items-end sm:mr-[70px]">
            {texts.distinction.points.map((point, index) => (
              <div key={index} className="bg-[#2E193B] p-4 sm:p-6 w-full min-h-[100px] sm:w-[600px] sm:mr-[50px]">
                <h3 className="text-white text-lg sm:text-[18px] font-semibold mb-2 sm:mb-3">{point.title}</h3>
                <p className="text-white leading-relaxed text-sm sm:text-[16px]">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="py-16 flex items-center w-[90%] sm:w-full sm:py-[100px]">
        <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-20 gap-8 lg:gap-12 w-full mx-auto">
          <div className="flex-1 w-full text-center lg:text-left flex flex-col justify-center gap-12 sm:ml-5 items-center sm:items-start">
            <div className="bg-[#960C41] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-[206px] h-[38px] flex items-center justify-center mx-auto lg:mx-0">
              {texts.what_we_do.button}
            </div>
            <p className='font-[500] w-[85%]'>En <span className='mx font-[700] text-[#960C41]'>CBC<span className='font-[500]'>Group</span></span> conectamos empresas con el talento correcto. Humanizamos el reclutamiento con procesos a tú medida, utilizando la IA a nuestro favor.</p>
            <Button 
              className="bg-[#2E193B] font-[600] text-base sm:text-lg lg:text-[20px] text-white rounded-[40px] text-sm sm:text-base w-[200px] h-[50px] flex items-center justify-center mx-auto lg:mx-0"
              data-cal-namespace="30min"
              data-cal-link="cbcgroup/30min"
              data-cal-config='{"layout":"month_view"}'
            >
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
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-100 relative px-10 sm:w-full">
        <div className="px-0 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto sm:ml-5">
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-6 sm:mb-8 bg-[#960C41] w-[231px] h-[38px] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex items-center justify-center">
              {texts.services.button}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-3xl font-[500] text-[#2E193B] leading-tight">
                {texts.services.title.line1}<br />
                {texts.services.title.line2}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section Cards*/}
      <div className='bg-gray-100 flex flex-col items-center justify-center w-full sm:w-full'>
        <section className="py-8 w-[90%] flex justify-center flex-col my-10 ">
          {/* Mobile Carousel */}
          <div className="sm:hidden relative overflow-hidden">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentServiceIndex * getCarouselOffset()}%)`,
                transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none'
              }}
            >
              {[texts.services.cards[texts.services.cards.length - 1], ...texts.services.cards, texts.services.cards[0]].map((card, index) => {
                const realIndex: number = index === 0
                  ? texts.services.cards.length - 1
                  : index === texts.services.cards.length + 1
                    ? 0
                    : index - 1;
                return (
                  <div
                    key={`${realIndex}-${index}`}
                    className="flex-shrink-0 px-2 w-full"
                  >
                    <div className="relative w-full min-h-[400px] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={getServiceImage(card.title)}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-between p-4">
                        <div className="flex justify-between items-start w-full">
                          <h3 className="text-white text-lg font-semibold flex-1">{card.title}</h3>
                          <button
                            onClick={() => handleServiceCardClick(realIndex, card.title)}
                            aria-label={`${realIndex === overrideIndex ? 'Ocultar' : 'Mostrar'} detalle de ${card.title}`}
                            aria-pressed={realIndex === overrideIndex}
                            className="ml-4 w-6 h-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 hover:rotate-45 flex-shrink-0"
                          >
                            {realIndex === overrideIndex ? '×' : '+'}
                          </button>
                        </div>
                        <p className="text-white leading-relaxed text-sm">
                          {realIndex === overrideIndex
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
                );
              })}
            </div>
          </div>
          {/* Mobile Navigation Indicators */}
          <div className="sm:hidden flex justify-center mt-6 gap-2">
            {texts.services.cards.map((_, index) => {
              const realIndex: number = currentServiceIndex > texts.services.cards.length ? 0 : currentServiceIndex === 0 ? texts.services.cards.length - 1 : currentServiceIndex - 1;
              const isActive: boolean = realIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true);
                    setCurrentServiceIndex(index + 1);
                  }}
                  aria-label={`Ir a tarjeta ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive
                    ? 'bg-[#960C41] w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              );
            })}
          </div>
          {/* Desktop/Tablet Grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-4 lg:gap-6">
            {texts.services.cards.map((card, index) => (
              <div
                key={index}
                className="relative w-full min-h-[450px] lg:h-[500px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
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
            ))}
          </div>
        </section>
        <section className="flex justify-center px-4 pb-[90px]">
          <Button 
            className="bg-[#960C41] text-white rounded-full text-base sm:text-lg font-medium w-[200px] h-[42px] flex items-center justify-center"
            data-cal-namespace="30min"
            data-cal-link="cbcgroup/30min"
            data-cal-config='{"layout":"month_view"}'
          >
            {texts.cta.button}
          </Button>
        </section>
        {/* Carrousel */}
        <section className="bg-[#8B1A3F] flex items-center justify-center overflow-x-hidden w-full py-8 mt-12 sm:py-[100px] ">
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 p-0">
            <p className="text-white text-[22px] font-[500] sm:text-[50px] leading-tight whitespace-nowrap m-0 p-6 text-center sm:text-left">
              {specializationSlides[currentSpecializationIndex]}
            </p>
          </div>
        </section>
      </div>


      {/* Nuestro compromiso */}
    

      {/* Listo para contratar */}
      <section className="py-12 sm:py-16 bg-[#2E193B] text-center my-10 w-full">
        <div className="flex flex-col items-center justify-center sm:space-y-[80px]">
          <div className="mb-6 sm:mb-8 bg-[#960C41] w-[272px] h-[38px] text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base flex items-center justify-center">
            {texts.final_cta.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 sm:mb-12">
            {texts.final_cta.title.line1}<br />
            {texts.final_cta.title.line2}
          </h2>
          <Button 
            className="bg-white text-[#8B1A3F] px-8 sm:px-10 lg:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-medium"
            data-cal-namespace="30min"
            data-cal-link="cbcgroup/30min"
            data-cal-config='{"layout":"month_view"}'
          >
            {texts.final_cta.button}
          </Button>
        </div>
      </section>

      <footer className="bg-[#8B1A3F] text-white py-8 sm:py-12 lg:py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-start justify-start">
            {/* Company Info */}
            <div className="lg:col-span-2 text-center sm:text-left flex flex-col items-center justify-start">
              <div className="text-xl sm:text-2xl font-bold mb-3">
                <img src={cbcLogoWhite} alt="CBC Logo" className="h-[24px] sm:h-[23px]" />
              </div>
              <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 w-[300px] text-center">
                {texts.footer.company.description}
              </p>
              <a href={`mailto:${texts.footer.company.email}`} className="text-xs sm:text-sm underline mb-2 block">
                {texts.footer.company.email}
              </a>
              <p className="text-xs sm:text-sm">{texts.footer.company.location}</p>
            </div>

            <div className="flex w-full justify-between sm:items-start sm:justify-between">
              {/* Servicios */}
              <div className="text-left sm:text-left">
                <h3 className="font-bold text-[13px] text-left">{texts.footer.navigation.servicios.title}</h3>
                <ul className="text-left flex-col items-start space-y-1">
                  {texts.footer.navigation.servicios.items.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-[10px]">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sobre nosotros */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-left text-[13px]">{texts.footer.navigation.sobre_nosotros.title}</h3>
                <ul className="text-left flex-col items-start space-y-1">
                  {texts.footer.navigation.sobre_nosotros.items.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-[10px]">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-left text-[13px]">{texts.footer.navigation.legal.title}</h3>
                <ul className="text-left flex-col items-start space-y-1">
                  {texts.footer.navigation.legal.items.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-[10px]">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Redes sociales */}
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-left text-[13px]">{texts.footer.navigation.redes_sociales.title}</h3>
                <ul className="text-left flex-col items-start space-y-1">
                  {texts.footer.navigation.redes_sociales.items.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-[10px]">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom section with copyright and PDF button */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs sm:text-sm text-center sm:text-left mb-4 sm:mb-0">
              {texts.footer.copyright}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
