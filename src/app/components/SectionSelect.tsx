interface Option {
  id: number;
  name: string;
}

interface SectionSelectProps {
  label: string;
  value: string;
  options: Option[]; // Cambiamos para manejar id y name
  onChange: (value: string) => void;
}

const SectionSelect: React.FC<SectionSelectProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const selectedOption = options.find((option) => option.id.toString() === value);

  return (
    <div className="rounded-2xl px-4 py-4 bg-Clouds flex flex-col gap-4">
      <label className="text-DarkOcean font-semibold text-xl">{label}</label>

      <input
        type="text"
        value={selectedOption ? selectedOption.name : ''}
        readOnly
        placeholder="¿En qué nicho vamos a vender?"
        className="w-full px-4 py-2 rounded-2xl bg-Paper outline-none"
      />

      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id.toString())}
            className={`px-4 py-1 rounded-2xl ${
              value === option.id.toString()
                ? 'bg-PrimaryF text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionSelect;
