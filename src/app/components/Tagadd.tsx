'use client'
import React, {useState} from 'react';
import IconTag from '../assets/Icons/Icontag';

interface TagsaddProps {
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
  }


  const Tagsadd: React.FC<TagsaddProps> = ({ tags, setTags }) => {

    const [inputValue, setinputvalue] = useState<string>('');

    //FUNCION PARA MANEJAR EL EVENTO CUANDO SE PRESIONA UNA TECLA (ENTER)
    const handleKeyEnter = (event:React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue.trim()){
            event.preventDefault();
            setTags([...tags, inputValue.trim()]); // ESTO A;adira la etqieuta
            setinputvalue(''); // Esto va a limpiar el input luego de a;adir la etiqueta
        }
    };

    // FUNCION PARA ELIMINAR UNA ETIQUETA
    const removeTag = (index:number) => {
        setTags(tags.filter((_, i) => i  !== index));
    }

  return (
    <>
        <div className='flex relative items-center'>
        <IconTag className='absolute ml-3'/>
        <input
        type='text'
        placeholder='add'
        className='px-10 py-2 rounded-2xl w-full outline-none bg-Paper'
        value={inputValue}
        onChange={(e) => setinputvalue(e.target.value)}
        onKeyDown={handleKeyEnter}
        />
        </div> 

        <div  className='flex flex-wrap gap-2'>
                {tags.map((tag,index) =>(
                    <div 
                    key={index}
                    className=' flex flex-row rounded-2xl py-2 px-4 bg-Ocean gap-2 justify-center text-center'
                    >
                        <span 
                        className='font-medium text-Clouds'>
                            {tag}
                        </span>

                        <button
                        onClick={() => removeTag(index)}
                        className=' block text-red-600 font-bold hover:text-yellow-950'
                        >
                            x
                        </button>
                    </div>
            
                ))}
        </div>
        

                
    </>
  );
};

export default Tagsadd;