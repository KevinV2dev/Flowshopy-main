'use client'
import React,{useState} from 'react';
import IconBorrar from '../assets/Icons/IconBorrar';
import IconCrear from '../assets/Icons/Iconcrear';
import Iconeditar from '../assets/Icons/Iconeditar';
interface Props {
  
}

const CrudContenido: React.FC = () => {
  return (
    <section className='flex flex-col p-2 items-center gap-8 bg-Clouds rounded-2xl '>
      <div className='flex flex-col items-center p-2 gap-1 w-full'>
        <IconCrear/>
        <label>Crear</label>
      </div>
      <div className='flex flex-col items-center p-2 gap-1'>
        <Iconeditar/>
        <label>Editar</label>
      </div>
      <div className='flex flex-col items-center p-2 gap-1'>
        <IconBorrar/>
        <label>Eliminar</label> 
      </div>
    </section>
  );
};

export default CrudContenido;