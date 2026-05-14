export function InterventionPills({ options, active, onChange }) {
  return (
    <div className="pill-row" role="tablist" aria-label="Intervention toggles">
      {options.map((option) => {
        const isActive = option === active;

        return (
          <button
            key={option}
            type="button"
            className={`pill ${isActive ? "pill-active" : ""}`}
            onClick={() => onChange(option)}
            role="tab"
            aria-selected={isActive}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
