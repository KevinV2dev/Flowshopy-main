import React from "react";
import Link from "next/link";
import Logo from "../assets/logo";
import LogoConLetras from "../assets/logoConLetras";
import IconProfit from "../assets/Icons/IconProfit";
import IconSettings from "../assets/Icons/IconSettings";
import IconNotify from "../assets/Icons/IconNotify";

const navItems = [
  { name: "Dashboard", href: "#" },
  { name: "Productos", href: "#" },
  { name: "Proyectos", href: "/LayoutApp/Proyectos" },
  { name: "Creador", href: "/LayoutApp/Creador" },
  { name: "Contenido", href: "#" },
  { name: "Cuentas", href: "#" },
];

export default function Navbar() {
  return (
    <nav className=" flex flex-row min-w-full  bg-Clouds   justify-between items-center py-4 px-[50px]">
      {/*NAVBAR LOGOS*/}
      <div className="flex flex-row gap-3 items-center">
        <Logo />
        <LogoConLetras />
      </div>

      {/*NAVBAR ITEMS-LIST*/}
      <div className="flex flex-row text-slate-950 gap-4 cursor-pointer ">
        {navItems.map((item) => (
          <div
            className="py-2 px-8 text-[20px] leading-normal text-softgray hover:bg-Selector rounded-3xl active:bg-PrimaryF active:text-Clouds"
            key={item.name}
          >
            <Link href={item.href}>
              <div className=" ">{item.name} </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="flex flex-row gap-4 items-center">
        <div className="Icon-profit">
          <IconProfit />
        </div>
        <div className="Icon-Settings">
          <IconSettings />
        </div>
        <div className="Icon-Notify">
          <IconNotify />
        </div>
        <div className="w-16 h-16 bg-slate-300 rounded-full"></div>
      </div>
    </nav>
  );
}
