"use client";

import { useEffect, useRef, useState } from "react";

type Plan = {
  id: string;
  tab: string;
  date: string;
  label: string;
  title: string;
  image: string;
  alt: string;
  tone: "red" | "orange" | "lime" | "green";
  preference: string;
  facts: string[];
  supportNote?: string;
  verdict: string;
};

const plans: Plan[] = [
  {
    id: "current",
    tab: "New plan",
    date: "August 2026",
    label: "City’s current plan",
    title: "Paint, signs, better sight lines for cars",
    image: "/plans/august-2026.webp",
    alt: "August 2026 City of Boston Hyde Park Avenue pavement marking and signage plan near Weld Hill, Woodlawn, and Tower Streets",
    tone: "red",
    preference: "Least protective",
    facts: [
      "Four traffic lanes remain",
      "New paint, stop bars, and limited daylighting",
      "No new crossing or pedestrian island",
    ],
    verdict: "It leaves the basic problems in place: dangerous driving, long crossings, and no safe route for cyclists.",
  },
  {
    id: "four-lanes",
    tab: "2025 · 4 lanes",
    date: "May 2025 · Alternative 1",
    label: "Earlier alternative",
    title: "Still four lanes, with some physical improvements",
    image: "/plans/may-2025-alt1.webp",
    alt: "May 2025 Alternative 1 showing four lanes, concrete curb extensions, daylighting, a pedestrian island, and a shortened crossing",
    tone: "orange",
    preference: "Some improvement",
    facts: [
      "Four traffic lanes remain",
      "Concrete curb extensions and a pedestrian island",
      "A shorter crossing at Ukraine Way",
    ],
    verdict: "Better than the current plan, but it leaves the street wide and does little for cyclists.",
  },
  {
    id: "three-lanes",
    tab: "2025 · 3 lanes",
    date: "May 2025 · Alternative 2",
    label: "Resident-supported plan",
    title: "Three lanes and permanent pedestrian protection",
    image: "/plans/may-2025-alt2.webp",
    alt: "May 2025 Alternative 2 showing three lanes, concrete curb extensions, pedestrian islands, and a new Weld Hill Street crosswalk",
    tone: "lime",
    preference: "Supported in 2025",
    facts: [
      "Three lanes to reduce weaving and speeding",
      "Concrete curb extensions and pedestrian islands",
      "A new Weld Hill crossing and room for bike lanes",
    ],
    supportNote: "Supported by 700 residents and many local businesses when it was presented in May 2025.",
    verdict: "A practical resurfacing plan that reduces conflicts and adds lasting protection for people crossing the street.",
  },
  {
    id: "2020",
    tab: "2020 redesign",
    date: "August 2020",
    label: "Unbuilt redesign",
    title: "A larger multimodal redesign around Forest Hills",
    image: "/plans/august-2020.webp",
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

const defaultPlan = plans.find((plan) => plan.id === "current") ?? plans[0];

export default function Home() {
  const [activePlan, setActivePlan] = useState(defaultPlan);
  const [expanded, setExpanded] = useState(false);
  const [subject, setSubject] = useState("Hyde Park Avenue: No repaving without safety improvements");
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);
  const [letterInView, setLetterInView] = useState(false);
  const letterCardRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setActivePlan(defaultPlan);
  }, []);

  useEffect(() => {
    const letterCard = letterCardRef.current;
    if (!letterCard) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLetterInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(letterCard);
    return () => observer.disconnect();
  }, []);

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
          src="/hyde-park-avenue-forest-hills.webp"
          alt="Traffic on Hyde Park Avenue at Forest Hills"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Forest Hills residents are telling Mayor Wu’s Streets Team</p>
          <h1>No repaving without safety improvements.</h1>
          <p className="hero-summary">
            The City of Boston is resurfacing Hyde Park Avenue this fall and is
            committed to a design that doesn’t adequately address pedestrian
            safety issues residents have documented for years.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plans">See the City’s inadequate plan</a>
            <a className="button button-quiet" href="#write">Write the City</a>
          </div>
        </div>
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
              <span>Click to enlarge</span>
            </button>
          </div>

          <div className="plan-details">
            <p className="plan-meta"><span>{activePlan.date}</span><span aria-hidden="true">·</span><span>{activePlan.label}</span></p>
            <h3>{activePlan.title}</h3>
            {activePlan.supportNote && <p className="plan-support">{activePlan.supportNote}</p>}
            <ul className="plan-points">
              {activePlan.facts.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="plan-verdict">{activePlan.verdict}</p>
          </div>
        </article>

      </section>

      <section className="action-section" id="write">
        <div className="action-intro">
          <p className="section-kicker light-kicker">Tell the City</p>
          <h2>No repaving without safety improvements.</h2>
          <p>
            The City plans to repave Hyde Park Avenue this fall using a design
            residents have repeatedly said is inadequate. Tell City leaders why
            that is unacceptable—and what a safer plan would mean for you and
            your family.
          </p>
          <ul className="writing-prompts">
            <li>Dangerous or aggressive driving you regularly see</li>
            <li>Crossings that feel too long, exposed, or poorly placed</li>
            <li>The lack of a safe way for cyclists to leave Forest Hills</li>
            <li>Drivers running red lights at Ukraine Way</li>
            <li>A time you or someone you know had a close call here</li>
          </ul>
        </div>

        <form ref={letterCardRef} className="letter-card" onSubmit={(event) => event.preventDefault()}>
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
          </div>

          <label htmlFor="subject">Subject</label>
          <input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />

          <label htmlFor="letter">Write your message</label>
          <textarea
            id="letter"
            rows={14}
            value={letter}
            placeholder="Start with your own experience. What happens when you use Hyde Park Avenue? Have you had a close call? What would a safer design change for you, your family, or your neighbors?"
            onChange={(event) => setLetter(event.target.value)}
          />

          <div className="letter-actions">
            <a className="send-button" href={mailto}>Open draft in my email <span aria-hidden="true">→</span></a>
            <button className="copy-button" type="button" onClick={copyLetter} disabled={!letter.trim()}>{copied ? "Copied" : "Copy message"}</button>
          </div>
        </form>
      </section>

      {!letterInView && <a className="floating-action" href="#write">Write the City <span aria-hidden="true">→</span></a>}

      {expanded && (
        <div className="plan-modal" role="dialog" aria-modal="true" aria-label={`${activePlan.date} enlarged plan`} onClick={() => setExpanded(false)}>
          <button className="modal-close" type="button" onClick={() => setExpanded(false)} aria-label="Close enlarged plan">Close ×</button>
          <img src={activePlan.image} alt={activePlan.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}
