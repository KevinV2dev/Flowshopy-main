// LayoutApp/page.tsx
import React from 'react';
import MainLayout from './MainLayout'; // Importa el layout recién creado.

const Page: React.FC = () => {
  return (
    <MainLayout>
      <div>Contenido de la página principal</div>
    </MainLayout>
  );
};

export default Page;
