'use client';
import React, { useState } from 'react';
import IconImageupload from '../assets/Icons/IconImageupload';
import Image from 'next/image';

// Definimos el tipo de props para incluir onImageUpload
interface ImageUploadCreatorProps {
  onImageUpload: (file: File) => void;
}

const ImageuploadCreator: React.FC<ImageUploadCreatorProps> = ({ onImageUpload }) => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedImage(file);
      onImageUpload(file); // Llamamos a la función onImageUpload cuando se selecciona la imagen
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      onImageUpload(file); // Llamamos a la función onImageUpload
    }
  };

  const handleButtonClick = () => {
    document.getElementById('image-upload')?.click();
  };

  const handleDeleteImage = () => {
    setUploadedImage(null);
  };

  return (
    <>
      <span className="block text-xl font-semibold">
        Un buen video necesita una buena miniatura, súbela:
      </span>

      <div
        className="flex flex-col justify-center items-center p-4 gap-2 rounded-2xl bg-Paper"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {uploadedImage ? (
          <Image
            src={URL.createObjectURL(uploadedImage)}
            alt="Uploaded thumbnail"
            width={400}
            height={300}
            className="rounded-2xl object-cover"
          />
        ) : (
          <>
            <IconImageupload width={149} height={120} />
            <label htmlFor="image-upload">Arrastra o sube tu imagen aquí</label>
          </>
        )}

        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          onChange={handleFileChange}
        />

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            className="bg-PrimaryF py-2 px-4 rounded-2xl text-Clouds"
            onClick={handleButtonClick}
          >
            {uploadedImage ? 'Reemplazar imagen' : 'Sube un archivo'}
          </button>

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
