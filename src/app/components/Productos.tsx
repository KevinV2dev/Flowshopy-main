'use client';
import React, { useEffect, useState } from 'react';
import ExpandibleDiv from './ExpandibleDiv';
import Spainflag from "../assets/Icons/spainflag";
import CopyIcon from '../assets/Icons/CopyIcon';
import { fetchAllProductsFromProjects } from '../apiServices';

interface ProductAttributes {
  id: number; // ID está directamente accesible
  name: string;
  url_sale_page: string;
  url_checkout: string;
  url_promote: string;
  cta_header: string;
  cta_footer: string;
  createdAt: string;
  niche: string;
}

const Producto: React.FC = () => {
  const [products, setProducts] = useState<ProductAttributes[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await fetchAllProductsFromProjects();
        setProducts(productData);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ExpandibleDiv
          key={product.id}
          headerContent={
            <header className="justify-between px-16 flex items-center cursor-pointer">
              <div className="flex gap-8">
                <input type="checkbox" name="" id="" />
                <label><Spainflag /></label>
              </div>

              <div>
                <span className="label">Nombre del Producto</span>
                <h3>{product.name}</h3>
              </div>

              <div>
                <span className="label">Nicho</span>
                <h3>{product.niche}</h3>
              </div>

              <div>
                <span className="label">Creado</span>
                <h3>{new Date(product.createdAt).toLocaleDateString()}</h3>
              </div>

              <div className="flex-col items-center">
                <span className="label">Identificador</span>
                <h3 className="flex gap-[15px]">
                  {product.id} <CopyIcon />
                </h3>
              </div>
            </header>
          }
        >
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <div className="bg-Paper rounded-lg p-4">
              <span className="label">URL de Producto</span>
              <h3 className="title">{product.url_sale_page}</h3>
            </div>

            <div className="bg-Paper rounded-lg p-4">
              <span className="label">URL de Compra</span>
              <h3 className="title">{product.url_checkout}</h3>
            </div>

            <div className="bg-Paper rounded-lg p-4">
              <span className="label">URL de Promoción</span>
              <h3 className="title">{product.url_promote}</h3>
            </div>
          </div>
        </ExpandibleDiv>
      ))}
    </div>
  );
};

export default Producto;
