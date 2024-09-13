'use client'
import React from 'react';
import { useState } from 'react';


const TituloComponent: React.FC = () => {

// Estado para controlar si el input está enfocado
const [isFocused , setIsFocused] = useState(false)
const [istext , setIstext ] = useState(false)
const [nottext , setNottext ] = useState(false)

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = e.target.value.length;
    setIstext(inputLength >= 7);  // Cuando el texto es mayor o igual a 7
    setNottext(inputLength > 0 && inputLength < 7); // Mostrar advertencia si es mayor a 0 pero menor a 7
  };

  return (
    <div className='relative'>
      <input
          type="text"
          name="title"
          placeholder="Escribe aqui"
          className={`  bg-Paper focus:outline-none border rounded-2xl px-3 py-2 items-center w-full  transition-all duration-300 ease-in-out
            ${istext ? 'border-Candy' : nottext ? 'border-red-500' : isFocused ? 'border-PrimaryF' : 'border-transparent'}`} // CAMBIAR LA CLASE AQUI
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleInputChange}
            
          />

{nottext && (
        <div className="absolute left-0 top-full mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg text-sm">
          Tu texto debe tener más de 7 letras
        </div>
      )}
    </div>
  );
};

export default TituloComponent;