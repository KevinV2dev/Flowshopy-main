'use client';
import React, { useEffect, useState } from 'react';
import SectionInput from './SectionInput';
import SectionSelect from './SectionSelect';
import TextProducto from './TextProducto';
import { createProduct, fetchNiches } from '../apiServices';

interface Productoprops {
  onCancelar: () => void;
}

const Crearproducto: React.FC<Productoprops> = ({ onCancelar }) => {
  const [formData, setFormData] = useState({
    name: '',
    niche_id: '', // Almacena el ID del nicho seleccionado
    cta_header: '',
    cta_footer: '',
    url_sale_page: '',
    url_checkout: '',
    url_promote: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [niches, setNiches] = useState<{ id: number; name: string }[]>([]);
  const [isLoadingNiches, setIsLoadingNiches] = useState(false);

  // Cargar nichos al montar el componente
  useEffect(() => {
    const loadNiches = async () => {
      setIsLoadingNiches(true);
      try {
        const fetchedNiches = await fetchNiches();
        setNiches(fetchedNiches);
      } catch (error) {
        console.error('Error al cargar los nichos:', error);
      } finally {
        setIsLoadingNiches(false);
      }
    };

    loadNiches();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const validateForm = () => {
    const { name, niche_id, cta_header, url_sale_page, url_checkout } = formData;
    if (!name || !niche_id || !cta_header || !url_sale_page || !url_checkout) {
      alert('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const productPayload = {
        name: formData.name,
        niche_id: parseInt(formData.niche_id), // Relación con el ID del nicho
        cta_header: formData.cta_header,
        cta_footer: formData.cta_footer,
        url_sale_page: formData.url_sale_page,
        url_checkout: formData.url_checkout,
        url_promote: formData.url_promote,
      };

      console.log('Payload enviado:', productPayload);

      const productResponse = await createProduct(productPayload);
      const productId = productResponse.data.id;

      console.log('Producto creado exitosamente con ID:', productId);
      alert('Producto creado correctamente.');

      setFormData({
        name: '',
        niche_id: '',
        cta_header: '',
        cta_footer: '',
        url_sale_page: '',
        url_checkout: '',
        url_promote: '',
      });
    } catch (error) {
      console.error('Error en la creación del producto:', error);
      alert('Ocurrió un error al crear el producto. Por favor, revisa los datos e intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex gap-4">
      <section className="gap-4 flex flex-col grow">
        {/* Nombre del producto */}
        <SectionInput
          label="Nombre del producto:"
          placeholder="Introduce el nombre del producto"
          value={formData.name}
          onChange={(value) => handleInputChange('name', value)}
        />

        {/* Nicho */}
        <SectionSelect
          label="Elige un nicho para tu producto:"
          options={niches.map((niche) => ({ id: niche.id, name: niche.name }))}
          value={formData.niche_id}
          onChange={(value) => handleInputChange('niche_id', value)}
        />

        {/* CTA Header */}
        <SectionInput
          label="Titular del producto (CTA header):"
          placeholder="Escribe un titular atractivo"
          value={formData.cta_header}
          onChange={(value) => handleInputChange('cta_header', value)}
        />

        {/* CTA Footer */}
        <SectionInput
          label="Pie de página (CTA Footer):"
          placeholder="Un mensaje final llamativo"
          value={formData.cta_footer}
          onChange={(value) => handleInputChange('cta_footer', value)}
        />

        {/* Sale URL */}
        <SectionInput
          label="URL de venta:"
          placeholder="https://www.tu-sitio-venta.com"
          value={formData.url_sale_page}
          onChange={(value) => handleInputChange('url_sale_page', value)}
        />

        {/* Checkout URL */}
        <SectionInput
          label="URL de compra (Checkout):"
          placeholder="https://www.tu-sitio-compra.com"
          value={formData.url_checkout}
          onChange={(value) => handleInputChange('url_checkout', value)}
        />

        {/* Promotion URL */}
        <SectionInput
          label="URL de promoción:"
          placeholder="https://www.tu-sitio-promocion.com"
          value={formData.url_promote}
          onChange={(value) => handleInputChange('url_promote', value)}
        />

        {/* Botón de enviar */}
        <button
          onClick={handleSubmit}
          className="bg-PrimaryF rounded-2xl py-3 justify-center items-center text-Clouds font-semibold text-xl w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creando producto...' : 'Registrar producto'}
        </button>

        {/* Botón de cancelar */}
        <button
          onClick={onCancelar}
          className="bg-Selector rounded-2xl py-3 justify-center items-center text-DarkGray font-semibold text-xl w-full"
        >
          Cancelar
        </button>
      </section>

      <TextProducto />
    </main>
  );
};

export default Crearproducto;
