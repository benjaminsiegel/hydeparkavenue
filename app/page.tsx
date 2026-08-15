"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: string;
  tab: string;
  date: string;
  label: string;
  title: string;
  summary: string;
  image: string;
  pdf: string;
  alt: string;
  included: string[];
  missing: string[];
  note: string;
};

const plans: Plan[] = [
  {
    id: "current",
    tab: "New plan",
    date: "August 2026",
    label: "Current plan",
    title: "Markings and signs, with limited physical changes",
    summary:
      "The new drawing focuses on resurfacing, pavement markings, signs, stop bars, and daylighting at side streets.",
    image: "/plans/august-2026.webp",
    pdf: "/plans/august-2026.pdf",
    alt: "August 2026 City of Boston Hyde Park Avenue pavement marking and signage plan near Weld Hill, Woodlawn, and Tower Streets",
    included: [
      "Existing crosswalks retained",
      "Daylighting near Weld Hill and Woodlawn Streets",
      "Recessed stop bars and a do-not-block marking",
    ],
    missing: [
      "No new Hyde Park Avenue crossing at Weld Hill Street",
      "No pedestrian refuge or crossing island",
      "No reduction from four through lanes",
      "No dedicated bike or bus space",
    ],
    note: "This is the plan the City currently intends to pair with resurfacing.",
  },
  {
    id: "three-lanes",
    tab: "2025 · 3 lanes",
    date: "May 2025 · Alternative 2",
    label: "Strongest 2025 option",
    title: "Three lanes and permanent pedestrian protection",
    summary:
      "This alternative used the repaving project to change how the street works, not simply refresh its markings.",
    image: "/plans/may-2025-alt2.webp",
    pdf: "/plans/may-2025-alt2.pdf",
    alt: "May 2025 Alternative 2 showing three lanes, concrete curb extensions, pedestrian islands, and a new Weld Hill Street crosswalk",
    included: [
      "Three-lane street configuration",
      "Concrete curb extensions and daylighting",
      "New Weld Hill crosswalk with a crossing island",
      "Shortened crossing and concrete pedestrian island",
      "Opportunity for painted bike lanes",
    ],
    missing: [
      "These physical protections are absent from the attached 2026 drawing",
      "The new Weld Hill crossing did not carry forward",
    ],
    note: "The clearest earlier example of doing more while the street is already being repaved.",
  },
  {
    id: "four-lanes",
    tab: "2025 · 4 lanes",
    date: "May 2025 · Alternative 1",
    label: "Earlier alternative",
    title: "Four lanes, but with concrete safety improvements",
    summary:
      "Even the more conservative 2025 option proposed permanent curb and crossing changes that went beyond paint and signs.",
    image: "/plans/may-2025-alt1.webp",
    pdf: "/plans/may-2025-alt1.pdf",
    alt: "May 2025 Alternative 1 showing four lanes, concrete curb extensions, daylighting, a pedestrian island, and a shortened crossing",
    included: [
      "Concrete curb extensions and daylighting",
      "Shortened crossing at Ukraine Way",
      "Concrete pedestrian island",
      "Dedicated left-turn lane",
    ],
    missing: [
      "Kept four general travel lanes",
      "Did not add the new Weld Hill crossing shown in Alternative 2",
    ],
    note: "A modest alternative that still included more permanent pedestrian protection than the new drawing.",
  },
  {
    id: "2020",
    tab: "2020 redesign",
    date: "August 2020",
    label: "Unbuilt redesign",
    title: "A larger multimodal redesign around Forest Hills",
    summary:
      "The 2020 concept reallocated street space for transit and biking and treated Hyde Park Avenue as part of a connected transportation network.",
    image: "/plans/august-2020.webp",
    pdf: "/plans/august-2020.pdf",
    alt: "August 2020 Hyde Park Avenue design progress drawing showing bus-bike-only and bike-priority lanes around Forest Hills Station",
    included: [
      "Bus-and-bike-only street space",
      "Colored bike-priority treatments around Forest Hills",
      "A corridor-level change rather than a marking refresh",
    ],
    missing: [
      "The redesign never moved forward",
      "Its dedicated transit and bike space is not part of the 2026 drawing",
    ],
    note: "A reminder that the City has studied much more ambitious changes here before.",
  },
];

const starterLetter = `Dear Chief Gove,

I’m writing as a resident who cares about the safety of Hyde Park Avenue. Please do not resurface this street without building meaningful pedestrian safety improvements at the same time.

The August 2026 plan relies largely on markings, signs, stop bars, and limited daylighting. Earlier City concepts showed more substantial options: concrete curb extensions, shortened crossings, pedestrian islands, a new crosswalk at Weld Hill Street, a three-lane alternative, and dedicated space for people biking and riding the bus.

Please pause the current design and bring back a plan that uses this resurfacing opportunity to make crossings meaningfully shorter and safer, reduce dangerous conflicts, and provide safe, continuous space for people walking, biking, and taking transit. Please also explain publicly why the stronger elements shown in the 2020 and 2025 concepts were removed.

Thank you,
[Your name]
[Your neighborhood]`;

