interface SectionInputProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
  }
  
  const SectionInput: React.FC<SectionInputProps> = ({
    label,
    placeholder,
    value,
    onChange,
  }) => {
    return (
      <div className="rounded-2xl px-4 py-4 bg-Clouds flex flex-col gap-4">
        <label className="text-DarkOcean font-semibold text-xl">{label}</label>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 rounded-2xl bg-Paper outline-none"
        />
      </div>
    );
  };
  
  export default SectionInput;
  