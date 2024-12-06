'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import CopyIcon from '../assets/Icons/CopyIcon';
import CheckIcon from '../assets/Icons/Checkicon';
import apiFetch, { fetchPostsByProject } from '../apiServices';
import CustomCheckboxProject from './CustomCheckboxProject';

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<{ [key: number]: Post[] }>({});
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await apiFetch('/projects');
      setProjects(data.data);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const fetchAndSetPosts = async (projectId: number) => {
    try {
      const data = await fetchPostsByProject(projectId);
      setPosts((prevPosts) => ({
        ...prevPosts,
        [projectId]: data.data,
      }));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleExpand = (id: number) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
      if (!posts[id]) {
        fetchAndSetPosts(id);
      }
    }
  };

  return (
    <div className="space-y-4">
      {error && <div className="text-red-600">Error: {error}</div>}

      {projects.length === 0 ? (
        <div>Cargando proyectos...</div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-Clouds rounded-2xl py-10 px-16 transition-all duration-500 cursor-pointer"
            onClick={() => toggleExpand(project.id)}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4" onClick={(e) => e.stopPropagation()}>
                <CustomCheckboxProject
                  checked={!!checkedItems[project.id]}
                  onChange={(checked) => {
                    setCheckedItems((prev) => ({
                      ...prev,
                      [project.id]: checked,
                    }));
                  }}
                />
                <Image src="/spainflag.svg" width={41} height={28} alt="flag" />
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Nombre del Proyecto</label>
                <span className="text-DarkOcean text-lg font-semibold">{project.attributes.name}</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Idioma</label>
                <span className="text-DarkOcean text-lg font-semibold">{project.attributes.language}</span>
              </div>

              <div className="flex flex-col">
                <label className="text-[12px] font-normal opacity-80">Fecha de Creación</label>
                <span className="text-DarkOcean text-lg font-semibold">
                  {new Date(project.attributes.createdAt).toLocaleDateString()}
                </span>
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

            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                expandedItem === project.id ? 'max-h-[600px] pt-4' : 'max-h-0'
              }`}
            >
              <div className="pt-4 flex flex-wrap overflow-scroll gap-4">
                {posts[project.id] ? (
                  posts[project.id].map((post) => (
                    <div key={post.id} className="flex gap-4 py-2 px-3 bg-Paper max-w-[407px]">
                      <div> IMAGEN </div>
                      <div className="flex flex-col gap-1">
                        <h3>{post.attributes.title}</h3>
                        <span>FECHA</span>
                        <label className="flex py-[6px] px-[10px] bg-Ocean rounded-2xl text-Clouds text-[10px] font-semibold max-w-[71px]">
                          Publicado
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <h3>Cargando contenidos...</h3>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Proyectos;