export default function Home() {
  const [activePlan, setActivePlan] = useState(plans[0]);
  const [expanded, setExpanded] = useState(false);
  const [subject, setSubject] = useState("Build real safety improvements on Hyde Park Avenue");
  const [letter, setLetter] = useState(starterLetter);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expanded]);

  const selectPlan = (plan: Plan) => {
    setActivePlan(plan);
    setExpanded(false);
  };

  const handleTabKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const currentIndex = plans.findIndex((plan) => plan.id === activePlan.id);
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = plans[(currentIndex + direction + plans.length) % plans.length];
    selectPlan(next);
    requestAnimationFrame(() => document.getElementById(`tab-${next.id}`)?.focus());
  };

  const copyLetter = async () => {
    await navigator.clipboard.writeText(`Subject: ${subject}\n\n${letter}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const mailto = `mailto:nicholas.gove@boston.gov?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(letter)}`;

  return (
    <main>
      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/hyde-park-avenue.jpg"
          alt="Aerial view of Hyde Park Avenue and the surrounding Forest Hills neighborhood"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Forest Hills residents are asking Boston to do better</p>
          <h1>Don’t pave over a chance to make Hyde Park Avenue safer.</h1>
          <p className="hero-summary">
            The City of Boston is resurfacing Hyde Park Avenue and is committed
            to a design that doesn’t adequately address pedestrian safety issues
            residents have documented for years. We can’t let them do this
            without addressing them.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plans">See what changed</a>
            <a className="button button-quiet" href="#write">Write the City</a>
          </div>
        </div>
        <p className="photo-credit">Photo: City of Boston</p>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-heading">
          <div>
            <p className="section-kicker">The decision</p>
            <h2>The new plan leaves real safety improvements behind.</h2>
          </div>
          <p>
            Boston can use resurfacing to build lasting safety improvements—or
            lock in another inadequate design for years. Compare the current
            plan with three earlier alternatives.
          </p>
        </div>

        <div className="plan-tabs" role="tablist" aria-label="Hyde Park Avenue plans" onKeyDown={handleTabKeys}>
          {plans.map((plan) => (
            <button
              className={activePlan.id === plan.id ? "plan-tab active" : "plan-tab"}
              id={`tab-${plan.id}`}
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={activePlan.id === plan.id}
              aria-controls="active-plan"
              tabIndex={activePlan.id === plan.id ? 0 : -1}
              onClick={() => selectPlan(plan)}
            >
              {plan.tab}
            </button>
          ))}
        </div>

        <article className="plan-card" id="active-plan" role="tabpanel" aria-labelledby={`tab-${activePlan.id}`}>
          <div className="plan-visual-column">
            <button className="plan-image-button" type="button" onClick={() => setExpanded(true)} aria-label={`Enlarge ${activePlan.date} plan`}>
              <img src={activePlan.image} alt={activePlan.alt} />
              <span>Click to enlarge <span aria-hidden="true">↗</span></span>
            </button>
            <a className="source-link" href={activePlan.pdf} target="_blank" rel="noreferrer">
              Open the original plan PDF <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="plan-details">
            <div className="plan-meta">
              <span className={activePlan.id === "current" ? "status status-current" : "status"}>{activePlan.label}</span>
              <span>{activePlan.date}</span>
            </div>
            <h3>{activePlan.title}</h3>
            <p className="plan-summary">{activePlan.summary}</p>

            <div className="feature-group">
              <h4>What this plan includes</h4>
              <ul className="feature-list included-list">
                {activePlan.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="feature-group missing-group">
              <h4>{activePlan.id === "current" ? "What earlier plans had that this one doesn’t" : "Important limitations or differences"}</h4>
              <ul className="feature-list missing-list">
                {activePlan.missing.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <p className="plan-note">{activePlan.note}</p>
          </div>
        </article>

      </section>

      <section className="action-section" id="write">
        <div className="action-intro">
          <p className="section-kicker light-kicker">Take one minute</p>
          <h2>Ask Boston to build the safer plan.</h2>
          <p>
            Send an editable message to Nicholas Gove, Boston’s Interim Chief of
            Streets. Personalize it with your experience on Hyde Park Avenue.
          </p>
        </div>

        <form className="letter-card" onSubmit={(event) => event.preventDefault()}>
          <div className="letter-recipient">
            <span>To</span>
            <div>
              <strong>Nicholas Gove</strong>
              <small>Interim Chief of Streets · City of Boston</small>
            </div>
          </div>

          <label htmlFor="subject">Subject</label>
          <input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />

          <label htmlFor="letter">Your editable letter</label>
          <textarea id="letter" rows={18} value={letter} onChange={(event) => setLetter(event.target.value)} />

          <div className="letter-actions">
            <a className="send-button" href={mailto}>Open in my email <span aria-hidden="true">→</span></a>
            <button className="copy-button" type="button" onClick={copyLetter}>{copied ? "Copied" : "Copy letter"}</button>
          </div>
          <p className="privacy-note">This opens your email app. Nothing is sent until you review and send it yourself.</p>
        </form>
      </section>

      <a className="floating-action" href="#write">Write the City <span aria-hidden="true">→</span></a>

      {expanded && (
        <div className="plan-modal" role="dialog" aria-modal="true" aria-label={`${activePlan.date} enlarged plan`} onClick={() => setExpanded(false)}>
          <button className="modal-close" type="button" onClick={() => setExpanded(false)} aria-label="Close enlarged plan">Close ×</button>
          <img src={activePlan.image} alt={activePlan.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
