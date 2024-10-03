import React,{useState} from 'react';
import Image from 'next/image';
import CheckIcon from '../assets/Icons/Checkicon';
import InputSearch from './InputSearch';
import Iconsearch from '../assets/Icons/Iconsearch';
interface Props {
  
}

  

const Crearproyecto: React.FC<Props> = ({  }) => {
  const [searchValue, setSearchValue] = useState('');


  return (
    <div className='flex flex-row gap-4 h-full '>
      <section className='h-full flex-1'>
        <div className='flex flex-col gap-4'>
            <div className='bg-Clouds flex flex-col gap-4 p-4 rounded-2xl'>  
              <span className='text-DarkOcean text-xl font-semibold'>
                Elige un titulo para tu 
                  <span className=' inline-flex px-1'>
                    <span className='text-PrimaryF'>Proyecto:</span>
                    <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> 
                  </span> 
               </span>
              <input
              type='text'
              placeholder='Este es un titulo increible'
              className='bg-Paper rounded-2xl py-2 px-4  outline-none '
              />
            </div>

            <div className='bg-Clouds flex flex-col gap-4 p-4 rounded-2xl'> 
              <span className='font-semibold text-xl'> Enlaza tu post a un
                <span className=' inline-flex px-1'>
                      <span className='text-PrimaryF'>Pruducto:</span>
                      <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> 
                </span> 
              </span>
                  <InputSearch
                  placeholder='Busca un Producto'
                  type='search'
                  icon={<Iconsearch/>}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  />
                <div className='flex gap-4 '>
                <label className='rounded-2xl bg-PrimaryF text-Clouds py-2 px-4'> Producto </label>
                <label className='rounded-2xl bg-PrimaryF text-Clouds py-2 px-4'> Producto </label>
                </div>
            </div>

            <div className='flex flex-col rounded-2xl bg-Clouds'>
            <span className='font-semibold text-xl'> Elige un
                <span className=' inline-flex px-1'>
                      <span className='text-PrimaryF'>Idioma</span>
                      <span className='px-1'>para nuestro proyecto :</span>
                      <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> 
                </span> 
              </span>
            </div>




        </div>

        </section>


      <div className='bg-Clouds rounded-2xl h-full  w-[400px]'> Hola 2</div>
    </div>
  );
};

export default Crearproyecto;