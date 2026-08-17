"use client";

import { useEffect, useState } from "react";

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

type TimelineLink = {
  label: string;
  href: string;
};

type TimelineEntry = {
  date: string;
  title: string;
  body: string;
  links?: TimelineLink[];
};

type TimelinePhase = {
  range: string;
  title: string;
  entries: TimelineEntry[];
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

const letterStarters = [
  {
    id: "resident",
    label: "As a Forest Hills resident",
    body: `Dear Mayor Wu and Streets Team,

I live in Forest Hills and use Hyde Park Avenue regularly. [Add a few sentences about what you experience here.]

Repaving three blocks with new asphalt, paint, and signs does not address the speeding, reckless driving, difficult crossings, or missing bicycle connections that make this corridor unsafe. Please do not move ahead until the City has a plan for lasting safety improvements—not just a smoother surface.

Hyde Park Avenue should be safer for everyone who walks, bikes, drives, takes the bus, or lives nearby. Please take our safety into account before repaving it.`,
  },
  {
    id: "parent",
    label: "As a parent or caregiver",
    body: `Dear Mayor Wu and Streets Team,

I use Hyde Park Avenue with my family, and [describe a crossing, trip, or moment that has felt unsafe]. The speed and behavior of drivers make ordinary trips feel far more dangerous than they should.

Fresh asphalt and paint will not protect a child crossing the street or slow a reckless driver. Please do not repave these blocks until the City includes permanent improvements that shorten crossings, calm traffic, and make people visible and protected.

Our families should not have to accept another inadequate plan for years to come.`,
  },
  {
    id: "walking",
    label: "As someone who walks here",
    body: `Dear Mayor Wu and Streets Team,

I regularly walk along and across Hyde Park Avenue. [Describe where you cross and what makes it difficult or frightening.]

The current proposal leaves long, exposed crossings and dangerous driving patterns essentially unchanged. A fresh coat of paint is not a pedestrian safety plan. Please use this opportunity to add lasting protection, especially at Ukraine Way and other places where people struggle to cross safely.

Do not repave Hyde Park Avenue until the design takes the safety of people walking seriously.`,
  },
  {
    id: "biking",
    label: "As someone who bikes here",
    body: `Dear Mayor Wu and Streets Team,

I bike in and around Forest Hills, and Hyde Park Avenue does not provide a safe, clear way to continue my trip. [Describe the route you take or a place where you feel forced into danger.]

The City has previously studied designs with meaningful bicycle connections, yet the current repaving plan offers none. New asphalt without a safe route will only preserve the same dangerous conditions.

Please do not repave these blocks until the City adopts a design that protects people biking as well as people walking and driving.`,
  },
  {
    id: "transit",
    label: "As a bus or transit rider",
    body: `Dear Mayor Wu and Streets Team,

I use Hyde Park Avenue to reach buses and Forest Hills Station. [Describe your regular trip and the part that feels unsafe or unreliable.]

People should be able to walk, bike, and cross the street safely on the way to transit. The current plan does not meaningfully improve those connections, despite years of study and earlier proposals that did.

Please do not treat new asphalt as progress. Repave Hyde Park Avenue only after the City has incorporated lasting safety and transit improvements.`,
  },
  {
    id: "driving",
    label: "As someone who drives here",
    body: `Dear Mayor Wu and Streets Team,

I drive on Hyde Park Avenue and regularly see [describe speeding, weaving, red-light running, or another dangerous behavior]. The street's design encourages behavior that puts everyone at risk, including careful drivers.

Resurfacing without redesigning the street will not solve that problem—and smoother pavement may make speeding even easier. Please adopt permanent traffic-calming and crossing improvements before repaving these blocks.

Drivers, pedestrians, cyclists, and transit riders all need a street designed for predictable, safe travel.`,
  },
  {
    id: "accessibility",
    label: "About age or accessibility",
    body: `Dear Mayor Wu and Streets Team,

Hyde Park Avenue's long and exposed crossings are especially difficult for older residents, disabled people, and anyone who needs more time to cross. [Share your own experience or that of someone you know.]

Paint and signs do not provide the physical protection people need. The City should shorten crossings, slow drivers, and design for people with a wide range of ages and abilities.

Please do not repave Hyde Park Avenue until those lasting safety improvements are part of the plan.`,
  },
  {
    id: "close-call",
    label: "After a close call",
    body: `Dear Mayor Wu and Streets Team,

I had—or witnessed—a close call on Hyde Park Avenue. [Describe what happened, where it happened, and how it affected you.]

Experiences like this are why residents have asked for meaningful safety changes for years. Repaving the street without addressing the design that enables speeding, red-light running, and unsafe crossings ignores what people are telling the City.

Please pause the current plan and make lasting safety improvements before putting down new asphalt.`,
  },
  {
    id: "business",
    label: "As a local business customer or owner",
    body: `Dear Mayor Wu and Streets Team,

I own, work at, or regularly visit businesses near Hyde Park Avenue. [Describe your connection to the corridor.]

A safer street would make it easier for customers, workers, and neighbors to reach local businesses on foot, by bike, by transit, and by car. The current proposal misses that opportunity and leaves dangerous conditions in place.

Please do not repave these blocks until the City has included permanent safety improvements that support the people and businesses of Forest Hills.`,
  },
  {
    id: "accountability",
    label: "About the City's broken process",
    body: `Dear Mayor Wu and Streets Team,

After seven years of studies and public meetings, residents deserve more than three blocks of asphalt and paint. The City developed stronger alternatives—including a three-lane plan supported by 700 residents and many local businesses—but now refuses even to acknowledge those proposals.

That is not meaningful public engagement, and new asphalt is not a safety plan. Please explain why the safer alternatives were abandoned and do not repave Hyde Park Avenue until the design addresses speeding, unsafe crossings, and the needs of bus and bike riders.`,
  },
];

const timelinePhases: TimelinePhase[] = [
  {
    range: "Before 2019–2023",
    title: "Plans, studies, and promises",
    entries: [
      {
        date: "2009–2018",
        title: "A decade of studies",
        body: "Boston studied traffic, walking, and biking conditions along Hyde Park Avenue. The MBTA studied Route 32 bus stops, and the regional planning agency analyzed congestion and bus operations.",
      },
      {
        date: "2019–February 2020",
        title: "A real redesign takes shape",
        body: "The City began a corridor-wide project and developed a preliminary design with bus priority and bike lanes. After a public open house, the work was put on hold during the pandemic.",
        links: [
          { label: "City project page", href: "https://www.boston.gov/departments/transportation/project/hyde-park-avenue-multimodal-corridor" },
          { label: "2020 design", href: "/plans/august-2020.webp" },
          { label: "Meeting coverage", href: "https://mass.streetsblog.org/2020/02/17/boston-starts-outreach-for-hyde-park-ave-bus-and-bike-improvements" },
        ],
      },
      {
        date: "2022–2023",
        title: "The City says the work has restarted",
        body: "Officials resumed outreach using the 2019 design as a starting point. In October 2023, the project became part of the Southwest Boston Transit Action Plan.",
        links: [
          { label: "Transit action plan", href: "https://www.boston.gov/departments/transportation/southwest-boston-transit-action-plan" },
        ],
      },
    ],
  },
  {
    range: "2024–April 2025",
    title: "Residents document the danger",
    entries: [
      {
        date: "Spring–Fall 2024",
        title: "More outreach, still no design",
        body: "The City surveyed riders, visited businesses, held office hours, and attended community events. Residents participated again, but still had no concrete proposal to review.",
      },
      {
        date: "June 2024",
        title: "Residents ask for immediate fixes",
        body: "Neighbors met with Councilor Ben Weber and asked for basic near-term safety measures: better signs, daylighting, and safer crossings.",
      },
      {
        date: "October 2024",
        title: "A neighbor is killed; 695 residents demand action",
        body: "Glenn Inghram was killed by an MBTA bus while crossing at Tower Street. A letter and vigil called for immediate and lasting changes; the City promised signal improvements.",
        links: [
          { label: "Vigil and resident letter", href: "https://www.boston.com/news/transportation/2024/10/22/jamaica-plain-community-hosts-vigil-for-man-killed-by-mbta-bus/?amp=1" },
          { label: "City’s signal promise", href: "https://mass.streetsblog.org/2024/10/25/boston-officials-will-adjust-traffic-signals-at-fatal-crash-scene-in-forest-hills" },
        ],
      },
      {
        date: "December 2024–January 2025",
        title: "Open houses—but no designs",
        body: "Roughly 110 people attended two City open houses advertised as draft-design meetings. No designs were shown. Residents again asked for protected bike space, a road diet, traffic calming, and better transit.",
        links: [
          { label: "City presentation", href: "https://www.boston.gov/sites/default/files/file/2024/12/Hyde%20Park%20Ave%20Open%20House%20-%20December%2011%2C%202024.pdf" },
        ],
      },
      {
        date: "January–April 2025",
        title: "709 residents call for action",
        body: "An open letter demanded safety and transit improvements in 2025—and an end to meetings without proposals. In April, about 50 residents led their own safety walk to document what needed to change.",
        links: [
          { label: "Read the open letter", href: "https://mass.streetsblog.org/2025/01/24/guest-column-lethal-hyde-park-avenue-needs-changes-not-more-meetings" },
        ],
      },
    ],
  },
  {
    range: "May 2025–August 2026",
    title: "A safer plan—then retreat",
    entries: [
      {
        date: "May–July 2025",
        title: "A safer option wins support—then disappears",
        body: "The City presented two resurfacing options. Hundreds of residents and many businesses backed the three-lane alternative as an imperfect but meaningful step. By July, officials said neither option would happen.",
        links: [
          { label: "City’s May presentation", href: "https://www.boston.gov/sites/default/files/file/2025/06/Hyde%20Park%20Ave%20Slides%202025_05_21.pdf" },
          { label: "Three-lane design", href: "/plans/may-2025-alt2.webp" },
        ],
      },
      {
        date: "Fall 2025",
        title: "Eleven councilors demand answers",
        body: "Eleven City Councilors backed a hearing on the delays. Dozens of residents testified, but City officials offered no substantive update.",
        links: [
          { label: "Council hearing order", href: "https://www.boston.gov/sites/default/files/file/2025/09/Order%20for%20a%20hearing%20to%20discuss%20next%20steps%20to%20improve%20street%20safety%20on%20the%20northern%20stretch%20of%20Hyde%20Park%20Avenue%20from%20Walk%20Hill%20Street%20to%20the%20Arborway.pdf" },
          { label: "Watch the hearing", href: "https://www.youtube.com/watch?v=uZCm8TEn8UA&t=9437s" },
        ],
      },
      {
        date: "April 2026",
        title: "Mayor Wu joins the fourth safety walk",
        body: "The Mayor said some safety improvements might accompany fall repaving, but rejected major changes to the street and suggested dedicated bus and bike lanes were inappropriate because of car traffic.",
        links: [
          { label: "Report from the walk", href: "https://www.universalhub.com/2026/mayor-outlines-ideas-making-hyde-park-avenue-safer-near-forest-hills-t" },
        ],
      },
      {
        date: "June 2026",
        title: "The City expects only repaving",
        body: "Officials told residents a traffic-pattern consultant had been hired—but that no major project was expected beyond repaving.",
      },
      {
        date: "August 2026",
        title: "The final plan: paint and signs",
        body: "The City’s current plan keeps four lanes and adds paint, signs, and better sight lines for drivers. It omits the earlier safety designs and makes no changes at Ukraine Way.",
        links: [
          { label: "See the current plan", href: "/plans/august-2026.webp" },
        ],
      },
    ],
  },
];

export default function Home() {
  const [activePlan, setActivePlan] = useState(defaultPlan);
  const [expanded, setExpanded] = useState(false);
  const [subject, setSubject] = useState("Hyde Park Avenue: No repaving without safety improvements");
  const [letter, setLetter] = useState("");
  const [starterId, setStarterId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [zipCode, setZipCode] = useState("");
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

  const chooseStarter = (id: string) => {
    setStarterId(id);
    const starter = letterStarters.find((item) => item.id === id);
    if (starter) setLetter(starter.body);
  };

  const signature = [senderName.trim(), zipCode.trim() && `ZIP code: ${zipCode.trim()}`].filter(Boolean).join("\n");
  const emailBody = [letter.trim(), signature].filter(Boolean).join("\n\n");

  const copyLetter = async () => {
    await navigator.clipboard.writeText(`Subject: ${subject}\n\n${emailBody}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const to = "chris.osgood@boston.gov,tali.robbins@boston.gov,mayor@boston.gov";
  const mailto = `mailto:${to}?cc=${encodeURIComponent("benjamin.weber@boston.gov")}&bcc=${encodeURIComponent("bostonbetterstreets@gmail.com")}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

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
          <h1>Don’t repave our street</h1>
          <p className="hero-summary">
            The City of Boston is planning to repave three blocks of Hyde Park
            Avenue without even pretending to address speeding, reckless
            driving, or pedestrian safety on the corridor.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plans">Learn more</a>
            <a className="button button-quiet" href="#write">Fight back</a>
          </div>
        </div>
      </section>

      <section className="plans-section" id="plans">
        <div className="section-heading learn-heading">
          <div>
            <h2>Paving over the problem—and calling it progress</h2>
          </div>
          <div className="learn-copy">
            <p>
              After <a className="history-link" href="#receipts">seven years of studies and public meetings</a>, all the City
              can muster is three blocks of new asphalt and a fresh coat of
              paint. No attempt to slow cars down. No attempt to make Ukraine
              Way safer for pedestrians. Not even a pretense of helping bus or
              bike riders.
            </p>
            <p>They won’t even acknowledge their own proposals to make the corridor safer.</p>
            <p className="learn-emphasis">New asphalt isn’t a safety plan. New asphalt is an invitation to drive faster.</p>
            <a className="section-cta" href="#write">Take action <span aria-hidden="true">→</span></a>
          </div>
        </div>

        <div className="plan-tabs" role="tablist" aria-label="Hyde Park Avenue plans" tabIndex={-1} onKeyDown={handleTabKeys}>
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
              <small>{activePlan.id === plan.id ? `Selected · ${plan.preference}` : plan.preference}</small>
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
          <p className="section-kicker light-kicker">Take action</p>
          <h2>No repaving without safety improvements.</h2>
          <p className="action-deck">
            Tell City leaders what a safer Hyde Park Ave would mean for you and
            your family—and to repave it only once they’ve taken our safety into
            account.
          </p>
          <ul className="writing-prompts">
            <li>Dangerous or aggressive driving you regularly see</li>
            <li>Crossings that feel too long, exposed, or poorly placed</li>
            <li>The lack of a safe way for cyclists to leave Forest Hills</li>
            <li>Drivers running red lights at Ukraine Way</li>
            <li>A time you or someone you know had a close call here</li>
          </ul>
          <a className="action-history-link" href="#receipts">See why residents are taking action <span aria-hidden="true">↓</span></a>
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
          </div>

          <label htmlFor="subject">Subject</label>
          <input id="subject" value={subject} onChange={(event) => setSubject(event.target.value)} />

          <div className="starter-box">
            <label htmlFor="starter">Want a head start?</label>
            <p>Choose a starting point and write more about your own experiences so the letter is yours.</p>
            <select id="starter" value={starterId} onChange={(event) => chooseStarter(event.target.value)}>
              <option value="">Choose a letter to adapt (optional)</option>
              {letterStarters.map((starter) => (
                <option key={starter.id} value={starter.id}>{starter.label}</option>
              ))}
            </select>
            <small>Choosing another starting point will replace the message below.</small>
          </div>

          <label htmlFor="letter">Write your message</label>
          <textarea
            id="letter"
            rows={14}
            value={letter}
            placeholder="Start with your own experience. What happens when you use Hyde Park Avenue? Have you had a close call? What would a safer design change for you, your family, or your neighbors?"
            onChange={(event) => setLetter(event.target.value)}
          />

          <div className="sender-fields">
            <div>
              <label htmlFor="sender-name">Your name</label>
              <input
                id="sender-name"
                autoComplete="name"
                value={senderName}
                onChange={(event) => setSenderName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="zip-code">ZIP code</label>
              <input
                id="zip-code"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
                value={zipCode}
                onChange={(event) => setZipCode(event.target.value)}
              />
            </div>
            <p>Your name and ZIP code will be added to the bottom of the email.</p>
          </div>

          <div className="letter-actions">
            <a className="send-button" href={mailto}>Open draft in my email <span aria-hidden="true">→</span></a>
            <button className="copy-button" type="button" onClick={copyLetter} disabled={!letter.trim()}>{copied ? "Copied" : "Copy message"}</button>
          </div>
        </form>
      </section>

      <section className="receipts-section" id="receipts">
        <div className="receipts-heading">
          <div>
            <p className="section-kicker">The receipts</p>
            <h2>Seven years of Forest Hills residents ignored</h2>
          </div>
          <p className="receipts-intro">
            The record starts long before 2019. But the pattern since then is
            unmistakable: studies, meetings, promises, and safer designs—then
            delay, retreat, and a plan that leaves the danger in place.
          </p>
        </div>

        <div className="timeline-phases">
          {timelinePhases.map((phase, phaseIndex) => (
            <section className={`timeline-phase phase-${phaseIndex + 1}`} key={phase.range}>
              <p className="phase-range">{phase.range}</p>
              <h3>{phase.title}</h3>
              <ol className="timeline-list">
                {phase.entries.map((entry) => (
                  <li className="timeline-item" key={`${entry.date}-${entry.title}`}>
                    <time>{entry.date}</time>
                    <h4>{entry.title}</h4>
                    <p>{entry.body}</p>
                    {entry.links && (
                      <div className="timeline-sources" aria-label={`Sources for ${entry.title}`}>
                        {entry.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                            {link.label} <span aria-hidden="true">↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </section>

      {expanded && (
        <div className="plan-modal" role="dialog" aria-modal="true" aria-label={`${activePlan.date} enlarged plan`}>
          <button className="modal-close" type="button" onClick={() => setExpanded(false)} aria-label="Close enlarged plan">Close ×</button>
          <img src={activePlan.image} alt={activePlan.alt} />
        </div>
      )}
    </main>
  );
}
