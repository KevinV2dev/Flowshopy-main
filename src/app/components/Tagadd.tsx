import React from 'react';
import IconTag from '../assets/Icons/Icontag';
interface Props {
  
}

const Props: React.FC<Props> = ({  }) => {
  return (
    <>
        <div className='flex relative items-center'>
        <IconTag className='absolute ml-3'/>
        <input
        type='text'
        placeholder='add'
        className='px-10 py-2 rounded-2xl w-full outline-none bg-Paper'
        />
        </div> 
    </>
  );
};

export default Props;