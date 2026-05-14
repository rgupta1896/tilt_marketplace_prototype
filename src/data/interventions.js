export const interventionOrder = [
  "Baseline",
  "Trust Cue",
  "First-Bid Nudge",
  "Urgency Cue",
  "Seller Prompt",
];

export const interventionContent = {
  Baseline: {
    accent: "neutral",
    roomMessage:
      "Healthy viewership, but most of the room is still watching rather than bidding.",
    metric: {
      primaryMetric: "Viewer-to-first-bid conversion",
      expectedMovement: "Current benchmark state",
      guardrail: "Room quality",
      testingLogic:
        "Establish the baseline relationship between viewers, active bidders and first-bid behaviour.",
    },
  },
  "Trust Cue": {
    accent: "trust",
    roomMessage:
      "A lightweight confidence signal helps reduce hesitation near the bid moment.",
    supportCard:
      "Seller signal: 98% fulfilment rate · 4.8 buyer rating · ships in 24h",
    metric: {
      primaryMetric: "Viewer-to-first-bid conversion",
      expectedMovement: "Moderate increase",
      guardrail: "Refunds / claims",
      testingLogic:
        "Test whether confidence signals reduce hesitation before the first bid.",
    },
  },
  "First-Bid Nudge": {
    accent: "nudge",
    roomMessage:
      "Prompting a high-intent viewer at the right time can reduce passive lurking.",
    supportCard:
      "You've been viewing this item. Place the first bid before it's too late!",
    metric: {
      primaryMetric: "Time to first bid",
      expectedMovement: "Decrease",
      guardrail: "Buyer retention",
      testingLogic:
        "Test whether a timely contextual prompt helps high-intent viewers act sooner.",
    },
  },
  "Urgency Cue": {
    accent: "urgency",
    roomMessage:
      "The room leans into auction urgency to make the live moment impossible to ignore.",
    supportCard: "Final moments. 14 viewers are viewing this item.",
    metric: {
      primaryMetric: "Bids per active viewer",
      expectedMovement: "Increase",
      guardrail: "Average order value",
      testingLogic:
        "Test whether making the live moment more salient increases auction intensity.",
    },
  },
  "Seller Prompt": {
    accent: "seller",
    roomMessage:
      "Seller coaching nudges the host to create a tighter feedback loop with quiet viewers.",
    supportCard:
      "High viewers, low bids. Ask the room a question or demo one detail.",
    metric: {
      primaryMetric: "Viewer-to-first-bid conversion",
      expectedMovement: "Increase",
      guardrail: "Room / chat quality",
      testingLogic:
        "Test whether seller prompts re-engage quiet rooms when attention is high but bidding activity is low.",
    },
  },
};
