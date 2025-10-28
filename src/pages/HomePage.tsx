import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Landing Page
          </h1>
          <p className="text-gray-600">
            Proyecto React + Vite + TypeScript configurado
          </p>
        </div>
      </main>
    </div>
  );
};
