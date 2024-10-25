'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Sourcecardyt from '../assets/images/Sourcecardyt.png';
import sourcecardshort from '../assets/images/sourcecardshort.png';
import Iconsearch from '../assets/Icons/Iconsearch';
import InputSearch from './InputSearch';
import Tagadd from './Tagadd';
import ImageuploadCreator from './ImageuploadCreator';
import Tiptap from './Tiptap';
import TituloComponent from './Titulocomponent';
import { createPostWithProject } from '../apiServices';
import apiFetch from '../apiServices';

// Define la estructura de cada proyecto
interface Project {
  id: number;
  attributes: {
    name: string;
    language: string;
    createdAt: string;
  };
}

const CreatorForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState(''); 
  const [projects, setProjects] = useState<Project[]>([]); // Define el tipo como Project[]
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null); 
  const [selectedProjectName, setSelectedProjectName] = useState(''); 
  const [title, setTitle] = useState(''); 
  const [content, setContent] = useState(''); 
  const [activecard, setActivecard] = useState<number | null>(null); 

  const cardItems = [
    { image: Sourcecardyt, text: 'Video' },
    { image: sourcecardshort, text: 'Short' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiFetch('/projects');
        setProjects(data.data);
        setFilteredProjects(data.data);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.attributes?.name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, projects]);

  const createPost = async () => {
    if (!selectedProject) {
      alert('Por favor, selecciona un proyecto');
      return;
    }
    try {
      const response = await createPostWithProject(title, content, selectedProject);
      console.log('Post creado con éxito:', response);
      alert('¡El post se ha creado con éxito!');
    } catch (error) {
      console.error('Error al crear el post:', error);
      alert('Hubo un error al crear el post');
    }
  };

  return (
    <>
      <div className="rounded-2xl bg-Clouds p-4 ">
        <div className="flex flex-col gap-2 ">
          <span className="text-xl font-semibold">Crearemos...</span>
          <div className="flex gap-4 ">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl cursor-pointer transition-all duration-200 ease-in-out ${
                  activecard === index ? 'bg-Ocean' : 'hover:bg-Selector'
                } `}
                onClick={() => setActivecard(index)}
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  width={296}
                  height={190}
                  className="rounded-lg"
                />
                <div>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Title-awesome bg-Clouds flex flex-col p-4 gap-2 rounded-2xl">
        <span className="text-xl font-semibold">
          ¡Escribe un <span className="text-PrimaryF">título</span> increíble!
        </span>
        <TituloComponent value={title} onChange={setTitle} />
      </div>

      <div className="link-Project bg-Clouds flex flex-col p-4 rounded-2xl gap-2 ">
        <span className="text-xl font-semibold">
          Enlaza tu post a un <span className="text-PrimaryF">Proyecto:</span>{' '}
        </span>
        <div className="w-full relative">
          <InputSearch
            placeholder="Buscar proyectos"
            type="search"
            icon={<Iconsearch />}
            value={selectedProjectName || searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            results={filteredProjects}
            onResultSelect={(id, name) => {
              setSelectedProject(id);
              setSelectedProjectName(name);
              setSearchValue('');
            }}
          />
        </div>

        {selectedProject && (
          <div className="mt-4">
            <p>Proyecto seleccionado: {projects.find((p) => p.id === selectedProject)?.attributes?.name || 'No encontrado'}</p>
          </div>
        )}
      </div>

      <div className="bg-Clouds flex flex-col p-4 rounded-2xl gap-2">
        <span className="text-DarkOcean font-medium">Configuremos un par de cosas más.</span>
      </div>

      <div className="bg-Clouds flex flex-col p-4 rounded-2xl gap-2">
        <span className="text-DarkOcean text-xl font-semibold p-2">
          Elige una <span className="text-PrimaryF">playlist</span> para tu video:
        </span>
        <InputSearch
          placeholder="Selecciona uno o varios idiomas"
          type="search"
          icon={<Iconsearch />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          results={[]} 
          onResultSelect={(id) => console.log('Seleccionar playlist con id:', id)}
        />
      </div>

      <div className="bg-Clouds rounded-2xl p-4 gap-2">
        <span className="font-semibold text-xl">
          Añade unas cuantas <span className="text-PrimaryF">etiquetas</span> a tu video:
        </span>
        <Tagadd />
      </div>

      <div className="p-4 bg-Clouds rounded-2xl flex flex-col">
        <ImageuploadCreator />
      </div>

      <div className="p-4 bg-Clouds rounded-2xl flex flex-col">
        <span className="text-xl font-semibold">
          Hora de escribir el <span className="text-PrimaryF">guión para tu video</span>, deja fluir tus ideas aquí:
        </span>
        <Tiptap content={content} onChange={setContent} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <button
          type="submit"
          onClick={createPost}
          className="bg-PrimaryF rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Ocean active:bg-[#5458FF]"
        >
          ¡Crear video!
        </button>
        <button
          type="submit"
          className="bg-[#3EE9B0] rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-[#61DEB5] active:bg-[#41D3A3]"
        >
          Guardar borrador
        </button>
        <button
          type="submit"
          className="bg-Selector rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Selector-Hovered active:bg-Selector-PRESSED mb-[128px]"
        >
          Descartar video
        </button>
      </div>
    </>
  );
};

export default CreatorForm;
