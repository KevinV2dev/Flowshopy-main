import React from 'react';
import MainLayout from "../../components/MainLayout";
import Bigredes from '@/app/components/Bigredes-side';
import Contenidolist from '@/app/components/Contenidolist';
import CrudContenido from '@/app/components/Crudcontenido';
interface Contenido {
  
}

const Contenido: React.FC = () => {
  return (
    <MainLayout> 
    <section className='flex flex-row px-[50px] pt-9 relative gap-4 '>
    <div className='w-[241px] sticky'>
      <Bigredes/> 
    </div>

    <div className='w-full flex-1'>
        <Contenidolist/>
    </div>

    <div className='w-[160px] h-2/5'>
        <CrudContenido/>
    </div>
    </section>
    </MainLayout>
  );
};

export default Contenido;