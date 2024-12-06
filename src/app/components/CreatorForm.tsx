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
import { createPostWithProject, uploadImage, updatePost, fetchProjects } from '../apiServices';
import apiFetch from '../apiServices';
import CategorySearch from './Inputcategory';

// Define la estructura de cada proyecto
interface Project {
  id: number;
  attributes: {
    product_id: any;
    name: string;
    language: string;
    createdAt: string;
    uuid:string;
  };
}

const CreatorForm: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [selectedProjectName, setSelectedProjectName] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [activecard, setActivecard] = useState<number | null>(null);
  const [imageId, setImageId] = useState<number | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [postId, setPostId] = useState<number | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{ id: number | null; name: string }>({
    id: null,
    name: '',
  });

  const cardItems = [
    { image: Sourcecardyt, text: 'Video' },
    { image: sourcecardshort, text: 'Short' },
  ];

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const data = await fetchProjects(); // Llama a la función actualizada de `apiServices`
        setProjects(data.data);
        setFilteredProjects(data.data);
  
        // Agregar log para verificar que `product_id` esté presente
        console.log('Proyectos obtenidos con `product_id`:', data.data);
  
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };
    fetchProjectsData();
  }, []);

  

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.attributes?.name?.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, projects]);

  const handleImageUpload = (file: File) => {
    setIsImageUploaded(false);
    setImageId(null);
  };

  const saveDraft = async () => {
    const file = document.getElementById("image-upload") as HTMLInputElement;
    const fileToUpload = file?.files ? file.files[0] : null;
  
    if (!fileToUpload) {
      alert('Por favor, selecciona una imagen antes de guardar el borrador.');
      return;
    }
  
    if (!selectedProject) {
      alert('Por favor, selecciona un proyecto antes de guardar el borrador.');
      return;
    }
  
    const project = projects.find((p) => p.id === selectedProject);
  
    if (!project || !project.attributes.product_id?.data) {
      alert('El proyecto seleccionado no tiene un producto relacionado. Por favor, selecciona otro proyecto.');
      return;
    }
  
    try {
      let uploadedImageId = imageId;
  
      if (!isImageUploaded) {
        uploadedImageId = await uploadImage(fileToUpload);
        setImageId(uploadedImageId);
        setIsImageUploaded(true);
        console.log('Imagen subida y guardada como borrador');
      }
  
      if (uploadedImageId) {
        if (!postId && selectedCategory.id !== null) {
          const newPostResponse = await createPostWithProject(
            title,
            content,
            selectedProject,
            uploadedImageId,
            tags,
            selectedCategory.id
          );
          setPostId(newPostResponse.data.id);
          const postUUID = newPostResponse.data.attributes.uuid; // Extrae el UUID del post aquí
          console.log('UUID del post creado:', postUUID);
          setIsDraftSaved(true);
          alert('Borrador guardado exitosamente con el post creado.');
        } else {
          alert('Por favor, selecciona una categoría antes de guardar el borrador.');
        }
      }
    } catch (error) {
      console.error('Error al guardar borrador:', error);
      alert('Hubo un error al guardar el borrador');
    }
  };
  const sendUUIDToAnotherAPI = async (uuid: string) => {
    try {
      const response = await fetch('https://webhooks-dev.flowshopy.com.br/webhook/orchestrator/start-create-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uuid }),
      });
  
      if (!response.ok) {
        throw new Error('Error al enviar el UUID a la otra API');
      }
      
      alert('UUID enviado exitosamente a la otra API');
    } catch (error) {
      console.error('Error al enviar UUID a la otra API:', error);
      alert('Hubo un error al enviar el UUID');
    }
  };

  const createPost = async () => {
    if (!isImageUploaded) {
      alert('Por favor, sube una imagen y guarda el borrador antes de crear el video.');
      return;
    }
  
    if (!selectedProject) {
      alert('Por favor, selecciona un proyecto');
      return;
    }
  
    const project = projects.find((p) => p.id === selectedProject);
  
    if (!project || !project.attributes.product_id?.data) {
      alert('El proyecto seleccionado no tiene un producto relacionado. Por favor, selecciona otro proyecto.');
      return;
    }
  
    try {
      let postUUID = null;
  
      // Crear o actualizar el post y capturar el UUID del post
      if (postId && typeof postId === 'number') {
        const updatedPostResponse = await updatePost(postId, title, content, imageId!, tags);
        postUUID = updatedPostResponse.data.attributes.uuid; // Obtén el UUID del post actualizado
        alert('¡El post se ha actualizado con éxito!');
      } else {
        if (selectedCategory.id !== null) {
          const newPostResponse = await createPostWithProject(
            title,
            content,
            selectedProject,
            imageId!,
            tags,
            selectedCategory.id
          );
          setPostId(newPostResponse.data.id);
          postUUID = newPostResponse.data.attributes.uuid; // Obtén el UUID del nuevo post creado
          alert('¡El post se ha creado con éxito!');
        } else {
          alert('Por favor, selecciona una categoría antes de crear el post.');
          return;
        }
      }
  
      // Enviar el UUID del post a la otra API
      if (postUUID) {
        await sendUUIDToAnotherAPI(postUUID);
      } else {
        alert('No se encontró el UUID para el post creado.');
      }
    } catch (error) {
      console.error('Error al crear o actualizar el post:', error);
      alert('Hubo un error al crear o actualizar el post');
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
          Enlaza tu post a un <span className="text-PrimaryF">proyecto:</span>{' '}
        </span>
        <div className="w-full relative">
        <InputSearch
        placeholder="Buscar proyectos"
        type="search"
        icon={<Iconsearch />}
        value={selectedProjectName || searchValue} // El valor controlado
        onChange={(newValue) => {
          setSearchValue(newValue); // Actualiza el estado del padre
          if (newValue === '') {
            setSelectedProjectName(''); // Limpia el proyecto seleccionado
            setSelectedProject(null);
          }
        }}
        results={filteredProjects.filter((project) =>
          project.attributes.name.toLowerCase().includes(searchValue.toLowerCase())
        )}
        onResultSelect={(id, name) => {
          setSelectedProject(id);
          setSelectedProjectName(name);
          setSearchValue(''); // Limpia el campo después de seleccionar
        }}
      />
        </div>

        
      </div>

      <div className="bg-Clouds flex flex-col p-4 rounded-2xl gap-2">
        <span className="text-DarkOcean font-medium">Configuremos un par de cosas más.</span>
      </div>

      <div className="bg-Clouds flex flex-col p-4 rounded-2xl gap-2">
        <span className="text-DarkOcean text-xl font-semibold p-2">
          Elige una <span className="text-PrimaryF">categoria</span> para tu Proyecto:
        </span>
        <CategorySearch
          placeholder="Buscar categoría"
          value={selectedCategory.name}
          onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
          onCategorySelect={(id, name) => setSelectedCategory({ id, name })}
        />
      </div>

      <div className="bg-Clouds rounded-2xl p-4 gap-2">
        <span className="font-semibold text-xl">
          Añade unas cuantas <span className="text-PrimaryF">etiquetas</span> a tu video:
        </span>
        <Tagadd tags={tags} setTags={setTags} />
      </div>

      <div className="p-4 bg-Clouds rounded-2xl flex flex-col">
        <ImageuploadCreator onImageUpload={handleImageUpload} />
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
          disabled={!isImageUploaded}
          className={`rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Candy active:bg-[#5458FF] ${
            isImageUploaded ? 'bg-Candy' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          ¡Crear video!
        </button>

        <button
          type="button"
          className="bg-PrimaryF rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Ocean active:bg-[#5458FF]"
          onClick={saveDraft}
        >
          {isDraftSaved ? 'Actualizar borrador' : 'Guardar borrador'}
        </button>

        <button
          type="button"
          className="bg-Selector rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Selector-Hovered active:bg-Selector-PRESSED mb-[128px]"
        >
          Descartar video
        </button>
      </div>
    </>
  );
};

export default CreatorForm;
