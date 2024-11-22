'use client';
import React from 'react';
import IconBorrar from '../assets/Icons/IconBorrar';
import IconCrear from '../assets/Icons/Iconcrear';
import Iconeditar from '../assets/Icons/Iconeditar';

interface CrudProductosProps {
  onCrear: () => void;
  onEditar: () => void;
  onEliminar: () => void;
}

const CrudProductos: React.FC<CrudProductosProps> = ({
  onCrear,
  onEditar,
  onEliminar,
}) => {
  return (
    <section className="flex flex-col p-2 items-center gap-8 bg-Clouds rounded-2xl h-full">
      <div
        onClick={onCrear}
        className="flex flex-col items-center p-2 gap-1 w-full cursor-pointer"
      >
        <IconCrear />
        <label>Crear</label>
      </div>

      <div
        onClick={onEditar}
        className="flex flex-col items-center p-2 gap-1 cursor-pointer"
      >
        <Iconeditar />
        <label>Editar</label>
      </div>

      <div
        onClick={onEliminar}
        className="flex flex-col items-center p-2 gap-1 cursor-pointer"
      >
        <IconBorrar />
        <label>Eliminar</label>
      </div>
    </section>
  );
};

export default CrudProductos;
