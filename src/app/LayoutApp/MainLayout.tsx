// LayoutApp/MainLayout.tsx
import React, { ReactNode } from 'react';
import Navbar from '../components/navbar'; // Asegúrate de que la ruta del Navbar esté correcta.

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
