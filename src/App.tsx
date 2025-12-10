import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ClientesPage } from './pages/ClientesPage';

/**
 * Componente principal de la aplicación con routing
 * @returns Componente App con rutas configuradas
 */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clientes" element={<ClientesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
