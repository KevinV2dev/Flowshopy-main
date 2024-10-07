'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CopyIcon from '../assets/Icons/CopyIcon';
import CheckIcon from '../assets/Icons/Checkicon';

// Interfaz para definir la estructura de los datos del proyecto
interface Project {
  id: number;
  attributes: {
    name: string;
    language: string;
    createdAt: string;
  };
}

const Proyectos: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Estado para almacenar los proyectos obtenidos de la API
  const [expandedItem, setExpandedItem] = useState<number | null>(null); // Estado para manejar la expansión de los proyectos
  const [error, setError] = useState<string | null>(null); // Estado para manejar posibles errores

  // Función para obtener los proyectos desde la API
  const fetchProjects = async () => {
    try {
      const response = await fetch('https://strapi-admin-dev.flowshopy.com.br/api/projects', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer 8528c3a83cc2a14c13dbe81f0ed905b5a636c1bf369be64f5d402665005f3b2e954c17dc07ea83b5cda2fdd719769afaf44734581c31f44fe262ddd946e1d9546350fcee90b85c36b6a3619b9fcd24f891f1b771d07644e92c002c6a5c37519635dd3c7d0cc1cc5e4575dda60dbf5f882b39b7f9fad0b6a50ff0bbe9916fd83a'
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener los proyectos');
      }

      const data = await response.json();
      setProjects(data.data); // Asignamos los proyectos al estado
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Llamada a la API al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  // Función para expandir y colapsar las tarjetas de proyectos
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
                    <label>Publicado</label>
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
