import { StaticImageData } from 'next/image';
import React from 'react';
import Image from 'next/image';

interface Playlistprops {
  image: StaticImageData;
  title:string;
  lastdate:string;
}

const Playlist: React.FC<Playlistprops> = ({ image,title,lastdate }) => {
  return (
    <div className='flex flex-col p-3 gap-2'>
      <Image
      className='object-cover rounded-md w-[256px] h-[164px]'
      src={image}
      alt={title}
      width={241}
      height={164}
      />
      <div className='font-medium'>{title}</div>
      <div className='font-light'>{lastdate}</div>
    </div>
  );
};

export default Playlist;