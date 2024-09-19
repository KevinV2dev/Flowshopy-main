import { useState } from 'react';

const CustomCheckbox: React.FC = () => {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <label className="">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span className="relative w-12 h-12 flex items-center justify-center">
        {/* Círculo exterior con borde */}
        <span
          className={`block w-12 h-12 rounded-full border-4 border-PrimaryF transition-all duration-300 ${
            checked ? 'bg-white' : 'none'
          }`}
        />
        {/* Círculo interior más pequeño que se rellena completamente */}
        {checked && (
          <span
            className="absolute w-8 h-8 rounded-full bg-PrimaryF transition-all duration-300"
          />
        )}
      </span>
    </label>
  );
};

export default CustomCheckbox;
