import React, { useState } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';

interface InputProps {
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  value: string; // El valor que se mostrará en el input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Para manejar los cambios del input
  results: Array<any>; // Lista de resultados (proyectos filtrados)
  onResultSelect: (id: number, name: string) => void; // Función para manejar la selección del resultado
}

const InputSearch: React.FC<InputProps> = ({
  placeholder = 'Busca Aquí',
  type = 'search',
  icon = <Iconsearch />,
  value,
  onChange,
  results,
  onResultSelect
}) => {
  const [isFocused, setIsFocused] = useState(false); // Controla si el input está enfocado
  const [showResults, setShowResults] = useState(false); // Controla la visibilidad de la lista

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e); // Llama al onChange para actualizar el valor en el componente padre
    setShowResults(true); // Muestra los resultados mientras se escribe
  };

  const handleResultClick = (id: number, name: string) => {
    onResultSelect(id, name); // Selecciona el proyecto
    setShowResults(false); // Oculta la lista después de la selección
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center relative">
        {icon && <span className="absolute left-4">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="bg-Paper focus:outline-none border rounded-2xl py-2 px-10 w-full transition-all duration-300 ease-in-out border-PrimaryF"
          onFocus={() => setShowResults(true)} // Al hacer clic en el input, muestra los resultados
          onChange={handleInputChange}
          value={value} // Muestra el valor seleccionado o lo que el usuario escribe
        />
      </div>

      {/* Mostrar la lista de resultados si hay elementos filtrados y showResults es true */}
      {showResults && results.length > 0 && (
        <div className="absolute z-10 bg-white shadow-md rounded-lg p-4 mt-2 max-h-60 overflow-y-auto w-full">
          {results.map((result: any) => (
            <div
              key={result.id}
              className="py-2 px-4 mb-2 cursor-pointer rounded-lg hover:bg-Ocean hover:text-white"
              onMouseDown={() => handleResultClick(result.id, result.attributes.name)} // Seleccionar proyecto
            >
              {result.attributes.name}
            </div>
          ))}
        </div>
      )}

      {/* Si no hay resultados */}
      {showResults && results.length === 0 && value !== '' && (
        <p className="text-sm text-gray-500 mt-2">No se encontraron proyectos.</p>
      )}
    </div>
  );
};

export default InputSearch;
