import React, { useState, useEffect } from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';
import { fetchCategories } from '../apiServices';

interface CategorySearchProps {
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategorySelect: (id: number, name: string) => void;
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
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchCategories();
        setCategories(
          categoryData.data.map((category) => ({
            id: category.id,
            name: category.attributes.name,
          }))
        );
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setError('No se pudieron cargar las categorías. Intenta nuevamente.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.category-search-container')) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setShowResults(true);
  };

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
        {value && (
          <button
            type="button"
            className="absolute right-4 text-gray-500 hover:text-gray-700"
            onClick={() => {
              onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
              setShowResults(false);
            }}
          >
            &#10005;
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

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
