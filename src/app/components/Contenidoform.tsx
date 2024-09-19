"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import Spainflag from "../assets/Icons/spainflag";
import CustomCheckbox from "./CustomCheck";
import Lorem from "./lorem";
import bible from '../assets/images/bible.png';
import { Video } from "lucide-react";

interface Item {
  id: string;
  flag: JSX.Element;
  title: string;
  project: string;
  identifier: string;
}

interface Video {
  id: string;
  image:StaticImageData;
  title:string;
  Fecha:string;
  Estado:boolean;
}

const LinkedVideo:Video[] = [
  {
    id: '1',
    image:bible,
    title:'Biblia',
    Fecha:'01/01/1999',
    Estado: true,

  }
]

const items: Item[] = [
  {
    id: "1",
    flag: <Spainflag />,
    title: "Lorem impsun",
    project: "Lorem impsun",
    identifier: "ASasdXA812NJKAasdq34sadfjSD57123",
  },
  {
    id: "2",
    flag: <Spainflag />,
    title: "Lorem impsun 2",
    project: "Lorem impsun 2",
    identifier: "ASasdXA812NJKAasdq34sadfjSD57123",
  },
];

const Contenidolist: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItem(prev => (prev === id ? null : id));
  };

  const [estado, setEstado] = useState(LinkedVideo[0].Estado);
  const Video = LinkedVideo[0];

  return (
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <div key={item.id} className="flex flex-col py-11 px-8 rounded-2xl bg-Clouds">
          <div onClick={() => toggleExpand(item.id)} className="flex justify-between items-center cursor-pointer">
            <div className="flex gap-4 items-center">
              <input type="checkbox" id={`check-${item.id}`} className="w-6 h-6 cursor-pointer rounded-2xl border-PrimaryF" />
              <label htmlFor={`check-${item.id}`}>{item.flag}</label>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-softgray">Título</span>
              <label className="text-lg">{item.title}</label>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-softgray">Proyecto</span>
              <label className="text-lg">{item.project}</label>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-softgray">Identificador</span>
              <label className="text-lg">{item.identifier}</label>
            </div>
          </div>

          <div className={`flex flex-col gap-[42px] ${expandedItem === item.id ? "pt-[42px]" : "mt-0"} overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === item.id ? "max-h-[779px]" : "max-h-0"}`}>
            <div className="flex justify-between">
              {["Comprobando Guion", "Analizando Etiquetas", "Buscando Público", "Creando Recursos", "Creando Video", "Video Terminado"].map((label, index) => (
                <div key={index} className="flex flex-col items-center">
                  <CustomCheckbox />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="flex">
              <div className="bg-Paper rounded-2xl p-4 max-h-[315px] min-h-[315px] overflow-x-scroll hide-scrollbar">
                <Lorem />
              </div>
              <div className="bg-Paper py-2 px-3 rounded-lg">
                <div className="flex flex-col w-[404px] justify-center items-start">
                  <Image src={bible} alt="" height={191.5} width={399} className="rounded-lg" />
                  <span>Título</span>
                  <label>Views</label>
                </div>
              </div>
            </div>

              <div className="flex flex-row gap-4">
                  {['Etiqueta 1' ,'Etiqueta 1' ,'Etiqueta 1' ,'Etiqueta 1' ,'Etiqueta 1'].map((tag,index) => (
                    <div key={index} className="bg-Ocean rounded-2xl text-Clouds font-medium py-2 px-3">
                      {tag}
                    </div>
                  ) )} 
              </div>

              <div className="flex flex-row gap-4">
                <div className="flex flex-row gap-4 py-2 px-3 bg-PrimaryF rounded-lg">
                    <div className="flex flex-row gap-2 text-Clouds"> 
                      <Image height={98} width={156} src={Video.image} alt={Video.title} className="rounded-md"/>
                      <div className="flex flex-col gap-1">
                      <span>{Video.title}</span>
                      <span>{Video.Fecha}</span>
                      {estado ?( <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-PrimaryF font-semibold font text-xs">Publicado</span> ) : ( <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-red-700 font-semibold font text-xs">No publicado</span>)
                      }
                      
                    </div>
                      </div>
                    
                </div>
              </div>


          </div>
        </div>
      ))}
    </div>
  );
};

export default Contenidolist;
