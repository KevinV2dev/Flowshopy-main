import Image from 'next/image';
import React from 'react';
import Profilepic from '../assets/images/Profilepic.png'
import IconLink from '../assets/Icons/IconLink';
import thumbnail from '../assets/images/thumbnail.png'
import ViewerCards from '../components/ViewerCards'
import Sourcecardyt from '../assets/images/Sourcecardyt.png'
const AccountView: React.FC = () => {
const viewerCards = [
        {
          video: thumbnail,
          title: 'Las 5 monjas',
          views: '123k views',
          likes: '456 likes',
        },
        {
            video: Sourcecardyt,
            title: 'Nextjs biblia',
            views: '123k views',
            likes: '456 likes',
          },
          
        
      ];
  return (

    <div className='container-view flex flex-col gap-4 w-[368px] p-4 bg-Clouds rounded-2xl '>
      <div className='Profile-view relative flex flex-col items-center justify-center '>
        <div className=' logout absolute top-0 right-0 cursor-pointer'>
        <IconLink/>
        </div>
        <div className='Profile-pic'>
        <Image
        className='w-[111px] h-[111px] object-cover  rounded-full'
        src={Profilepic}
        alt=''
        width={111}
        height={111}
        />
        </div>
        <span className='text-xl text-DarkGray font-normal'>Sioswel Medina</span>
        <label className='font-normal text-xs text-DarkGray'>@Sioswel</label>
        <button className='rounded-2xl bg-PrimaryF py-2 px-4 text-Clouds font-semibold text-base hover:bg-Ocean active:bg-PrimaryF-PRESSED'>Cambiar de Cuenta</button>
      </div>

        <div className='flex flex-col gap-4'>
        {viewerCards.map((card,index) => (
            <ViewerCards
            key={index}
            video={card.video}
            title={card.title}
            views={card.views}
            likes={card.likes}
            />
        ))}
        </div>




    </div>
  );
};

export default AccountView;