import React from 'react';
import Iconsearch from '../assets/Icons/Iconsearch';


const InputSearch: React.FC = () => {
  return (
    <div>
      <div className="flex flex-row items-center relative ">
                <Iconsearch className="absolute left-4"/>
                  <input
                  type="search"
                  name="projects"
                  placeholder="Busca Aqui"
                  className="border-none focus:outline-none bg-Paper rounded-2xl px-10 py-2  items-center w-full"
                  />
              </div>
    </div>
  );
};

export default InputSearch;