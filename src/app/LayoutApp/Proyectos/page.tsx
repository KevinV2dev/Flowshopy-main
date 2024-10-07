'use client'
import React, {useState} from 'react';
import MainLayout from '../../components/MainLayout';
import Bigredes from '@/app/components/Bigredes-side';
import Proyectos from '@/app/components/Proyectos';
import CrudProyectos from '@/app/components/CurdProyectos';
import Crearproyecto from '@/app/components/Crearproyecto';
const PageProyectos: React.FC = () => {

  const [selectedAction, setSelectedAction] = useState<'ver' | 'crear' | 'editar' | 'eliminar'>('ver');
  return (
    <MainLayout>
      <section className='flex flex-row px-[50px] pt-9 relative gap-4  '>
    <div className='w-[241px] sticky'>
      <Bigredes/> 
    </div>

{/* Renderizado condicional de Proyectos */}
    <div className='grow '>
    {selectedAction === 'ver' ? (
            <Proyectos/>  // Mostrar proyectos por defecto
          ) : selectedAction === 'crear' ? (
            <Crearproyecto onCancelar={() => setSelectedAction('ver')} />  
          ) : selectedAction === 'editar' ? (
            <Proyectos />  // Mostrar editar proyecto
          ) : (
            <div>Componente para eliminar proyectos</div>  // Aquí podrías poner tu componente para eliminar
          )}
    </div>

    {selectedAction !== 'crear' && (
    <div className='w-[160px]'>
    <CrudProyectos
            onCrear={() => setSelectedAction('crear')}
            onEditar={() => setSelectedAction('editar')}
            onEliminar={() => setSelectedAction('eliminar')}
          />
    </div>
    )}
    </section>
    </MainLayout>
  );
};

export default PageProyectos;
