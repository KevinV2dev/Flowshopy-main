import React, { useState } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';

interface InputProps {
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (value: string) => void; // Ahora acepta directamente el string actualizado
  results: Array<any>;
  onResultSelect: (id: number, name: string) => void;
}

const InputSearch: React.FC<InputProps> = ({
  placeholder = 'Busca Aquí',
  type = 'search',
  icon = <Iconsearch />,
  value,
  onChange,
  results,
  onResultSelect,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Actualiza el valor en el padre
    setShowResults(true); // Muestra resultados
  };

  const handleClearInput = () => {
    onChange(''); // Limpia el valor
    setShowResults(false); // Oculta los resultados
  };

  const handleResultClick = (id: number, name: string) => {
    onResultSelect(id, name);
    setShowResults(false); // Oculta los resultados después de seleccionar
  };

  return (
    <div
      className="relative"
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsFocused(false);
          setShowResults(false); // Cierra resultados si se pierde el foco
        }
      }}
    >
      <div className="flex flex-row items-center relative">
        {icon && <span className="absolute left-4">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className={`rounded-2xl py-2 px-10 w-full bg-Paper transition-all duration-300 ease-in-out outline-none ${
            isFocused ? 'border-PrimaryF border' : 'border-transparent'
          }`}
          value={value}
          onChange={handleInputChange} // Actualiza el valor al escribir
          onFocus={() => setShowResults(true)} // Muestra resultados al enfocar
        />
        {value && (
          <button
            type="button"
            className="absolute right-4 text-gray-500 hover:text-gray-700"
            onClick={handleClearInput}
          >
            &#10005;
          </button>
        )}
      </div>

      {isFocused && showResults && results.length > 0 && (
        <div className="absolute z-10 bg-white shadow-md rounded-lg p-4 mt-2 max-h-60 overflow-y-auto w-full border border-gray-200">
          {results.map((result: any) => (
            <div
              key={result.id}
              className="py-2 px-4 mb-2 cursor-pointer rounded-lg hover:bg-Ocean hover:text-white"
              onMouseDown={() => handleResultClick(result.id, result.attributes.name)} // Selección
            >
              {result.attributes.name}
            </div>
          ))}
        </div>
      )}

      {isFocused && showResults && results.length === 0 && value !== '' && (
        <p className="text-sm text-gray-500 mt-2">No se encontraron proyectos.</p>
      )}
    </div>
  );
};

export default InputSearch;
