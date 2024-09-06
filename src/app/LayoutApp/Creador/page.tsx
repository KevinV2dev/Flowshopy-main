import React from 'react'
import MainLayout from '../../components/MainLayout'
import SideRedes from '../../components/Sideredes'
import CreatorForm from '../../components/CreatorForm';
const Creador:React.FC = () => {
  return (
    <MainLayout>
      <div className='Layout-Creador flex gap-[32px] '>

        <div className='flex flex-col Sidebar-redes mt-[32px] ml-[50px]  justify-center w-[240px] gap-6'>
            <SideRedes/>          
        </div>

        <div className='mt-8 flex flex-col w-full'>
          <CreatorForm/>
        </div>

        <div>
          
        </div>

     </div>
    </MainLayout>
  );
};

export default Creador
