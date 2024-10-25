'use client'
import React, { useState } from 'react';

const TituloComponent: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  // Estado para controlar si el input está enfocado
  const [isFocused, setIsFocused] = useState(false);
  const [isText, setIsText] = useState(false);
  const [notText, setNotText] = useState(false);

  // Función que maneja los cambios en el input y combina la lógica interna con la función que viene desde props
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputLength = inputValue.length;

    // Lógica interna del componente
    setIsText(inputLength >= 7);  // Cuando el texto es mayor o igual a 7, no hay error
    setNotText(inputLength > 0 && inputLength < 7); // Mostrar advertencia si el texto es menor de 7

    // Llamar al onChange que viene desde los props para notificar al componente padre
    onChange(inputValue);
  };

  return (
    <div className='relative'>
      <input
        type="text"
        name="title"
        value={value} // Este valor viene del padre (el valor que se pasa desde CreatorForm)
        placeholder="Escribe aqui"
        className={`bg-Paper focus:outline-none border rounded-2xl px-3 py-2 items-center w-full transition-all duration-300 ease-in-out
          ${isText ? 'border-Candy' : notText ? 'border-red-500' : isFocused ? 'border-PrimaryF' : 'border-transparent'}`}
        onFocus={() => setIsFocused(true)}  // Controla el estado del enfoque
        onBlur={() => setIsFocused(false)}  // Controla cuando el input pierde el enfoque
        onChange={handleInputChange}  // Combina la lógica interna con el cambio de valor
      />

      {/* Muestra el mensaje de advertencia si el texto es menor a 7 caracteres */}
      {notText && (
        <div className="absolute left-0 top-full mt-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-lg text-sm">
          Tu texto debe tener más de 7 letras
        </div>
      )}
    </div>
  );
};

export default TituloComponent;
