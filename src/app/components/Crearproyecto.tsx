import React from 'react';
import Image from 'next/image';
import CheckIcon from '../assets/Icons/Checkicon';
interface Props {
  
}

const Crearproyecto: React.FC<Props> = ({  }) => {
  return (
    <div className='flex flex-row gap-4 h-full '>
      <section className='h-full flex-1'>
        <div className='flex flex-col gap-4'>
            <div className='bg-Clouds flex flex-col gap-4 p-4 rounded-2xl'>  
              <span className='text-DarkOcean text-xl font-semibold'>
                Elige un titulo para tu 
                <span className=' inline-flex px-1'>
                  <span className='text-PrimaryF'>Proyectos:</span>
                  <Image src='/proyectocheck.svg' className='ml-[10px]' width={24} height={24} alt="flag"/> </span> </span>
              <input
              type='text'
              placeholder='Este es un titulo increible'
              className='bg-Paper rounded-2xl py-2 px-4  outline-none '
              />
            </div>
            <div className='bg-Clouds'> Hola 2 </div>
        </div>

        </section>


      <div className='bg-Clouds rounded-2xl h-full  w-[400px]'> Hola 2</div>
    </div>
  );
};

export default Crearproyecto;