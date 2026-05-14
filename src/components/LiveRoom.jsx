const interventionProfiles = {
  Baseline: {
    bidJump: [0, 0, 5, 0, 10],
    viewerBand: [118, 132],
    bidderBand: [4, 7],
  },
  "Trust Cue": {
    bidJump: [0, 5, 10, 10, 15],
    viewerBand: [120, 136],
    bidderBand: [6, 9],
  },
  "First-Bid Nudge": {
    bidJump: [5, 10, 10, 15, 20],
    viewerBand: [121, 137],
    bidderBand: [7, 10],
  },
  "Urgency Cue": {
    bidJump: [10, 10, 15, 20, 20],
    viewerBand: [123, 140],
    bidderBand: [8, 12],
  },
  "Seller Prompt": {
    bidJump: [0, 5, 10, 15, 15],
    viewerBand: [120, 138],
    bidderBand: [6, 10],
  },
};

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function LiveRoom({
  intervention,
  state,
  roomMessage,
  supportCard,
  onBid,
}) {
  const profile = interventionProfiles[intervention];
  const urgencyMode = intervention === "Urgency Cue";
  const sellerPromptMode = intervention === "Seller Prompt";

  return (
    <section className="live-room-shell">
      <div className="panel live-room">
        <div className="room-topbar">
          <div className="live-badge">
            <span className="live-dot" />
            LIVE AUCTION
          </div>
          <div className="topbar-copy">
            <span>Mock product room</span>
            <span>Illustrative metrics only</span>
          </div>
        </div>

        <div className="room-stage">
          <div className="room-visual">
            <div className="backdrop-glow" />
            <div className="product-card">
              <div className="seller-chip">ArchiveDrop</div>
              <div className="jacket-art">
                <div className="jacket-core" />
                <div className="jacket-stripe jacket-stripe-left" />
                <div className="jacket-stripe jacket-stripe-right" />
              </div>
              <div className="product-meta">
                <p className="label">Live lot</p>
                <h2>Vintage Racing Jacket</h2>
                <p>{roomMessage}</p>
              </div>
            </div>
          </div>

          <div className="room-sidebar">
            <div className="stats-grid">
              <div className="stat-card bid-card">
                <span>Current bid</span>
                <strong>${state.currentBid}</strong>
              </div>
              <div className={`stat-card ${urgencyMode ? "stat-card-hot" : ""}`}>
                <span>Time left</span>
                <strong>{formatTime(state.timeLeft)}</strong>
              </div>
              <div className="stat-card">
                <span>Viewers</span>
                <strong>{clamp(state.viewers, profile.viewerBand[0], profile.viewerBand[1])}</strong>
              </div>
              <div className="stat-card">
                <span>Active bidders</span>
                <strong>{clamp(state.activeBidders, profile.bidderBand[0], profile.bidderBand[1])}</strong>
              </div>
            </div>

            {supportCard ? (
              <div className={`support-card support-${state.accent}`}>
                <p>{supportCard}</p>
              </div>
            ) : null}

            <div className="cta-area">
              {urgencyMode ? (
                <p className="cta-caption">
                  Final moments. {Math.max(12, state.viewers - 111)} viewers are viewing this item.
                </p>
              ) : null}

              <button type="button" className="bid-button" onClick={onBid}>
                Place Bid +$10
              </button>

              <p className="cta-subtext">
                Seller: ArchiveDrop · Fast-moving archive outerwear drop
              </p>
            </div>

            <div className="feed-card">
              <div className="feed-header">
                <span>Room activity</span>
                <span>{state.feed.length} live updates</span>
              </div>
              <div className="feed-list">
                {state.feed.map((item) => (
                  <div className="feed-item" key={item.id}>
                    <span className="feed-time">{item.time}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {sellerPromptMode ? (
          <div className="seller-question">
            <span>Seller prompt</span>
            <strong>Want me to show the stitching up close?</strong>
          </div>
        ) : null}
      </div>
    </section>
  );
}
