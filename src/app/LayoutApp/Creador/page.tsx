import React from 'react'
import MainLayout from '../../components/MainLayout'
import IconInstagram from '@/app/assets/Icons/iconInstagram';
import SideRedes from '../../components/Sideredes'
const Creador:React.FC = () => {
  return (
    <MainLayout>
      <div className='Layout-Creador flex gap-[32px] '>

        <div className='flex flex-col Sidebar-redes mt-[32px] ml-[50px]  justify-center w-[240px] gap-6'>
            <SideRedes/>          
        </div>

        <div>
          Creador form
        </div>

        <div>
          account View
        </div>

     </div>
    </MainLayout>
  );
};

export default Creador
