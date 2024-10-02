'use client';
import React from 'react';
import Image from 'next/image';
import CopyIcon from '../assets/Icons/CopyIcon';
import CheckIcon from '../assets/Icons/Checkicon';

interface ListProyectos {
  id: string;
  flag: string;
  proyecto: string;
  producto: string;
  fecha: string;
}

const projectsdata: ListProyectos[] = [
  {
    id: '1',
    proyecto: 'Curso de Nextjs NODE PRO 100',
    producto: 'Producto One',
    fecha: '19/9/2024',
    flag: '/spainflag.svg',
  },
  {
    id: '2',
    proyecto: 'Curso de Nextjs NODE PRO 90',
    producto: 'Producto One',
    fecha: '19/9/2024',
    flag: '/spainflag.svg',
  },
];

const Proyectos: React.FC = () => {
  return (
    <div className=" w-full  space-y-4"> {/* Usa space-y-4 para agregar espacio entre los divs */}
      {projectsdata.map((project) => (
        <div key={project.id} className="bg-Clouds rounded-2xl py-10 px-16 flex justify-between items-center">
          {/* Cada proyecto tiene su propio fondo blanco con borde redondeado y sombra */}
          <div className="flex items-center space-x-4">
            <input type="checkbox" />
            <Image src={project.flag} width={41} height={28} alt="flag" />
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-normal opacity-80">Nombre del Proyecto</label>
            <span className="text-DarkOcean text-lg font-semibold">{project.proyecto}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-normal opacity-80">Producto</label>
            <span className="text-DarkOcean text-lg font-semibold">{project.producto}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-normal opacity-80">Creado</label>
            <span className="text-DarkOcean text-lg font-semibold">{project.fecha}</span>
          </div>
          <div className="flex flex-col">
            <label className="text-[12px] font-normal opacity-80">Identificador</label>
            <div className="flex items-center space-x-2">
              <span className="text-DarkOcean text-lg font-semibold">ASasdXA812NJKAasdq34sadfjSD57123</span>
              <CopyIcon />
            </div>
          </div>
          <div>
            <CheckIcon />
          </div>
          <div>
            <button className="flex items-center py-2 px-4 bg-PrimaryF rounded-lg text-Clouds font-medium text-base">
              Publicar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Proyectos;
