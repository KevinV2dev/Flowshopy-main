'use client'
import React from 'react';
import Biginsta from '../assets/Icons/BigInsta';
import Bigtiktok from '../assets/Icons/BigTiktok';
import BigX from '../assets/Icons/BigX';
import Bigyt from '../assets/Icons/Bigyt';
import BigFb from '../assets/Icons/Bigfb';
interface Bigredes {
  
}

const redeslist = [
    {icon:Biginsta , red:'@Flowshopy', label:'123 Seguidores' },
    {icon:Bigtiktok , red:'@Flowshopy', label:'123 Seguidores' },
    {icon:BigFb , red:'@Flowshopy', label:'230 Seguidores' },
    {icon:Bigyt , red:'@Flowshopy', label:'1M' },
    {icon:BigX , red:'@Flowshopy', label:'540K' },
]



const Bigredes: React.FC = () => {
  return (
    <div className='flex flex-col p-4 justify-between bg-Clouds rounded-2xl'>
         {redeslist.map((item,index) => (
            <div className='flex flex-col py-4 px-2 items-center gap-1'
            key={index}>
            <div><item.icon/></div>
            <label className='text-softgray text-base'>{item.red}</label>
            <label className='text-Ocean text-xs'>{item.label}</label>
            </div>
         ))}
      <div>
        
      </div>

      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Bigredes;