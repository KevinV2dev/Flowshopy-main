import React from 'react';
import { useState } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';


const InputSearch: React.FC = () => {

  // Estado para controlar si el input está enfocado
const [isFocused , setIsFocused] = useState(false)
const [istext , setIstext ] = useState(false)
const [nottext , setNottext ] = useState(false)

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputLength = e.target.value.length;
  setIstext(inputLength >= 7); // ESTO E SUNA COPIA
  
};

  return (
    <div>
      <div className="flex flex-row items-center relative  ">
                <Iconsearch className="absolute left-4 "/>
                  <input
                  type="search"
                  name="projects"
                  placeholder="Busca Aqui"
                  className={`  bg-Paper focus:outline-none border rounded-2xl py-2 px-10 w-full transition-all duration-300 ease-in-out
                    ${istext ? 'border-Candy' : isFocused ? 'border-PrimaryF' : 'border-transparent'}`} // CAMBIAR LA CLASE AQUI
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                  />
                
                
              </div>
    </div>
  );
};

export default InputSearch;