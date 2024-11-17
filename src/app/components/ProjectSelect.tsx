interface ProjectSelectProps {
    label: string; // Etiqueta para el selector
    value: string; // Proyecto seleccionado
    options: string[]; // Lista de proyectos disponibles
    onChange: (value: string) => void; // Función para manejar el cambio
  }
  
  const ProjectSelect: React.FC<ProjectSelectProps> = ({
    label,
    value,
    options,
    onChange,
  }) => {
    return (
      <div className="rounded-2xl px-4 py-4 bg-Clouds flex flex-col gap-4">
        <label className="text-DarkOcean font-semibold text-xl">{label}</label>
  
        {/* Input que muestra el proyecto seleccionado */}
        <input
          type="text"
          value={value}
          readOnly
          placeholder="Selecciona un proyecto asociado"
          className="w-full px-4 py-2 rounded-2xl bg-Paper outline-none"
        />
  
        {/* Botones para seleccionar el proyecto */}
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)} // Actualiza el proyecto seleccionado
              className={`px-4 py-1 rounded-2xl ${
                value === option
                  ? 'bg-PrimaryF text- white' // Estilo cuando está seleccionado
                  : 'bg-gray-200 text-gray-700' // Estilo cuando no está seleccionado
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProjectSelect;
  