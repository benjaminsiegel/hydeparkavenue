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
  tone: "red" | "orange" | "lime" | "green";
  preference: string;
  facts: string[];
  verdict: string;
};

const plans: Plan[] = [
  {
    id: "current",
    tab: "New plan",
    date: "August 2026",
    label: "City’s current plan",
    title: "Paint and signs, but no meaningful redesign",
    summary:
      "The City’s plan makes small changes while keeping the same basic four-lane street.",
    image: "/plans/august-2026.webp",
    pdf: "/plans/august-2026.pdf",
    alt: "August 2026 City of Boston Hyde Park Avenue pavement marking and signage plan near Weld Hill, Woodlawn, and Tower Streets",
    tone: "red",
    preference: "Least protective",
    facts: [
      "Keeps four through lanes",
      "Adds markings, stop bars, and limited daylighting",
      "Adds no new crossing or pedestrian island at Weld Hill Street",
    ],
    verdict: "It does not address the street’s basic problems: dangerous driving, long crossings, and no safe route for cyclists.",
  },
  {
    id: "four-lanes",
    tab: "2025 · 4 lanes",
    date: "May 2025 · Alternative 1",
    label: "Earlier alternative",
    title: "Still four lanes, with some physical improvements",
    summary:
      "This option kept the wide roadway but added concrete changes to make some crossings shorter.",
    image: "/plans/may-2025-alt1.webp",
    pdf: "/plans/may-2025-alt1.pdf",
    alt: "May 2025 Alternative 1 showing four lanes, concrete curb extensions, daylighting, a pedestrian island, and a shortened crossing",
    tone: "orange",
    preference: "Some improvement",
    facts: [
      "Keeps four through lanes",
      "Adds concrete curb extensions and a pedestrian island",
      "Shortens the crossing at Ukraine Way",
    ],
    verdict: "Better than the current plan, but it leaves the street wide and does little for cyclists.",
  },
  {
    id: "three-lanes",
    tab: "2025 · 3 lanes",
    date: "May 2025 · Alternative 2",
    label: "Resident-supported plan",
    title: "Three lanes and permanent pedestrian protection",
    summary:
      "This is the 2025 plan we supported because it changes how the street works, not just how it is painted.",
    image: "/plans/may-2025-alt2.webp",
    pdf: "/plans/may-2025-alt2.pdf",
    alt: "May 2025 Alternative 2 showing three lanes, concrete curb extensions, pedestrian islands, and a new Weld Hill Street crosswalk",
    tone: "lime",
    preference: "Supported in 2025",
    facts: [
      "Reduces the street to three lanes",
      "Adds concrete curb extensions and pedestrian islands",
      "Adds a new Weld Hill crossing and room for bike lanes",
    ],
    verdict: "A practical resurfacing plan that reduces conflicts and adds lasting protection for people crossing the street.",
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
    tone: "green",
    preference: "Most ambitious",
    facts: [
      "Bus-and-bike-only street space",
      "Safer bike connections around Forest Hills",
      "Reallocates street space instead of preserving the status quo",
    ],
    verdict: "The most ambitious redesign the City developed—and then allowed to stall.",
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState(plans[0]);
  const [expanded, setExpanded] = useState(false);
  const [subject, setSubject] = useState("Hyde Park Avenue: No repaving without safety improvements");
  const [letter, setLetter] = useState("");
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

  const to = "chris.osgood@boston.gov,tali.robbins@boston.gov,mayor@boston.gov";
  const mailto = `mailto:${to}?cc=${encodeURIComponent("benjamin.weber@boston.gov")}&bcc=${encodeURIComponent("bostonbetterstreets@gmail.com")}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(letter)}`;

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
          <p className="eyebrow">Forest Hills residents are telling the City of Boston</p>
          <h1>Don’t pave over a chance to make Hyde Park Avenue safer.</h1>
          <p className="hero-summary">
            The City of Boston is resurfacing Hyde Park Avenue and is committed
            to a design that doesn’t adequately address pedestrian safety issues
            residents have documented for years.
            <strong className="hero-demand">No repaving without safety improvements.</strong>
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plans">See the City’s inadequate plan</a>
            <a className="button button-quiet" href="#write">Write the City</a>
          </div>
        </div>
        <p className="photo-credit">Photo: City of Boston</p>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-heading">
          <div>
            <h2>The new plan leaves real safety improvements behind.</h2>
          </div>
          <p>
            We are asking the City to use resurfacing this fall to implement
            lasting safety improvements, rather than locking in an inadequate
            design for many years. Compare their plan with three earlier
            alternatives, including the one we supported in 2025.
          </p>
        </div>

        <div className="plan-tabs" role="tablist" aria-label="Hyde Park Avenue plans" onKeyDown={handleTabKeys}>
          {plans.map((plan) => (
            <button
              className={`plan-tab tone-${plan.tone}${activePlan.id === plan.id ? " active" : ""}`}
              id={`tab-${plan.id}`}
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={activePlan.id === plan.id}
              aria-controls="active-plan"
              tabIndex={activePlan.id === plan.id ? 0 : -1}
              onClick={() => selectPlan(plan)}
            >
              <span>{plan.tab}</span>
              <small>{plan.preference}</small>
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
              <span className={`status status-${activePlan.tone}`}>{activePlan.label}</span>
              <span>{activePlan.date}</span>
            </div>
            <h3>{activePlan.title}</h3>
            <p className="plan-summary">{activePlan.summary}</p>

            <div className="quick-read">
              <h4>At a glance</h4>
              <ul className="quick-facts">
                {activePlan.facts.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <p className={`plan-verdict verdict-${activePlan.tone}`}>{activePlan.verdict}</p>
          </div>
        </article>

      </section>

      <section className="action-section" id="write">
        <div className="action-intro">
          <p className="section-kicker light-kicker">Take one minute</p>
          <h2>Tell the City what this street is really like.</h2>
          <p>
            A personal story is more powerful than a form letter. Describe what
            happens when you walk, bike, drive, or take the bus here—and what a
            safer design would change for you.
          </p>
          <ul className="writing-prompts">
            <li>Dangerous or aggressive driving you regularly see</li>
            <li>Crossings that feel too long, exposed, or poorly placed</li>
            <li>The lack of a safe way for cyclists to leave Forest Hills</li>
            <li>Drivers running red lights at Ukraine Way</li>
            <li>A moment when you or someone you know felt unsafe here</li>
          </ul>
        </div>

        <form className="letter-card" onSubmit={(event) => event.preventDefault()}>
          <div className="letter-routing">
            <div className="route-row">
              <span className="route-label">To</span>
              <div className="route-list">
                <span><strong>Chris Osgood</strong> · Interim Chief of Streets</span>
                <small>chris.osgood@boston.gov</small>
                <span><strong>Tali Robbins</strong> · Deputy Chief of Policy</span>
                <small>tali.robbins@boston.gov</small>
                <span><strong>Mayor Michelle Wu</strong></span>
                <small>mayor@boston.gov</small>
              </div>
            </div>
            <div className="route-row compact-route">
              <span className="route-label">CC</span>
              <div className="route-list"><span><strong>Ben Weber</strong></span><small>benjamin.weber@boston.gov</small></div>
            </div>
            <div className="route-row compact-route">
              <span className="route-label">BCC</span>
              <div className="route-list"><span><strong>Boston Better Streets Coalition</strong></span><small>bostonbetterstreets@gmail.com</small></div>
            </div>
          </div>

          <label htmlFor="subject">Subject</label>
          <input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />

          <label htmlFor="letter">Write your message</label>
          <textarea
            id="letter"
            rows={14}
            value={letter}
            placeholder="Start with your own experience. What happens when you use Hyde Park Avenue? What feels unsafe? What would a safer design change for you, your family, or your neighbors?"
            onChange={(event) => setLetter(event.target.value)}
          />

          <div className="letter-actions">
            <a className="send-button" href={mailto}>Open draft in my email <span aria-hidden="true">→</span></a>
            <button className="copy-button" type="button" onClick={copyLetter} disabled={!letter.trim()}>{copied ? "Copied" : "Copy message"}</button>
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
