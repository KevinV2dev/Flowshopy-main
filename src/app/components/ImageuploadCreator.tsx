'use client'
import React, { useState } from 'react';
import IconImageupload from '../assets/Icons/IconImageupload';
import Image from 'next/image'
const ImageuploadCreator: React.FC = () => {
  // Estado para guardar la imagen
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  // Manejador de archivos cuando el usuario arrastra la imagen
  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // Manejador de la acción de arrastrar
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  // Manejador cuando el usuario selecciona la imagen desde el botón
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  // Manejador para simular el clic del botón de subir archivo
  const handleButtonClick = () => {
    document.getElementById('image-upload')?.click();
  };

  // Manejador para borrar la imagen
  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  return (
    <>
      <span className="block text-xl font-semibold">
        Un buen video necesita una buena miniatura, súbela:
      </span>

      {/* Contenedor para arrastrar y soltar la imagen */}
      <div
        className="flex flex-col justify-center items-center p-4 gap-2 rounded-2xl bg-Paper"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploadedImage ? (
          <Image
          src={URL.createObjectURL(uploadedImage)} // Usamos el archivo de imagen cargado
          alt="Uploaded thumbnail"
          width={400} // Asignamos el tamaño de la imagen
          height={300} // Optimización al definir dimensiones
          className="rounded-2xl object-cover"
        />
        ) : (
          <>
            <IconImageupload width={149} height={120} />
            <label htmlFor="image-upload">Arrastra o sube tu imagen aquí</label>
          </>
        )}

        {/* Input oculto para seleccionar la imagen */}
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          onChange={handleFileChange}
        />

        {/* Botones visibles */}
        <div className="flex gap-4 mt-4">
          {/* Botón para subir o reemplazar la imagen */}
          <button
            type="button"
            className="bg-PrimaryF py-2 px-4 rounded-2xl text-Clouds"
            onClick={handleButtonClick}
          >
            {uploadedImage ? 'Reemplazar imagen' : 'Sube un Archivo'}
          </button>

          {/* Botón para borrar la imagen */}
          {uploadedImage && (
            <button
              type="button"
              className="bg-red-400 py-2 px-4 rounded-2xl text-Clouds"
              onClick={handleDeleteImage}
            >
              Borrar imagen
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageuploadCreator;
