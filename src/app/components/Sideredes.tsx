import React from 'react';
import IconInstagram from '../assets/Icons/IconInstagram';
import IconTiktok from '../assets/Icons/IconTiktok';
import IconFacebook from '../assets/Icons/IconFacebook';
import IconYt from '../assets/Icons/IconYt';
import IconX from '../assets/Icons/IconX';

const redesItems = [
  {name: 'Instagram', icon: <IconInstagram className='side-redes'/> },
  {name: 'Tiktok', icon:<IconTiktok/>},
  {name:'Facebook', icon:<IconFacebook/>},
  {name:'Youtube', icon:<IconYt/>},
  {name:'Twitter', icon:<IconX/>}
]

const sidered: React.FC = () => {
  return (
    <>
    {redesItems.map((item) => (
      <div className='group side-redes flex items-center px-4 py-1  gap-4 hover:bg-Selector cursor-pointer hover:rounded-md active:bg-PrimaryF active:rounded-md'
              key={item.name}>
                {item.icon}
                <span className='side-redes-span group-active:text-Clouds'>{item.name}</span>
          </div>
      
    ))}
      
     
    </>
  );
};

export default sidered;