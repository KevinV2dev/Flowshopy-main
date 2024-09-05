import Image from "next/image";
import { Inter, Poppins } from "next/font/google";

const poppins = Poppins({
  weight:'400',
  subsets:["latin"],

})
export default function Login() {
  return (
    <div className="login">
      <form className={`flex flex-col gap-5 text-center items-center ${poppins.className}`}>
        <h1 className="text-zinc-900">Login | FLOWSHOPY</h1>
        <input type="email" name="Hola" id="" placeholder="correo" />
        <input id='btn-login' type="button" value="Login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
      </form>
    </div>
  );
}


