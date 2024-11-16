'use client'
import React,{useState} from 'react';
import MainLayout from "../../components/MainLayout";
import Bigredes from '@/app/components/Bigredes-side';
import CrudProductos from '@/app/components/CrudProductos';
import Crearproducto from '@/app/components/CrearProducto';
import Producto from '@/app/components/Productos';
import ExpandibleDiv from '@/app/components/ExpandibleDiv';
interface Props {
  
}


const Productos: React.FC = () => {

  const [selectedAction, setSelectedAction] = useState<'ver' | 'crear' | 'editar' | 'eliminar'>('ver');

  return (
    <MainLayout> 
    <section className='flex flex-row px-[50px] pt-9 relative gap-4  '>
    <div className='w-[241px] sticky'>
      <Bigredes/> 
    </div>

    <div className='grow'>
        <Producto/>
    </div>

    <div className='w-[160px]'>
    <CrudProductos
            onCrear={() => setSelectedAction('crear')}
            onEditar={() => setSelectedAction('editar')}
            onEliminar={() => setSelectedAction('eliminar')}
          />
    </div>
    
    </section>
    </MainLayout>
  );
};

export default Productos;