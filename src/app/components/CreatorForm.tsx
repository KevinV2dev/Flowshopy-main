import React from "react";
import Image from "next/image";
import Sourcecardyt from "../assets/images/Sourcecardyt.png";
import sourcecardshort from "../assets/images/sourcecardshort.png";
import Iconsearch from "../assets/Icons/Iconsearch";

const CreatorForm: React.FC = () => {
  const cardItems = [
    { image: Sourcecardyt, text: "Video" },
    { image: sourcecardshort, text: "Short" },
  ];

  return (
    <>
      <div className="rounded-2xl bg-Clouds p-4 ">
        <div className="flex flex-col gap-2 ">
          <span className="text-xl font-semibold">Crearemos...</span>
          <div className="flex gap-4">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-2xl active:bg-Ocean cursor-pointer hover:bg-Selector"
              >
                <Image
                  src={item.image}
                  alt={item.text}
                  width={296}
                  height={190}
                  className="rounded-lg"
                />
                <div>
                  <span>{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="Title-awesome bg-Clouds flex flex-col p-4 gap-2 rounded-2xl">
        <span className="text-xl font-semibold" >¡Escribe un <span className="text-PrimaryF">título</span> increíble!</span>
        <div>
          <input
          type="text"
          name="title"
          placeholder="Escribe aqui"
          className="border-none focus:outline-none bg-Paper rounded-2xl px-3 py-2 items-center w-full"
          />
        </div>
      </div>

      <div className="link-Project bg-Clouds flex flex-col p-8 rounded-2xl gap-2 ">
            <span className="text-xl font-semibold">Enlaza tu post a un <span className="text-PrimaryF">Proyecto:</span> </span>
              <div className="flex flex-row items-center relative ">
                <Iconsearch className="absolute left-4"/>
                  <input
                  type="search"
                  name="projects"
                  placeholder="Busca Aqui"
                  className="border-none focus:outline-none bg-Paper rounded-2xl px-10 py-2  items-center w-full"
                  />
              </div>

              <div className="flex flex-row gap-4 mt-2">
                  <label className="py-2 px-4 bg-PrimaryF rounded-2xl text-Clouds">Biblia Descomplicada</label>
                  <label className="py-2 px-4 bg-PrimaryF rounded-2xl text-Clouds">Biblia Descomplicada</label>
              </div>
      </div>

    </>
  );
};

export default CreatorForm;
