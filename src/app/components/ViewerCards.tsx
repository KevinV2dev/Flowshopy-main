import { StaticImageData } from 'next/image';
import React from 'react';
import Image from 'next/image';

interface ViewerProps {
    video: StaticImageData;
    title:string;
    views:string;
    likes:string; 
}


const PropsViewer: React.FC<ViewerProps> = ({ video,title,views,likes }) => {
    
  return (
    <div className='flex flex-col items-center'>
      <div className=''>
        <Image
        className='object-cover rounded-md'
         src={video}
         alt={title}         
         />
         <div className='text-DarkOcean'>{title}</div>
         <div>{views}</div>
         <div>{likes}</div>
      </div>
    </div>
  );
};

export default PropsViewer;