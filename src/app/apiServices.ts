const API_BASE_URL = 'https://strapi-admin-dev.flowshopy.com.br/api';

const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer a621301477fae00eaa4a0e96b2c33233f882b50332882e8876397b494cab3c94127367a699f89bafb87455d508a766c339f47efc4a63bc78060f08af01927d811d318333b9fcd5ffc83f23f9ce1edb0d2f709b31297f26c883cc732a30cd4074b84e7a83a862f826bb3ae1ce5003b8666536a366e2583fb08b8f7592ad5b0198',
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error('Error al hacer la solicitud API:', error.message);
    throw error;
  }
};

// Función para obtener posts asociados a un proyecto específico
export const fetchPostsByProject = async (projectId: number) => {
  return await apiFetch(`/posts?filters[project_id][id]=${projectId}&populate=*`);
};

// Función para crear un post con un proyecto asociado
export const createPostWithProject = async (title: string, content: string, projectId: number) => {
  return await apiFetch('/posts', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        title,
        content,
        project_id: projectId,
      },
    }),
  });
};

export default apiFetch;
