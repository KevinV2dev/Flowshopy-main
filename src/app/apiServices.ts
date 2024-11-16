const API_BASE_URL = 'https://strapi-admin-dev.flowshopy.com.br/api';


const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer  5e83fc8957ff280e41f5046aee2df3c9dd4d9f6eb5e2c4f28ffc211d1c1490c60d8d605901692f3a0f370f89f05db19581ed4a13f65abcdfbac6481e2515dbb2885e47601a90af5a387af5ed5dec572c85400f63ffe86b8d5947d6bd2ec6a0ceefe6e41225f5e850a61a4376e739b5957a2931bee16c9ac354e69864b7136e16',
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
if (!response.ok) {
  const errorData = await response.json();
  console.error('Detalles del error:', errorData); // Esto imprime detalles del error de Strapi
  throw new Error(`Error en la solicitud: ${response.statusText}`);
}
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error al hacer la solicitud API:', error.message);
    throw error;
  }
};

// Definir el tipo específico de categoría que queremos obtener
interface CategoryData {
  id: number;
  attributes: {
    name: string;
  };
}

// Nueva función para obtener categorías directamente desde /categories
export const fetchCategories = async (): Promise<{ data: CategoryData[] }> => {
  console.log(`Obteniendo todas las categorías`);
  
  const response = await apiFetch(`/categories`);
  console.log("Respuesta completa de la API (categorías):", response); // Verificar que se obtienen las categorías
  
  return response;
};

// Función para obtener todos los proyectos
export const fetchProjects = async () => {
  // Utilizar `populate[product_id]=*` para obtener toda la información de `product_id`
  return await apiFetch('/projects?populate[product_id]=*');
};

// Función para obtener posts asociados a un proyecto específico
export const fetchPostsByProject = async (projectId: number) => {
  return await apiFetch(`/posts?filters[project_id][id]=${projectId}&populate=*`);
  
};

// Función para subir imagen a Strapi
export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("files", imageFile);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 5e83fc8957ff280e41f5046aee2df3c9dd4d9f6eb5e2c4f28ffc211d1c1490c60d8d605901692f3a0f370f89f05db19581ed4a13f65abcdfbac6481e2515dbb2885e47601a90af5a387af5ed5dec572c85400f63ffe86b8d5947d6bd2ec6a0ceefe6e41225f5e850a61a4376e739b5957a2931bee16c9ac354e69864b7136e16',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error al subir la imagen: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0].id; // Devuelve el id de la imagen subida
  } catch (error: any) {
    console.error('Error al subir la imagen:', error.message);
    throw error;
  }
};

// Función para crear un post con un proyecto asociado
export const createPostWithProject = async (title: string, content: string, projectId: number, featuredImageId: number,tags: string[],categoryId: number) => {
  return await apiFetch('/posts', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        title,
        content,
        project_id: projectId,
        featuredImage: featuredImageId,
        tags: tags.map(tag => ({ name: tag })),
        categories: [{ id: categoryId }],
        excerpt: "Por favor, recuerden cambiar esto a algo dinámico", // Agregar esta línea
        
      },
    }),
  });

  
};

// Función para actualizar un post existente
export const updatePost = async (postId: number, title: string, content: string, featuredImageId: number, tags: string[]) => {
  return await apiFetch(`/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      data: {
        title,
        content,
        featuredImage: featuredImageId ? { id: featuredImageId } : null,
      },
    }),
  });
};


// Nueva función para obtener todos los productos asociados a los proyectos
export const fetchAllProductsFromProjects = async () => {
  try {
    const response = await apiFetch(`/projects?populate[product_id][populate]=niche_id`);
    const projectsData = response.data;

    if (!projectsData || projectsData.length === 0) {
      console.warn('No se encontraron proyectos en la API.');
      return [];
    }

    // Mapear los productos con sus IDs y atributos
    const products = projectsData
      .map((project: any) => {
        const productData = project.attributes.product_id?.data;
        if (!productData) return null; // Filtra proyectos sin producto

        const productAttributes = productData.attributes;
        const niche = productAttributes.niche_id?.data?.attributes.name || 'Sin Nicho Asignado';

        return {
          id: productData.id, // Incluimos el ID del producto
          name: productAttributes.name,
          url_sale_page: productAttributes.url_sale_page,
          url_checkout: productAttributes.url_checkout,
          url_promote: productAttributes.url_promote,
          cta_header: productAttributes.cta_header,
          cta_footer: productAttributes.cta_footer,
          createdAt: productAttributes.createdAt,
          niche, // Incluimos el nicho
        };
      })
      .filter(Boolean); // Eliminar productos nulos

    return products;
  } catch (error) {
    console.error('Error al obtener productos y nichos de los proyectos:', error);
    throw error;
  }
};











export default apiFetch;
