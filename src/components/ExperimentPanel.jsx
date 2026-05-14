export function ExperimentPanel({ intervention, details, roomState }) {
  if (intervention === "Baseline") {
    return (
      <aside className="panel experiment-panel">
        <div className="panel-heading">
          <h2>Baseline room</h2>
        </div>

        <p className="baseline-copy">
          No intervention is active. This state shows the default live-room
          experience: viewers are present, but some remain passive before placing
          a first bid.
        </p>

        <div className="metric-grid">
          <div className="metric-card">
            <span>Viewers in room</span>
            <strong>{roomState.viewers}</strong>
          </div>
          <div className="metric-card">
            <span>Active bidders</span>
            <strong>{roomState.activeBidders}</strong>
          </div>
          <div className="metric-card">
            <span>Current bid</span>
            <strong>${roomState.currentBid}</strong>
          </div>
        </div>
      </aside>
    );
  }

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
