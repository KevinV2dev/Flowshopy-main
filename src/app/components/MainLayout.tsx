// LayoutApp/MainLayout.tsx
import React, { ReactNode } from 'react';
import Navbar from './navbar'; // Asegúrate de que la ruta sea correcta

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <main className=''>{children}</main>
    </div>
  );
};

export default MainLayout;
