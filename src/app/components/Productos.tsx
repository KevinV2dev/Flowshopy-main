'use client'
import React,{useEffect, useState} from 'react';
import ExpandibleDiv from './ExpandibleDiv';
import Spainflag from "../assets/Icons/spainflag";
import CopyIcon from '../assets/Icons/CopyIcon';
import { fetchAllProductsFromProjects } from '../apiServices';



interface ProductAttributes {
  name: string;
  url_sale_page: string;
  url_checkout: string;
  url_promote: string;
  cta_header: string;
  cta_footer: string;
  id: number;
  identifier: string;
  createdAt: string;
  niche?: string;
}



interface Post {
  id: number;
  attributes: {
    product_id: {
      data: {
        id: number;
        attributes: ProductAttributes;
      };
    } | null;
  };
}



const Producto: React.FC<{projectId?: number}> = ({ projectId }) => {

  const [products, setProducts] = useState<ProductAttributes[]>([]);

  useEffect(() => {
    // Llamar a la API para obtener los productos de todos los proyectos
    const loadProducts = async () => {
      try {
        const productData = await fetchAllProductsFromProjects();

        setProducts(productData);
      } catch (error) {
        console.error('Error al cargar los productos', error);
      }
    };

    loadProducts();
  }, []);
  
  return (
    <div className="space-y-4"> {/* Agrega espacio entre cada ExpandibleDiv */}
      {products.map((product) => (
        <ExpandibleDiv
          key={product.id} // Usamos el id del producto como clave única
          headerContent={
            <header className='justify-between px-16 flex items-center cursor-pointer'>
              <div className='flex gap-8'>
                <input type="checkbox" name="" id="" />
                <label><Spainflag /></label>
              </div>

              <div>
                <span className='label'>Nombre del Producto</span>
                <h3>{product.name}</h3> 
              </div>

              <div>
                <span className='label'>Nicho</span>
                <h3>{product.niche || 'Sin Nicho Asignado'}</h3> 
              </div>

              <div>
                <span className='label'>Creado</span>
                <h3>{new Date(product.createdAt).toLocaleDateString()}</h3> {/* Fecha de creación */}
              </div>

              <div className='flex-col items-center'>
                <span className='label'>Identificador</span>
                <h3 className='flex gap-[15px]'>{product.identifier} <CopyIcon /> </h3> {/* Identificador */}
              </div>
            </header>
          }
        >
          {/* Contenido expandible del producto */}
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className='bg-Paper rounded-lg p-4'>
              <span className="label">Titular</span>
              <h3 className="title">{product.name}</h3>
            </div>

            <div className='bg-Paper rounded-lg p-4 max-w-[535px]'>
              <span className="label">Pie de página</span>
              <h3 className="title">{product.cta_header}</h3>
            </div> 
             
            <div className='bg-Paper rounded-lg p-4'>
              <span className="label">URL de producto</span>
              <h3 className="title">{product.url_sale_page}</h3>
            </div> 

            <div className='bg-Paper rounded-lg p-4'>
              <span className="label">URL de compra</span>
              <h3 className="title">{product.url_promote}</h3>
            </div> 

            <div className='bg-Paper rounded-lg p-4'>
              <span className="label">URL de presentacion</span>
              <h3 className="title">{product.url_checkout}</h3>
            </div> 

            
            
          </div>
        </ExpandibleDiv>
      ))}
    </div>
  );
};

export default Producto;