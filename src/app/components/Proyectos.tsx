'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CopyIcon from '../assets/Icons/CopyIcon';
import CheckIcon from '../assets/Icons/Checkicon';
import apiFetch from '../apiServices';

// Interfaz para definir la estructura de los datos del proyecto
interface Project {
  id: number;
  attributes: {
    name: string;
    language: string;
    createdAt: string;
  };
}

interface Post {
  id: number;
  attributes: {
  title: string;
  };
}

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Estado para almacenar los proyectos obtenidos de la API
  const [post, setPost] = useState<Post | null>(null); // Estado para almacenar los datos del post
  const [expandedItem, setExpandedItem] = useState<number | null>(null); // Estado para manejar la expansión de los proyectos
  const [error, setError] = useState<string | null>(null); // Estado para manejar posibles errores

  // Función para obtener los proyectos desde la API
  const fetchProjects = async () => {
    try {
      const data = await apiFetch('/projects'); // Llamada a la API usando el servicio
      setProjects(data.data); // Asignamos los proyectos al estado
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {/* Mostrar error si lo hay */}
      {error && <div className="text-red-600">Error: {error}</div>}

      {/* Verificamos si hay proyectos */}
      {projects.length === 0 ? (
        <div>Cargando proyectos...</div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-Clouds rounded-2xl py-10 px-16 transition-all duration-500 cursor-pointer"
          >
            {/* Encabezado del proyecto */}
            <div onClick={() => toggleExpand(project.id)} className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <input type="checkbox" />
                <Image src="/spainflag.svg" width={41} height={28} alt="flag" />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Nombre del Proyecto</label>
                {/* Aquí accedemos a project.attributes.name */}
                <span className="text-DarkOcean text-lg font-semibold">{project.attributes.name}</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Idioma</label>
                <span className="text-DarkOcean text-lg font-semibold">{project.attributes.language}</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Fecha de Creación</label>
                <span className="text-DarkOcean text-lg font-semibold">{new Date(project.attributes.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Identificador</label>
                <div className="flex items-center space-x-2">
                  <span className="text-DarkOcean text-lg font-semibold">{project.id}</span>
                  <CopyIcon />
                </div>
              </div> 

              <CheckIcon />

              <button className="py-2 px-4 bg-PrimaryF rounded-lg text-Clouds font-medium text-base">
                Publicar
              </button>
            </div>

            {/* Contenido adicional (expandible) */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedItem === project.id ? 'max-h-[600px] pt-4' : 'max-h-0'
              }`}
            >
              <div className="pt-4">
                {/* Aquí puedes agregar el contenido adicional que aparecerá al expandir */}
                <div className="flex gap-4 py-2 px-3 bg-Paper max-w-[407px]">
                  <div> IMAGEN </div>
                  <div className='flex flex-col gap-1'>
                    <h3> AQUI VA EL  TITLE</h3>
                    <span>AQUI VA LA FECHA</span>
                    <label className=' flex py-[6px] px-[10px] bg-Ocean rounded-2xl  text-Clouds text-[10px] text font-semibold  max-w-[71px]'>Publicado</label>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Proyectos;
