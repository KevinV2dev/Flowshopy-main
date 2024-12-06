import React from 'react';
import IconInstagram from '../assets/Icons/IconInstagram';
import IconTiktok from '../assets/Icons/IconTiktok';
import IconFacebook from '../assets/Icons/IconFacebook';
import IconYt from '../assets/Icons/IconYt';
import IconX from '../assets/Icons/IconX';

interface SideredesProps {
  selectedNetwork: string;
  onNetworkSelect: (network: string) => void;
}

const redesItems = [
  {id: 'instagram', name: 'Instagram ', icon: <IconInstagram className='side-redes'/> },
  {id: 'tiktok', name: 'Tiktok', icon: <IconTiktok/>},
  {id: 'facebook', name: 'Facebook', icon: <IconFacebook/>},
  {id: 'youtube', name: 'Youtube', icon: <IconYt/>},
  {id: 'twitter', name: 'Twitter', icon: <IconX/>}
];

const Sidered: React.FC<SideredesProps> = ({ selectedNetwork, onNetworkSelect }) => {
  return (
    <>
      {redesItems.map((item) => {
        const isSelected = selectedNetwork === item.id.toLowerCase();
        return (
          <div 
            className={`group side-redes flex items-center px-4 py-1 gap-4 cursor-pointer rounded-md
              ${isSelected ? 'bg-PrimaryF text-Clouds [&_*]:text-Clouds [&_*]:fill-Clouds' : 'hover:bg-Selector'}`}
            key={item.name}
            onClick={() => onNetworkSelect(item.id.toLowerCase())}
          >
            {item.icon}
            <span className="side-redes-span">
              {item.name}
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Sidered;