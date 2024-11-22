'use client';
import React, { useState, useEffect } from 'react';
import MainLayout from "../../components/MainLayout";
import Bigredes from '@/app/components/Bigredes-side';
import CrudProductos from '@/app/components/CrudProductos';
import Crearproducto from '@/app/components/CrearProducto';
import Producto from '@/app/components/Productos';
import { fetchAllProductsFromProjects, deleteProduct } from '@/app/apiServices';

const Productos: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<'ver' | 'crear' | 'editar' | 'eliminar'>('ver');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  // Cargar productos al montar
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

  // Manejar selección de productos
  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId) // Desmarcar
        : [...prevSelected, productId] // Marcar
    );
  };

  // Manejar eliminación de productos seleccionados
  const handleDeleteSelected = async () => {
    try {
      // Eliminar productos seleccionados uno por uno
      for (const productId of selectedProducts) {
        await deleteProduct(productId);
      }

      // Actualizar la lista de productos para eliminar los que fueron borrados
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );
      setProducts(updatedProducts);

      // Limpiar selección
      setSelectedProducts([]);
      alert('Productos eliminados correctamente.');
    } catch (error) {
      console.error('Error al eliminar productos:', error);
      alert('Hubo un error al intentar eliminar los productos.');
    }
  };

  return (
    <MainLayout>
      <section className="flex flex-row px-[50px] pt-9 relative gap-4">
        <div className="w-[241px] sticky">
          <Bigredes />
        </div>

        <div className="grow">
          {selectedAction === 'ver' ? (
            <Producto
              products={products} // Pasamos la lista actualizada
              onDeleteSelected={handleDeleteSelected}
              onCheckboxChange={handleCheckboxChange}
              selectedProducts={selectedProducts}
            />
          ) : selectedAction === 'crear' ? (
            <Crearproducto onCancelar={() => setSelectedAction('ver')} />
          ) : selectedAction === 'editar' ? (
            <Producto
              products={products} // Pasamos la lista actualizada
              onDeleteSelected={handleDeleteSelected}
              onCheckboxChange={handleCheckboxChange}
              selectedProducts={selectedProducts}
            />
          ) : (
            <div>Componente para eliminar productos</div>
          )}
        </div>

        {selectedAction !== 'crear' && (
          <div className="w-[160px]">
            <CrudProductos
              onCrear={() => setSelectedAction('crear')}
              onEditar={() => setSelectedAction('editar')}
              onEliminar={handleDeleteSelected}
            />
          </div>
        )}
      </section>
    </MainLayout>
  );
};

export default Productos;
