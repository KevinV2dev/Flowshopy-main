import React, { useState, useEffect } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';
import { fetchCategories } from '../apiServices';

interface CategorySearchProps {
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect: (id: number, name: string) => void; // Propiedad para manejar selección
}

interface Category {
  id: number;
  name: string;
}

const CategorySearch: React.FC<CategorySearchProps> = ({
  placeholder = 'Busca una categoría',
  type = 'search',
  icon = <Iconsearch />,
  value,
  onChange,
  onCategorySelect,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Cargar todas las categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategories();
        const formattedCategories: Category[] = categoryData.data.map((category) => ({
          id: category.id,
          name: category.attributes.name,
        }));
        setCategories(formattedCategories);
        console.log("Categorías cargadas:", formattedCategories); // Verificar datos cargados
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchData();
  }, []);

  // Mostrar resultados al escribir
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setShowResults(true);
  };

  // Seleccionar una categoría y cerrar el dropdown
  const handleResultClick = (id: number, name: string) => {
    onCategorySelect(id, name);
    setShowResults(false);
  };

  return (
    <div className="relative category-search-container">
      <div className="flex flex-row items-center relative">
        {icon && <span className="absolute left-4">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          className="bg-Paper focus:outline-none border rounded-2xl py-2 px-10 w-full transition-all duration-300 ease-in-out border-PrimaryF"
          onFocus={() => setShowResults(true)}
          onChange={handleInputChange}
          value={value}
        />
      </div>

      {showResults && categories.length > 0 && (
        <div className="absolute z-10 bg-white shadow-md rounded-lg p-4 mt-2 max-h-60 overflow-y-auto w-full border border-gray-200">
          {categories
            .filter((category) => category.name.toLowerCase().includes(value.toLowerCase()))
            .map((category) => (
              <div
                key={category.id}
                className="py-2 px-4 mb-2 cursor-pointer rounded-lg hover:bg-Ocean hover:text-white"
                onMouseDown={() => handleResultClick(category.id, category.name)}
              >
                {category.name}
              </div>
            ))}
        </div>
      )}

      {showResults && categories.length === 0 && value !== '' && (
        <p className="text-sm text-gray-500 mt-2">No se encontraron categorías.</p>
      )}
    </div>
  );
};

export default CategorySearch;
