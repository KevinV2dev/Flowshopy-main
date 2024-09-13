'use client'
import React,{ useState} from 'react';
import Spainflag from '../assets/Icons/spainflag';
interface Props {
  
}

const Contenidolist: React.FC = () => {
  return (
    <div className='flex flex-col py-11 px-8  rounded-2xl bg-Clouds w-full'>
       <div className='flex flex-row justify-between items-center'>
        <div className='flex gap-4 items-center justify-center'>
          <input
          type='checkbox'
          id='check'
          className="w-5 h-5 bg-gray-100 border-PrimaryF rounded-md focus:ring-PrimaryF focus:ring-2"
          />
          <label htmlFor='check'><Spainflag/></label>
        </div>
          <div className='flex flex-col'>
            <span className='text-sm text-softgray'>lorem impsun</span>
            <label className='text-lg'>Lorem impsun</label>

          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-softgray'>lorem impsun</span>
            <label className='text-lg'>Lorem impsun</label>

          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-softgray'>lorem impsun</span>
            <label className='text-lg'>Lorem impsun</label>
          </div>
          <div className='flex flex-col'>
            <span className='text-sm text-softgray'>Indentificador</span>
            <label className='text-lg'>ASasdXA812NJKAasdq34sadfjSD57123</label>
          </div>
       </div>
    </div>
  );
};

export default Contenidolist;