import React from 'react';
import { useState } from 'react';


const TituloComponent: React.FC = () => {

// Estado para controlar si el input está enfocado
const [isFocused , setIsFocused] = useState(false)
const [istext , setIstext ] = useState(false)
  return (
    <div>
      <input
          type="text"
          name="title"
          placeholder="Escribe aqui"
          className={`  bg-Paper focus:outline-none border rounded-2xl px-3 py-2 items-center w-full  transition-all duration-300 ease-in-out
            ${istext ? 'border-Candy' : isFocused ? 'border-PrimaryF' : 'border-transparent'}`} // CAMBIAR LA CLASE AQUI
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => setIstext(e.target.value.length >= 7)}
          />
    </div>
  );
};

export default TituloComponent;