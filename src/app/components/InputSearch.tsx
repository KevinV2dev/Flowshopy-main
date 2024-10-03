import React, { useState } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';

interface InputProps {
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch: React.FC<InputProps> = ({
  placeholder = "Busca Aquí", // Placeholder predeterminado
  type = "search", // Tipo predeterminado
  icon = <Iconsearch />, // Icono predeterminado
  value,
  onChange
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isText, setIsText] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLength = e.target.value.length;
    setIsText(inputLength >= 7);
    onChange(e); // Mantener el onChange para pasar el valor al componente padre
  };

  return (
    <div>
      <div className="flex flex-row items-center relative">
        {icon && <span className="absolute left-4">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={`bg-Paper focus:outline-none border rounded-2xl py-2 px-10 w-full transition-all duration-300 ease-in-out
            ${isText ? 'border-Candy' : isFocused ? 'border-PrimaryF' : 'border-transparent'}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInputChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default InputSearch;
