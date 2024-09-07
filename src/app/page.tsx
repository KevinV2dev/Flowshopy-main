import Image from "next/image";

import Link from "next/link";



export default function Login() {
  return (
    <div className="login">
      <form className='flex flex-col gap-5 text-center items-center'>
        <h1 className="text-zinc-900 font-bold">Login | FLOWSHOPY</h1>
        <input type="email" name="Hola" id="" placeholder="correo" />
        <Link href='/LayoutApp'>
        
        <input id='btn-login' type="button" value="Login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
        </Link>
      </form>
    </div>
  );
}


