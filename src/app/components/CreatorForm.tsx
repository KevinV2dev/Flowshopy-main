'use client'
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Sourcecardyt from "../assets/images/Sourcecardyt.png";
import sourcecardshort from "../assets/images/sourcecardshort.png";
import Iconsearch from "../assets/Icons/Iconsearch";
import InputSearch from "./InputSearch";
import bible from '../assets/images/bible.png'
import ChosePlaylist from './ChosePlaylist'
import coffe from '../assets/images/coffe.jpg'
import Tagadd from './Tagadd'
import ImageuploadCreator from "./ImageuploadCreator";
import Tiptap from "./Tiptap";
import TituloComponent from "./Titulocomponent";


const CreatorForm: React.FC = () => {

  const [searchValue, setSearchValue] = useState('');
  // Array para Craremos Cards, de selecionar UN video o Short
  const cardItems = [
    { image: Sourcecardyt, text: "Video" },
    { image: sourcecardshort, text: "Short" },
    
  ];

  // Varibles Almacenadas para Active o false
  const [activecard, setActivecard] = useState<number | null>(null); // HOOK PARA CARD DE CREAREMOS
  const [activeplaylist, setActiveplaylist] = useState<number | null>(null); // HOOK PARA CARD PLAYLIST
  const [title, setTitle] = useState(''); // Estado para el título
  const [content, setContent] = useState(''); // Estado para el contenido
  

    // Función para crear un nuevo post
  const createPost = async () => {
    try {
      const response = await fetch('https://strapi-admin-dev.flowshopy.com.br/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer a621301477fae00eaa4a0e96b2c33233f882b50332882e8876397b494cab3c94127367a699f89bafb87455d508a766c339f47efc4a63bc78060f08af01927d811d318333b9fcd5ffc83f23f9ce1edb0d2f709b31297f26c883cc732a30cd4074b84e7a83a862f826bb3ae1ce5003b8666536a366e2583fb08b8f7592ad5b0198', // Token de autenticación
        },
        body: JSON.stringify({
          data: {
            title,    // Usamos el título que el usuario haya escrito
            content,  // Usamos el contenido del editor de texto
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();  // Obtener el mensaje de error en caso de fallo
        throw new Error(`Error creando el post: ${errorText}`);
      }
      const data = await response.json();
      console.log('Post creado con éxito:', data);
      alert('¡El post se ha creado con éxito!');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al crear el post');
    }
  };

   
   

  const playlist = [
    {
      
      image: bible,
      title:'Biblia descomplicada',
      lastdate:'Último video añadido 10/07/2024'
    },
    {
      
      image: coffe,
      title:'Biblia de Nextjs',
      lastdate:'Último video añadido 10/07/2023'
    },
  ]

  return (
    <>
      <div className="rounded-2xl bg-Clouds p-4 ">
        <div className="flex flex-col gap-2 ">
          <span className="text-xl font-semibold">Crearemos...</span>
          <div className="flex gap-4 ">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-2xl  cursor-pointer transition-all duration-200 ease-in-out ${activecard === index ? 'bg-Ocean' : 'hover:bg-Selector'} `}
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
        <span className="text-xl font-semibold" >¡Escribe un <span className="text-PrimaryF">título</span> increíble!</span>
          <TituloComponent value={title} onChange={setTitle}/>
      </div>

      <div className="link-Project bg-Clouds flex flex-col p-4 rounded-2xl gap-2 ">
            <span className="text-xl font-semibold">Enlaza tu post a un <span className="text-PrimaryF">Proyecto:</span> </span>
              <div className="w-full relative">
              <InputSearch
                  placeholder='Selecciona uno o varios idiomas'
                  type='search'
                  icon={<Iconsearch/>}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  />
            </div>

              <div className="flex flex-row gap-4 mt-2">
                  <label className="py-2 px-4 bg-PrimaryF rounded-2xl text-Clouds">Biblia Descomplicada</label>
                  
              </div>
      </div>

      <div className="bg-Clouds flex flex-col rounded-2xl p-4">
        <span className="text-DarkOcean  font-medium ">Configuremos un par de cosas más.</span>
      </div>

      <div className="bg-Clouds flex flex-col p-4 rounded-2xl gap-2 ">
            <div>
              <span className="text-DarkOcean text-xl font-semibold p-2">Elige una <span className="text-PrimaryF">playlist</span> para tu video:</span>
            </div>

            <div className="w-full relative">
            <InputSearch
                  placeholder='Selecciona uno o varios idiomas'
                  type='search'
                  icon={<Iconsearch/>}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  />
            </div>
            
            <div className="flex flex-row gap-4">
               {playlist.map((card,index) =>(
                <ChosePlaylist
                key={index}
                image={card.image}
                title={card.title}
                lastdate={card.lastdate}
                isActive={activeplaylist === index} // Verifica si la card está activa
                onClick={() => setActiveplaylist(index)} // Actualiza la card activa
                   
                   />
               ))}
            </div>
      </div>

      <div className="bg-Clouds rounded-2xl p-4 gap-2">
        <span className="font-semibold text-xl">Añade unas cuantas <span className="text-PrimaryF">etiquetas</span> a tu video:</span>
         <Tagadd/>
      </div>

      <div className='p-4 bg-Clouds rounded-2xl flex flex-col'>
                <ImageuploadCreator/>
        </div>

        <div className='p-4 bg-Clouds rounded-2xl flex flex-col'>
          <span className="text-xl font-semibold">Hora de escribir el <span className="text-PrimaryF">guión para tu video</span>, deja fluir tus ideas aquí: </span>
          <Tiptap content={content} onChange={setContent}/>
        </div>
          <div className="flex flex-col w-full gap-2">
            <button type="submit" onClick={createPost}  className="bg-PrimaryF rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-Ocean active:bg-[#5458FF]">¡Crear video! </button>
            <button type="submit" className="bg-[#3EE9B0] rounded-xl py-3 px-0 text-Clouds font-semibold text-xl hover:bg-[#61DEB5] active:bg-[#41D3A3]">Guardar borrador </button>
            <button type="submit" className="bg-Selector rounded-xl py-3 px-0 text-Clouds font-semibold text-xl  hover:bg-Selector-Hovered active:bg-Selector-PRESSED mb-[128px] ">Descartar video </button>
          </div>
    </>
  );
};

export default CreatorForm;
