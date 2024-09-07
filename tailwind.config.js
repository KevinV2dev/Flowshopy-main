/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      },
      colors: {
        softgray:{
          light:'#5F5C5D',
          DEFAULT:'#5F5C5D',
          dark:'#5F5C5D'
        },
        Selector:{
          DEFAULT:'#EBEBEB',
        },
        PrimaryF:{
          DEFAULT:'#6335FF',
        },
        Clouds:{
          DEFAULT:'#FFF',
        },
        Ocean:{
          DEFAULT:'#4045FF',
        },
        DarkGray:{
          DEFAULT:'#302E2F',
        },
        DarkOcean:{
          DEFAULT:'#101040',
        },
        Paper:{
          DEFAULT:'#F9F9F9',}
        
      }
    },
  },
  plugins: [],
}

