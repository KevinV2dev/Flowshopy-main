'use client'
import React,{useState} from 'react';
import SectionInput from './SectionInput';
import SectionSelect from './SectionSelect';
import Crearproyecto from './Crearproyecto';
import ProjectSelect from './ProjectSelect';
import TextProducto from './TextProducto';

interface Productoprops {
    onCancelar: () => void;
}

const Crearproducto: React.FC<Productoprops> = ({ onCancelar }) => {

  const [formData, setFormData] = useState({
    productName: '',
    niche: '',
    headline: '',
    footer: '',
    saleUrl: '',
    checkoutUrl: '',
    promotionUrl: '',
    project: '',
  });

  // Maneja los cambios en cada campo del formulario
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // function handleSubmit(event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
  //   throw new Error('Function not implemented.');
  // }

  // Maneja el envío del formulario
  // const handleSubmit = async () => {
  //   try {
  //     console.log('Datos enviados:', formData); // Verifica los datos en la consola
  //     await sendDataToAPI(formData); // Llama a la API
  //     alert('Producto creado correctamente');
  //   } catch (error) {
  //     console.error('Error al enviar datos:', error);
  //     alert('Error al crear el producto');
  //   }
  // };


  return (
<main className='flex gap-4'>
  
    <section className='gap-4 flex flex-col grow'>
      {/* Nombre del producto */}
      <SectionInput
        label="Nombre del Producto:"
        placeholder="Introduce el nombre del producto"
        value={formData.productName}
        onChange={(value) => handleInputChange('productName', value)}
      />

      {/* Nicho */}
      <SectionSelect
        label="Elige un nicho para tu producto:"
        options={['Derecho', 'Informática', 'Salud', 'Fitness']}
        value={formData.niche}
        onChange={(value) => handleInputChange('niche', value)}
      />

      {/* Headline */}
      <SectionInput
        label="Titular del producto (Headline):"
        placeholder="Escribe un titular atractivo"
        value={formData.headline}
        onChange={(value) => handleInputChange('headline', value)}
      />

      {/* Footer */}
      <SectionInput
        label="Pie de página (Footer):"
        placeholder="Un mensaje final llamativo"
        value={formData.footer}
        onChange={(value) => handleInputChange('footer', value)}
      />

      {/* Sale URL */}
      <SectionInput
        label="URL de Venta:"
        placeholder="https://www.tu-sitio-venta.com"
        value={formData.saleUrl}
        onChange={(value) => handleInputChange('saleUrl', value)}
      />

      {/* Checkout URL */}
      <SectionInput
        label="URL de Compra (Checkout):"
        placeholder="https://www.tu-sitio-compra.com"
        value={formData.checkoutUrl}
        onChange={(value) => handleInputChange('checkoutUrl', value)}
      />

      {/* Promotion URL */}
      <SectionInput
        label="URL de Promoción:"
        placeholder="https://www.tu-sitio-promocion.com"
        value={formData.promotionUrl}
        onChange={(value) => handleInputChange('promotionUrl', value)}
      />

      {/* Proyecto */}
      <ProjectSelect
        label="Selecciona el proyecto asociado:"
        value={formData.project}
        options={['Proyecto A', 'Proyecto B', 'Proyecto C']}
        onChange={(value) => handleInputChange('project', value)}
      />

      <button
        
        className='bg-PrimaryF rounded-2xl py-3 justify-center items-center text-Clouds font-semibold  text-xl w-full'
      >
        Registrar producto
      </button>

      
      <button 
      onClick={onCancelar} 
      className='bg-Selector rounded-2xl py-3 justify-center items-center text-DarkGray font-semibold  text-xl w-full'>Cancelar</button>
    
    
    </section>

    <TextProducto/>
    
    </main>
    
  );
};

export default Crearproducto;