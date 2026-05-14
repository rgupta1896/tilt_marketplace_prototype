import { useEffect, useMemo, useState } from "react";
import { ExperimentPanel } from "./components/ExperimentPanel";
import { InterventionPills } from "./components/InterventionPills";
import { LiveRoom } from "./components/LiveRoom";
import {
  interventionContent,
  interventionOrder,
} from "./data/interventions";

const feedTemplates = {
  Baseline: [
    "Seller: Clean vintage nylon, size L, great shape.",
    "viewer_18 joined the room.",
    "Chat: Can you show the sleeve patch?",
    "Seller: Current bid is holding. Watching for movement.",
  ],
  "Trust Cue": [
    "Seller badge surfaced near bid CTA.",
    "buyer_cam asked about shipping speed.",
    "Seller: Ships within 24 hours from the studio.",
    "trustedbuyer_3 bookmarked the item.",
  ],
  "First-Bid Nudge": [
    "Prompt shown to returning viewer segment.",
    "Chat: Waiting for someone to open this one?",
    "Seller: Jacket is in strong vintage condition.",
    "viewer_42 hovered over bid CTA.",
  ],
  "Urgency Cue": [
    "Countdown pulse intensified for final minute.",
    "Chat: This room is heating up.",
    "Seller: Last call before hammer.",
    "viewer_29 started watching this lot closely.",
  ],
  "Seller Prompt": [
    "Coaching card sent to seller console.",
    "Seller: Want me to show the stitching up close?",
    "Chat: Yes, zoom on the front logo.",
    "viewer_08 reacted with a fire emoji.",
  ],
};

const accentMap = {
  neutral: "neutral",
  trust: "trust",
  nudge: "nudge",
  urgency: "urgency",
  seller: "seller",
};

function makeFeed(intervention) {
  return feedTemplates[intervention].map((text, index) => ({
    id: `${intervention}-${index}-${text}`,
    time: `${Math.max(12 - index * 2, 1)}s`,
    text,
  }));
}

function getStartingState(intervention) {
  const accent = accentMap[interventionContent[intervention].accent];

  return {
    currentBid: intervention === "Urgency Cue" ? 220 : 210,
    timeLeft: 74,
    viewers: intervention === "Urgency Cue" ? 129 : 124,
    activeBidders:
      intervention === "Baseline"
        ? 5
        : intervention === "Trust Cue"
          ? 7
          : intervention === "First-Bid Nudge"
            ? 8
            : intervention === "Urgency Cue"
              ? 10
              : 7,
    feed: makeFeed(intervention),
    accent,
  };
}

function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export default function App() {
  const [activeIntervention, setActiveIntervention] = useState("Baseline");
  const [roomState, setRoomState] = useState(() => getStartingState("Baseline"));

  const activeContent = useMemo(
    () => interventionContent[activeIntervention],
    [activeIntervention],
  );

  useEffect(() => {
    setRoomState(getStartingState(activeIntervention));
  }, [activeIntervention]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRoomState((current) => {
        const nextTimeLeft = current.timeLeft > 0 ? current.timeLeft - 1 : 75;
        const viewerDelta = Math.random() > 0.55 ? 1 : -1;
        const biddersDelta =
          activeIntervention === "Baseline"
            ? Math.random() > 0.9
              ? 1
              : 0
            : Math.random() > 0.72
              ? 1
              : 0;
        const bidIncrement =
          Math.random() > (activeIntervention === "Urgency Cue" ? 0.6 : 0.8)
            ? randomFrom(
                activeIntervention === "Baseline"
                  ? [5, 10]
                  : [10, 10, 15, 20],
              )
            : 0;
        const nextFeed =
          current.timeLeft % 9 === 0
            ? [
                {
                  id: `${activeIntervention}-${Date.now()}`,
                  time: "now",
                  text: randomFrom(feedTemplates[activeIntervention]),
                },
                ...current.feed,
              ].slice(0, 5)
            : current.feed;

        return {
          ...current,
          currentBid: current.currentBid + bidIncrement,
          timeLeft: nextTimeLeft,
          viewers: Math.max(109, current.viewers + viewerDelta),
          activeBidders: Math.max(4, current.activeBidders + biddersDelta),
          feed: nextFeed,
        };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [activeIntervention]);

  const handleBid = () => {
    setRoomState((current) => ({
      ...current,
      currentBid: current.currentBid + 10,
      activeBidders: current.activeBidders + 1,
      feed: [
        {
          id: `manual-bid-${Date.now()}`,
          time: "now",
          text: "You placed a bid. The room reacts instantly.",
        },
        ...current.feed,
      ].slice(0, 5),
    }));
  };

  return (
    <main className="app-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <section className="hero panel">
        <h1>Tilt Live Commerce Lab</h1>
        <p className="hero-subtitle">Turning passive viewers into first-time bidders</p>
        <p className="hero-copy">
          An interactive prototype exploring how lightweight live-room interventions
          could help convert passive viewers into active bidders without disrupting
          the energy of a live auction.
        </p>
        <div className="hero-foot">
          <span>Switch interventions to see how the room experience and metrics change.</span>
          <span className="disclaimer">
            Text-only concept. Not an official Tilt product. Uses mock data.
          </span>
        </div>
      </section>

      <section className="controls panel">
        <div className="panel-heading">
          <h2>Choose a growth lever</h2>
        </div>
        <InterventionPills
          options={interventionOrder}
          active={activeIntervention}
          onChange={setActiveIntervention}
        />
      </section>

      <section className="experience-grid">
        <LiveRoom
          intervention={activeIntervention}
          state={roomState}
          roomMessage={activeContent.roomMessage}
          supportCard={activeContent.supportCard}
          onBid={handleBid}
        />
        <ExperimentPanel
          intervention={activeIntervention}
          details={activeContent.metric}
        />
      </section>
    </main>
  );
}
