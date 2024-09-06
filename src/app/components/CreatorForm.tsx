import React from 'react';
import Image from 'next/image';

import Sourcecardyt from '../assets/images/Sourcecardyt.png';
import sourcecardshort from '../assets/images/sourcecardshort.png';

const CreatorForm: React.FC = () => {
  const cardItems = [
    { image: Sourcecardyt, text: 'Video' },
    { image: sourcecardshort, text: 'Short' },
  ];

  return (
    <div className='rounded-2xl bg-Clouds p-4 '>
      <div className='flex flex-col gap-2 '>
        <span className='py-2 px-1 text-xl font-semibold'>Crearemos...</span>
        <div className='flex gap-4'>
          {cardItems.map((item, index) => (
            <div key={index} className='p-3 rounded-2xl active:bg-Ocean cursor-pointer hover:bg-Selector'>
              <Image 
                src={item.image} 
                alt={item.text} 
                width={296}
                height={190}
                className='rounded-lg mb-2'
              />
              <div>
              <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorForm;
