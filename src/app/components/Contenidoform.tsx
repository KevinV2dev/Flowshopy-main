"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import Spainflag from "../assets/Icons/spainflag";
import CustomCheckbox from "./CustomCheck";
import Content from "./Content";
import bible from '../assets/images/bible.png';
import { Video } from "lucide-react";
import CopyIcon from "../assets/Icons/CopyIcon";

interface Post {
  id: string;
  attributes: {
    title: string;
    content: string;
    project_id: {
      data: {
        attributes: {
          name: string;
        };
      } | null;
    };
    identifier: string;
  };
}

interface Project {
  id: number;
  name: string;
}

interface Video {
  id: string;
  image: StaticImageData;
  title: string;
  Fecha: string;
  Estado: boolean;
}

const LinkedVideo: Video[] = [
  {
    id: '1',
    image: bible,
    title: 'Biblia',
    Fecha: '01/01/1999',
    Estado: true,
  }
];

const Contenidolist: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [projects, setProjects] = useState<{ [key: number]: Project }>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    try {
      const pageSize = 10;
      const response = await fetch(`https://strapi-admin-dev.flowshopy.com.br/api/posts?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`, {
        headers: {
          'Authorization': 'Bearer a621301477fae00eaa4a0e96b2c33233f882b50332882e8876397b494cab3c94127367a699f89bafb87455d508a766c339f47efc4a63bc78060f08af01927d811d318333b9fcd5ffc83f23f9ce1edb0d2f709b31297f26c883cc732a30cd4074b84e7a83a862f826bb3ae1ce5003b8666536a366e2583fb08b8f7592ad5b0198',
        },
      });

      const data = await response.json();
      const newPosts = Array.isArray(data.data) ? data.data : [];

      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);

      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
    setLoading(false);
  }, [hasMore, loading, page]);

  // Hook para cargar los posts al inicio y manejar el scroll
  useEffect(() => {
    loadMorePosts();
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      loadMorePosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, loadMorePosts]);

  const toggleExpand = (id: string) => {
    setExpandedItem(prev => (prev === id ? null : id));
  };

  const [estado] = useState(LinkedVideo[0].Estado);
  const Video = LinkedVideo[0];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col py-11 px-8 rounded-2xl bg-Clouds">
          <div onClick={() => toggleExpand(post.id)} className="flex justify-between items-center cursor-pointer">
            <div className="flex gap-4 items-center">
              <input type="checkbox" id={`check-${post.id}`} className="w-6 h-6 cursor-pointer rounded-2xl border-PrimaryF" />
              <label><Spainflag /></label>
            </div>

            <div className="flex flex-col max-w-[280px] text-nowrap">
              <span className="text-sm text-softgray">Título</span>
              <label title={post.attributes.title} className="text-lg truncate">{post.attributes.title}</label>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-softgray">Proyecto</span>
              <label className="text-lg">
              {post.attributes.project_id?.data ? (
                  post.attributes.project_id.data.attributes.name
                ) : (
                  'No especificado'
                )}
              </label>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-softgray">Lorem Impsum</span>
              <label className="text-lg">
                
                  Lorem I
                
              </label>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-softgray">Identificador</span>
              <div className="flex flex-row items-center gap-2">
                <label className="text-lg">{post.attributes.identifier || post.id}</label>
                <CopyIcon />
              </div>
            </div>
          </div>

          <div className={`flex flex-col gap-[42px] ${expandedItem === post.id ? "pt-[42px]" : "mt-0"} overflow-hidden transition-all duration-500 ease-in-out ${expandedItem === post.id ? "max-h-[779px]" : "max-h-0"}`}>
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
                <Content content={post.attributes.content} />
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
              {['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3', 'Etiqueta 4', 'Etiqueta 5'].map((tag, index) => (
                <div key={index} className="bg-Ocean rounded-2xl text-Clouds font-medium py-2 px-3">
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-4">
              <div className="flex flex-row gap-4 py-2 px-3 bg-PrimaryF rounded-lg">
                <div className="flex flex-row gap-2 text-Clouds">
                  <Image height={98} width={156} src={Video.image} alt={Video.title} className="rounded-md" />
                  <div className="flex flex-col gap-1">
                    <span>{Video.title}</span>
                    <span>{Video.Fecha}</span>
                    {estado ? (
                      <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-PrimaryF font-semibold font text-xs">Publicado</span>
                    ) : (
                      <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-red-700 font-semibold font text-xs">No publicado</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {loading && <p>Cargando más posts...</p>}
      {!hasMore && <p>No hay más posts por cargar.</p>}
    </div>
  );
};

export default Contenidolist;
