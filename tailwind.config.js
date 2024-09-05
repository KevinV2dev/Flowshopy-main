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
        }
      }
    },
  },
  plugins: [],
}

