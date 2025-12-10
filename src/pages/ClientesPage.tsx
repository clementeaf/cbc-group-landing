import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components';
import cbcLogo from '../assets/cbcLogo.png';

/**
 * Página de inicio de sesión para clientes
 * @returns Componente de página de clientes
 */
export const ClientesPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  /**
   * Maneja el envío del formulario de inicio de sesión
   * @param event - Evento del formulario
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img src={cbcLogo} alt="CBC Logo" className="h-[25px]" />
            </Link>
            <Link
              to="/"
              className="text-gray-800 hover:text-[#960C41] text-sm transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#2E193B] mb-2">
                Inicio de Sesión
              </h1>
              <p className="text-gray-600">
                Accede a tu portal de clientes
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#960C41] focus:border-transparent outline-none transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#960C41] focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#960C41] focus:ring-[#960C41] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Recordarme
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-[#960C41] hover:text-[#8B1A3F] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#960C41] text-white py-3 rounded-lg hover:bg-[#8B1A3F] transition-colors font-medium"
              >
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                ¿No tienes una cuenta?{' '}
                <a
                  href="#"
                  className="text-[#960C41] hover:text-[#8B1A3F] font-medium transition-colors"
                >
                  Contacta con nosotros
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

