export function ExperimentPanel({ intervention, details }) {
  return (
    <aside className="panel experiment-panel">
      <div className="panel-heading">
        <p className="eyebrow">Experiment Details</p>
        <h2>{intervention}</h2>
      </div>

      <div className="metric-grid">
        <div className="metric-card">
          <span>Primary metric</span>
          <strong>{details.primaryMetric}</strong>
        </div>
        <div className="metric-card">
          <span>Expected movement</span>
          <strong>{details.expectedMovement}</strong>
        </div>
        <div className="metric-card">
          <span>Guardrail</span>
          <strong>{details.guardrail}</strong>
        </div>
        <div className="metric-card metric-card-wide">
          <span>Testing logic</span>
          <strong>{details.testingLogic}</strong>
        </div>
      </div>
    </aside>
  );
}
