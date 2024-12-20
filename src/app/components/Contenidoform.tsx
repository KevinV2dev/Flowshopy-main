"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import Spainflag from "../assets/Icons/spainflag";
import CustomCheckbox from "./CustomCheck";
import Content from "./Content";
import bible from '../assets/images/bible.png';
import { Video } from "lucide-react";
import CopyIcon from "../assets/Icons/CopyIcon";
import { fetchPostsByProject } from "../apiServices";
import CustomCheckboxProject from "./CustomCheckboxProject";

interface Post {
  id: string;
  attributes: {
    title: string;
    content: string;
    tags: { name: string }[];
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
  const [tags, setTags] = useState<string[]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
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
          'Authorization': 'Bearer 91bf640cc5ef51b0caf5d475bc5484581938433dfa9076e3448aa285af20cbce30c9353951fa14ab17cc28701724529f3bb26d185d8ffe6247dd81b1bb2cc2f83c8d6f92052181c3d34649cb4382a0e4641e2cfab45876d3c110ab40975344ddd0526b06ed474bab5dbb7b114f9d2aeb3b7d715faf05e22641e01ea3b956ba20',
        },
      });

      const data = await response.json();
      const newPosts = Array.isArray(data.data) ? data.data : [];

      const newTags = newPosts.flatMap((post: Post) =>
        post.attributes.tags.map((tag: { name: string }) => tag.name)
      );
      setTags(prevTags => Array.from(new Set([...prevTags, ...newTags])));

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
        <div key={post.id} className="flex flex-col py-11 px-8 rounded-2xl bg-Clouds cursor-pointer" onClick={() => toggleExpand(post.id)}>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center" onClick={(e) => e.stopPropagation()}>
              <CustomCheckboxProject
                checked={!!checkedItems[post.id]}
                onChange={(checked) => {
                  setCheckedItems(prev => ({
                    ...prev,
                    [post.id]: checked
                  }));
                }}
              />
              <label><Spainflag /></label>
            </div>

            <div className="flex flex-col max-w-[280px] truncate">
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
              <span className="text-sm text-softgray">Lorem Ipsum</span>
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

            <div className="flex gap-4 mt-4">
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

            <div className="flex flex-row flex-wrap gap-4 mt-4">
              {tags.slice(0, 8).map((tag, index) => ( //LIMITADO A 8 ETIQUETAS
                <div key={index} className="bg-Ocean rounded-2xl text-Clouds font-medium py-2 px-3">
                  {tag}
                </div>
              ))}
            </div>

            <div className="flex flex-row gap-4 mt-4">
              <div className="flex flex-row gap-4 py-2 px-3 bg-PrimaryF rounded-lg">
                <div className="flex flex-row gap-2 text-Clouds">
                  <Image height={98} width={156} src={Video.image} alt={Video.title} className="rounded-md" />
                  <div className="flex flex-col gap-1">
                    <span>{Video.title}</span>
                    <span>{Video.Fecha}</span>
                    {estado ? (
                      <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-PrimaryF font-semibold text-xs">Publicado</span>
                    ) : (
                      <span className="bg-Clouds rounded-2xl py-[6px] px-[10px] text-red-700 font-semibold text-xs">No publicado</span>
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
