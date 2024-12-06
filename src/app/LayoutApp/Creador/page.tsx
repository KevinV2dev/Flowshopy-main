'use client'
import React, { useState } from "react";
import MainLayout from "../../components/MainLayout";
import SideRedes from "../../components/Sideredes";
import CreatorForm from "../../components/CreatorForm";
import AccountView from "@/app/components/AccountViewCreator";
import ComingSoon from "@/app/components/ComingSoon";
import { useSmoothScroll } from "@/app/hooks/useSmoothScroll";

const Creador: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState("youtube");
  const { contentRef, scrollStyle } = useSmoothScroll({
    scrollMultiplier: 5.0
  });

  const renderContent = () => {
    switch (selectedNetwork) {
      case "youtube":
        return <CreatorForm />;
      default:
        return <ComingSoon />;
    }
  };

  return (
    <MainLayout>
      <div className="Layout-Creador flex gap-[32px] relative overflow-y-auto">
        <div className="flex flex-col Sidebar-redes mt-[32px] ml-[50px] w-[240px] gap-6 sticky top-0">
          <SideRedes 
            selectedNetwork={selectedNetwork}
            onNetworkSelect={setSelectedNetwork}
          />
        </div>

        <div 
          ref={contentRef}
          className="mt-8 flex flex-col gap-4 flex-1 h-[calc(100vh-130px)] hide-scrollbar"
          style={scrollStyle}
        >
          {renderContent()}
        </div>

        <div className="mt-8 mr-[50px] sticky top-0">
          <AccountView />
        </div>
      </div>
    </MainLayout>
  );
};

export default Creador;
