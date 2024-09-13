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

  // Array para Craremos Cards, de selecionar UN video o Short
  const cardItems = [
    { image: Sourcecardyt, text: "Video" },
    { image: sourcecardshort, text: "Short" },
    
  ];

  // Varibles Almacenadas para Active o false
  const [activecard, setActivecard] = useState<number | null>(null); // HOOK PARA CARD DE CREAREMOS
  const [activeplaylist, setActiveplaylist] = useState<number | null>(null); // HOOK PARA CARD PLAYLIST
  

  
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
          <TituloComponent/>
      </div>

      <div className="link-Project bg-Clouds flex flex-col p-4 rounded-2xl gap-2 ">
            <span className="text-xl font-semibold">Enlaza tu post a un <span className="text-PrimaryF">Proyecto:</span> </span>
              <div className="w-full relative">
                <InputSearch/>
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
                <InputSearch/>
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
          <Tiptap/>
        </div>
          <div className="flex flex-col w-full gap-2">
            <button type="submit" className="bg-PrimaryF rounded-xl py-3 px-0 text-Clouds font-semibold text-xl">¡Crear video! </button>
            <button type="submit" className="bg-[#3EE9B0] rounded-xl py-3 px-0 text-Clouds font-semibold text-xl">Guardar borrador </button>
            <button type="submit" className="bg-Selector rounded-xl py-3 px-0 text-Clouds font-semibold text-xl">Descartar video </button>
          </div>
    </>
  );
};

export default CreatorForm;
