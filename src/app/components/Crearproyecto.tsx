import React,{useState} from 'react';
import Image from 'next/image';
import CheckIcon from '../assets/Icons/Checkicon';
import InputSearch from './InputSearch';
import Iconsearch from '../assets/Icons/Iconsearch';
import IconTag from '../assets/Icons/Icontag';
import Link from 'next/link';
interface Props {
  onCancelar: () => void;
}
  

const Crearproyecto: React.FC<Props> = ({ onCancelar }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchValue2, setSearchValue2] = useState('');


  return (
    <div className='flex flex-row gap-4 h-full '>
      <section className='h-full flex-1'>
        <div className='flex flex-col gap-4'>
            <div className='bg-Clouds flex flex-col gap-4 p-4 rounded-2xl'>  
              <span className='text-DarkOcean text-xl font-semibold'>
                Elige un titulo para tu 
                  <span className=' inline-flex px-1'>
                    <span className='text-PrimaryF'>proyecto:</span>
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
                      <span className='text-PrimaryF'>pruducto:</span>
                      <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> 
                </span> 
              </span>
                  <InputSearch
              placeholder='Busca un producto'
              type='search'
              icon={<Iconsearch />}
              value={searchValue}
              onChange={(newValue) => setSearchValue2(newValue)} results={[]} onResultSelect={function (id: number, name: string): void {
                throw new Error('Function not implemented.');
              } }                  />
                <div className='flex gap-4 '>
                <label className='rounded-2xl bg-PrimaryF text-Clouds py-2 px-4'> Producto </label>
                <label className='rounded-2xl bg-PrimaryF text-Clouds py-2 px-4'> Producto </label>
                </div>
            </div>

            <div className='bg-Clouds flex flex-col gap-4 p-4 rounded-2xl'>
            <span className='font-semibold text-xl'> Elige un
                <span className=' inline-flex px-1'>
                      <span className='text-PrimaryF'>idioma</span>
                      <span className='px-1'>para nuestro proyecto :</span>
                      <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> 
                </span> 
              </span>
              <InputSearch
              placeholder='Selecciona uno o varios idiomas'
              type='search'
              icon={<IconTag />}
              value={searchValue2}
              onChange={(newValue) => setSearchValue2(newValue)} results={[]} onResultSelect={function (id: number, name: string): void {
                throw new Error('Funcion no implementada');
              } }    />

               <div className='flex gap-4 '>
                <label className='rounded-2xl bg-Selector text-DarkGray py-1 px-4'> Inglés </label>
                <label className='rounded-2xl bg-Selector text-DarkGray py-1 px-4'> Español </label>
                
                </div>
            </div>

              <div className='flex flex-col gap-4 '>
                <button  className='bg-PrimaryF rounded-xl py-3 text-Clouds font-semibold text-xl'>Crear Proyecto</button>
                <button onClick={onCancelar} className='bg-Selector rounded-xl py-3 text-DarkGray font-semibold text-xl w-full'>Cancelar</button>
                
              </div>


        </div>

        </section>


      <div className='bg-Clouds rounded-2xl h-full  w-[400px] py-6 px-4'>
        <div className=' flex flex-col gap-8'>
          <div className=''>
          <h3 className=' font-semibold text-DarkOcean text-xl'>¿Qué es un proyecto?</h3>
          <p className='text-DarkGray font-normal text-[14px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
          </div>
          <div className=''>
          <h3 className=' font-semibold text-DarkOcean text-xl'>¿Titulo?</h3>
          <p className='text-DarkGray font-normal text-[14px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
          </div>
          <div className=''>
          <h3 className=' font-semibold text-DarkOcean text-xl'>¿Productos?</h3>
          <p className='text-DarkGray font-normal text-[14px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
          </div>
          <div className=''>
          <h3 className=' font-semibold text-DarkOcean text-xl'>¿Idioma?</h3>
          <p className='text-DarkGray font-normal text-[14px]'>Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris.</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Crearproyecto;