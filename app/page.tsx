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

type TimelineLink = {
  label: string;
  href: string;
};

type TimelineImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

type TimelineEntry = {
  date: string;
  title: string;
  body: string;
  links?: TimelineLink[];
  images?: TimelineImage[];
};

type TimelinePhase = {
  range: string;
  title: string;
  entries: TimelineEntry[];
  openingImage?: TimelineImage;
  closingImage?: TimelineImage;
};

type ResidentVoice = {
  name: string;
  zip: string;
  quote: string;
};

const residentVoices: ResidentVoice[] = [
  {
    name: "Mark M.",
    zip: "02136",
    quote: "Hyde Park Ave is far and away the worst stretch of road I travel on.",
  },
  {
    name: "Suzanne G.",
    zip: "02130",
    quote: "I have stopped biking to work because it is so dangerous to get to the bike path.",
  },
  {
    name: "Will O-M.",
    zip: "02130",
    quote: "When cycling I feel the need to go on the sidewalk because of the lack of bike lanes and recklessness of the drivers.",
  },
  {
    name: "Matt R.",
    zip: "02136",
    quote: "The Hyde Park Ave side of the street is a terrible place to be a walker, pedestrian, bus rider, or even a driver. It is not a safe corridor!",
  },
  {
    name: "Jack D.",
    zip: "02131",
    quote: "The best time and most cost-effective way to create safer streets is BEFORE and DURING repaving work, NOT afterwards.",
  },
  {
    name: "Robyn O.",
    zip: "02130",
    quote: "I and so many other people I know are afraid to cycle in Boston. Hyde Park Avenue is a particularly challenging road.",
  },
  {
    name: "Amandine A.",
    zip: "02130",
    quote: "There is no infrastructure that supports safe crossing, and cars feel free to speed up to an unreasonable extent due to the open plan design.",
  },
  {
    name: "Linda B.",
    zip: "02131",
    quote: "I seriously feel it is a life-risking choice to ride my bike on that stretch of Hyde Park Ave.",
  },
  {
    name: "Christopher C.",
    zip: "02130",
    quote: "Every day on my way to the station I see cars speeding, cars running red lights, cars blocking pedestrian lines of sight, and cars moving erratically.",
  },
  {
    name: "Alysse",
    zip: "02130",
    quote: "I avoid going in the southwest direction on Hyde Park Ave because the crossings are not safe for a pedestrian.",
  },
  {
    name: "Laura M.",
    zip: "02130",
    quote: "Sometimes I bike on the sidewalk because I fear for my life.",
  },
  {
    name: "Raechel S.",
    zip: "02130",
    quote: "Please don’t just pave over this problem. We need a new commuting infrastructure first.",
  },
  {
    name: "Lisa T.",
    zip: "02130",
    quote: "I am afraid to let my kids ride bikes to Forest Hills because of the speeding cars and curvature in the road.",
  },
  {
    name: "June C.",
    zip: "02130",
    quote: "As a senior citizen who lives to walk Hyde Park Avenue is dangerous.",
  },
  {
    name: "Molly P.",
    zip: "02130",
    quote: "I cross this road every day to get to work.",
  },
  {
    name: "Andrea S.",
    zip: "02131",
    quote: "Please actually implement safer streets ideas for our biking community. I am tired of being so afraid.",
  },
  {
    name: "Bonnie T.",
    zip: "02130",
    quote: "The safety of pedestrians near the bus turn-in is paramount.",
  },
  {
    name: "Rosa H.",
    zip: "02130",
    quote: "Repaving without improvements will condemn our neighborhood to a dangerous street for years to come.",
  },
  {
    name: "Jessica G.",
    zip: "02130",
    quote: "We currently only use the sidewalks in that area because it is not safe to use the road.",
  },
  {
    name: "Molly M.",
    zip: "02130",
    quote: "I want to stay in this apartment for a long time and if these safety concerns aren’t addressed before repaving then that will affect my quality of life here significantly.",
  },
  {
    name: "Mallika S.",
    zip: "02131",
    quote: "It functions as a literal highway with no space for cyclists and no crosswalks with signals for pedestrians.",
  },
  {
    name: "Susan S.",
    zip: "02131",
    quote: "In every one of those modes, this stretch of Hyde Park Avenue is frightening.",
  },
  {
    name: "Sandy B.",
    zip: "02131",
    quote: "Repaving alone risks increasing car speeds without protecting anyone.",
  },
  {
    name: "Nancy R.",
    zip: "02130",
    quote: "I also regularly walk with my kids to Forest Hills T stop.",
  },
];

const plans: Plan[] = [
  {
    id: "current",
    tab: "August 2026",
    date: "August 2026",
    label: "Original repaving proposal",
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
    verdict: "Better than the August 2026 proposal, but it leaves the street wide and does little for cyclists.",
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
const letterSalutation = "Dear Chief of Streets Osgood, Deputy Chief of Policy Robbins, and Mayor Wu,";

const timelinePhases: TimelinePhase[] = [
  {
    range: "Before 2019–2023",
    title: "Plans, studies, and promises",
    entries: [
      {
        date: "2009–2018",
        title: "A decade of studies",
        body: "Boston studied traffic, walking, and biking conditions along Hyde Park Avenue. The MBTA studied Route 32 bus stops, and the regional planning agency analyzed congestion and bus operations.",
        images: [
          {
            src: "/timeline/decade-of-studies.webp",
            alt: "Hyde Park Avenue looking north toward Forest Hills, with four travel lanes and cars parked on both sides",
            width: 1200,
            height: 733,
          },
        ],
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
    openingImage: {
      src: "/timeline/resident-signs.webp",
      alt: "Handmade yellow signs calling on Boston and Mayor Wu to make streets safer for walking and biking",
      width: 900,
      height: 1200,
      caption: "Residents have been asking for the same basic promise: streets that are safe to walk and bike.",
    },
    closingImage: {
      src: "/timeline/safety-walk-poster-2023.webp",
      alt: "Poster for a January 28 Hyde Park Avenue safety walk beginning at Forest Hills Station",
      width: 695,
      height: 900,
      caption: "Poster for the January 2023 Hyde Park Avenue Safety Walk.",
    },
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
        images: [
          {
            src: "/timeline/glenn-inghram.webp",
            alt: "WBZ news report showing Glenn Inghram with two dogs",
            width: 1200,
            height: 837,
            caption: "Residents and Glenn Inghram’s family called for safety changes near Forest Hills Station.",
          },
        ],
        links: [
          { label: "Vigil and resident letter", href: "https://www.boston.com/news/transportation/2024/10/22/jamaica-plain-community-hosts-vigil-for-man-killed-by-mbta-bus/?amp=1" },
          { label: "City’s signal promise", href: "https://mass.streetsblog.org/2024/10/25/boston-officials-will-adjust-traffic-signals-at-fatal-crash-scene-in-forest-hills" },
        ],
      },
      {
        date: "December 2024–January 2025",
        title: "Open houses—but no designs",
        body: "Roughly 110 people attended two City open houses advertised as draft-design meetings. No designs were shown. Residents again asked for protected bike space, a road diet, traffic calming, and better transit.",
        images: [
          {
            src: "/timeline/open-house-presentation.webp",
            alt: "A City of Boston staff member presenting a slide summarizing residents’ pedestrian, transit, bicycle, and traffic concerns",
            width: 1200,
            height: 800,
          },
          {
            src: "/timeline/open-house-crowd.webp",
            alt: "A crowded Hyde Park Avenue public meeting with residents seated and standing in a school auditorium",
            width: 1200,
            height: 801,
          },
        ],
        links: [
          { label: "City presentation", href: "https://www.boston.gov/sites/default/files/file/2024/12/Hyde%20Park%20Ave%20Open%20House%20-%20December%2011%2C%202024.pdf" },
        ],
      },
      {
        date: "January–April 2025",
        title: "709 residents call for action",
        body: "An open letter demanded safety and transit improvements in 2025—and an end to meetings without proposals. In April, about 50 residents led their own safety walk to document what needed to change.",
        images: [
          {
            src: "/timeline/safety-walk-2025.webp",
            alt: "Forest Hills residents gathered on a corner during the April 2025 Hyde Park Avenue safety walk",
            width: 1200,
            height: 800,
            caption: "Residents organized their own safety walk in April 2025.",
          },
        ],
        links: [
          { label: "Read the open letter", href: "https://mass.streetsblog.org/2025/01/24/guest-column-lethal-hyde-park-avenue-needs-changes-not-more-meetings" },
        ],
      },
    ],
  },
  {
    range: "May 2025–September 2026",
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
        images: [
          {
            src: "/timeline/council-hearing-2025.webp",
            alt: "Boston City Councilors and officials seated onstage during the fall 2025 Hyde Park Avenue safety hearing",
            width: 1200,
            height: 676,
          },
        ],
        links: [
          { label: "Council hearing order", href: "https://www.boston.gov/sites/default/files/file/2025/09/Order%20for%20a%20hearing%20to%20discuss%20next%20steps%20to%20improve%20street%20safety%20on%20the%20northern%20stretch%20of%20Hyde%20Park%20Avenue%20from%20Walk%20Hill%20Street%20to%20the%20Arborway.pdf" },
          { label: "Watch the hearing", href: "https://www.youtube.com/watch?v=uZCm8TEn8UA&t=9437s" },
        ],
      },
      {
        date: "April 2026",
        title: "Mayor Wu joins the fourth safety walk",
        body: "The Mayor said some safety improvements might accompany fall repaving, but rejected major changes to the street and suggested dedicated bus and bike lanes were inappropriate because of car traffic.",
        images: [
          {
            src: "/timeline/mayor-wu-safety-walk.webp",
            alt: "Mayor Michelle Wu speaking to residents gathered inside Forest Hills Station during the fourth Hyde Park Avenue safety walk",
            width: 1200,
            height: 801,
          },
        ],
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
        title: "The August plan: paint and signs",
        body: "The City’s August plan keeps four lanes and adds paint, signs, and better sight lines for drivers. It omits the earlier safety designs and makes no changes at Ukraine Way.",
        links: [
          { label: "See the August plan", href: "/plans/august-2026.webp" },
        ],
      },
      {
        date: "September 2026",
        title: "Residents push for a better plan—and a path forward",
        body: "Forest Hills residents and the Boston Better Streets Coalition engaged extensively with new Interim Chief of Streets Chris Osgood, advocating for stronger safety improvements in the repaving plan and a path to get the broader Hyde Park Avenue project back on track. That engagement helped secure an expanded plan and renewed work on the corridor’s next steps.",
        links: [
          { label: "Updated City project page", href: "https://www.boston.gov/departments/transportation/hyde-park-avenue-multimodal-corridor" },
        ],
      },
    ],
  },
];

const thankYouLink = "mailto:mayor@boston.gov,michelle.wu@boston.gov,chris.osgood@boston.gov,tali.robbins@boston.gov,Anne.roach@boston.gov,Samantha.Montano@mahouse.gov,nathaniel.fink@boston.gov,amy.cording@boston.gov,benjamin.weber@boston.gov,bonnie.delaune@boston.gov,emily.sinsky@boston.gov,enrique.pepen@boston.gov,dianna.bronchuk@boston.gov,zavia.dickerson@boston.gov?bcc=bostonbetterstreets%40gmail.com&subject=Thank%20you%20for%20taking%20action%20on%20Hyde%20Park%20Ave";
const cityProjectLink = "https://www.boston.gov/departments/transportation/hyde-park-avenue-multimodal-corridor";

export default function Home() {
  const [activePlan, setActivePlan] = useState(defaultPlan);
  const [expanded, setExpanded] = useState(false);
  const [voiceScrollPosition, setVoiceScrollPosition] = useState<"start" | "middle" | "end">("start");
  const voicesScrollerRef = useRef<HTMLDivElement>(null);

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

  const scrollVoices = (direction: -1 | 1) => {
    const scroller = voicesScrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({ left: direction * scroller.clientWidth * 0.9, behavior: "smooth" });
  };

  const updateVoiceScrollPosition = (event: React.UIEvent<HTMLDivElement>) => {
    const scroller = event.currentTarget;
    const remaining = scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft;
    if (scroller.scrollLeft <= 4) setVoiceScrollPosition("start");
    else if (remaining <= 4) setVoiceScrollPosition("end");
    else setVoiceScrollPosition("middle");
  };

  return (
    <main>
      <section className="campaign-update" id="update" aria-labelledby="letter-title">
        <div className="update-backdrop">
          <img className="update-image" src="/hyde-park-avenue-october-2026.jpg" alt="Construction parking notices at Hyde Park Avenue and Weld Hill Street, with the Forest Hills clock tower behind them" width={2000} height={1500} fetchPriority="high" />
          <div className="update-shade" />
        </div>
        <div className="update-body">
          <article className="neighbor-letter">
            <p className="letter-date">October 6, 2026</p>
            <h1 id="letter-title">We organized. The City listened. Hyde Park Ave is getting safer.</h1>
            <p>Dear neighbors,</p>
            <p>In response to <a href="#archive">your advocacy</a>, the City has significantly improved its plans for the repaving of Hyde Park Avenue from Forest Hills to Walk Hill street, which starts tomorrow.</p>
            <p>For the past 18 months (or longer), hundreds of you have written emails, signed petitions, and attended community meetings. Most recently, you demanded that the City incorporate pedestrian safety into its scheduled repaving this fall.</p>
            <p>It worked.</p>
            <p>The City <a href={cityProjectLink} target="_blank" rel="noreferrer">has significantly expanded and improved the project</a>, including meaningful changes to the Ukraine Way intersection that so many of us cross on a daily basis. (See below for our summary of the highlights.)</p>
            <p>We have two (2) requests of you:</p>
            <h2>1. Take 30 seconds to thank the City</h2>
            <p>We ask a lot of our elected officials and municipal staff. When they listen and make something better, we should say so.</p>
            <p>The link below opens an email addressed to the Mayor, City Councillors Pepen and Weber, State Representative Montaño, and the Streets Cabinet. Add a sentence of your own and hit send.</p>
            <a className="letter-link-button" href={thankYouLink}>Thank the City for listening</a>
            <h2>2. Help us with the next round</h2>
            <p>This repaving is the first, long-overdue step. We’re already working with the City on what comes next, in 2027 and 2028, to address reckless driving, bus priority, and pedestrian and bike safety on the entire corridor.</p>
            <p>Know a neighbor who wants a better, safer Hyde Park Avenue? Forward them this email and have them join us.</p>
            <a className="letter-link-button secondary" href="https://www.bostonbetterstreets.org/join" target="_blank" rel="noreferrer">Join the Boston Better Streets Coalition</a>
            <p className="letter-signoff">Thank you for making this happen!<br /><strong>The Boston Better Streets Coalition</strong></p>
            <div className="letter-improvements">
              <h2>Here’s what’s changed in the repaving plan:</h2>
              <ul>
                <li>The City was going to repave Forest Hills Station ←→ Ukraine Way. They’ve now extended that all the way to Walk Hill Street.</li>
                <li>They were going to repaint standard-size pedestrian crosswalks. They will now use wider and more visible crosswalks. And will add concrete buffers to further protect crosswalks at Ukraine Way.</li>
                <li>They were going to leave the Ukraine Way intersection unchanged for now. Instead, they will improve on a 2025 proposal to calm traffic and make crossings safer.</li>
                <li>Stay tuned for detailed engineering drawings on the City’s website.</li>
              </ul>
              <figure className="ukraine-way-plan">
                <img src="/ukraine-way-updated-plan.png" alt="Design in progress for the Hyde Park Avenue and Ukraine Way intersection, showing crosswalks, lane markings, and traffic signal equipment" width={1127} height={509} loading="lazy" decoding="async" />
                <figcaption>Ukraine Way · design in progress</figcaption>
              </figure>
              <p className="city-update-link"><a href={cityProjectLink} target="_blank" rel="noreferrer">Read the City’s update on Hyde Park Avenue</a></p>
            </div>
          </article>
        </div>
      </section>

      <section className="archive-notice" id="archive" aria-labelledby="archive-heading">
        <h2 id="archive-heading">Campaign archive</h2>
      </section>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/hyde-park-avenue-forest-hills.webp"
          alt="Traffic on Hyde Park Avenue at Forest Hills"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Archived campaign · August–September 2026</p>
          <h2 className="archive-hero-title">Don’t repave our street</h2>
          <p className="hero-summary">
            The City of Boston is planning to repave three blocks of Hyde Park
            Avenue without even pretending to address speeding, reckless
            driving, or pedestrian safety on the corridor.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#plans">Learn more</a>
            <a className="button button-quiet" href="#write">View the archived action</a>
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
            <a className="section-cta" href="#update">Read the October update <span aria-hidden="true">↑</span></a>
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

      <section className="voices-section" aria-labelledby="voices-heading">
        <div className="voices-heading">
          <div>
            <p className="section-kicker">In their own words</p>
            <h2 id="voices-heading">Why neighbors wrote</h2>
          </div>
          <div className="voices-heading-copy">
            <p>
              Residents describe a street they avoid, endure, and fear. These
              writers gave permission to share their words.
            </p>
            <a className="voices-cta" href="#write">View the archived action <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div
          className="voices-grid"
          aria-label="Approved resident excerpts"
          ref={voicesScrollerRef}
          onScroll={updateVoiceScrollPosition}
        >
          {residentVoices.map((voice) => (
            <figure className="voice-card" key={`${voice.name}-${voice.zip}-${voice.quote}`}>
              <blockquote>“{voice.quote}”</blockquote>
              <figcaption>{voice.name} <span aria-hidden="true">·</span> {voice.zip}</figcaption>
            </figure>
          ))}
        </div>
        <div className="voices-navigation" aria-label="Resident voice navigation">
          <p>{residentVoices.length} approved resident voices</p>
          <div className="voices-buttons">
            <button type="button" onClick={() => scrollVoices(-1)} disabled={voiceScrollPosition === "start"}>
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" onClick={() => scrollVoices(1)} disabled={voiceScrollPosition === "end"}>
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      <section className="action-section" id="write">
        <div className="action-intro">
          <p className="section-kicker light-kicker"><span className="retired-action-label">Take action</span> · Campaign closed</p>
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
          <a className="action-history-link" href="#receipts">See the campaign’s history <span aria-hidden="true">↓</span></a>
        </div>

        <div className="letter-card archived-letter-card">
          <div className="closed-stamp"><span aria-hidden="true">×</span> Email action closed</div>
          <p className="archived-form-note" id="archived-form-note">Preserved for the record. This form no longer accepts messages or opens email drafts.</p>
          <fieldset disabled aria-describedby="archived-form-note">
          <legend className="sr-only">Original campaign email form — closed</legend>
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
          <input id="subject" value="Fix Hyde Park Avenue before you repave it" readOnly />

          <label htmlFor="letter">Write your own message</label>
          <p className="letter-encouragement" id="letter-encouragement">Your own experience will make the strongest case. Tell City leaders what happens here and what a safer street would change for you.</p>
          <textarea
            id="letter"
            rows={14}
            value={letterSalutation} readOnly
            aria-describedby="letter-encouragement"
            placeholder="Start with your own experience. What happens when you use Hyde Park Avenue? Have you had a close call? What would a safer design change for you, your family, or your neighbors?"
          />

          <div className="sender-fields">
            <div>
              <label htmlFor="sender-name">Your name (required)</label>
              <input
                id="sender-name"
                autoComplete="name"
                required
                value="" readOnly
              />
            </div>
            <div>
              <label htmlFor="street">Street (optional)</label>
              <input
                id="street"
                autoComplete="street-address"
                placeholder="e.g. Tower Street"
                value="" readOnly
              />
            </div>
            <div>
              <label htmlFor="zip-code">ZIP code (required)</label>
              <input
                id="zip-code"
                autoComplete="postal-code"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{5}(-[0-9]{4})?"
                required
                title="Enter a five-digit ZIP code, optionally followed by four more digits"
                value="" readOnly
              />
            </div>
            <p>Your name, street (if provided), and ZIP code will be added to the bottom of the email.</p>
          </div>

          <label className="publication-consent">
            <input
              type="checkbox"
              checked={false} readOnly
            />
            <span>
              Please help us amplify our message.
              <small>Check this box to allow us to share your first name, last initial, ZIP code, and an excerpt from your comments.</small>
            </span>
          </label>

          <div className="letter-actions">
            <button className="send-button" type="button" disabled>Open draft in my email <span aria-hidden="true">→</span></button>
            <button className="copy-button" type="button" disabled>Copy message</button>
          </div>
          </fieldset>
        </div>
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
            delay, retreat, and a plan that left the danger in place. In September
            2026, residents pushed again—and helped secure a better path forward.
          </p>
        </div>

        <div className="timeline-phases">
          {timelinePhases.map((phase, phaseIndex) => (
            <section className={`timeline-phase phase-${phaseIndex + 1}`} key={phase.range}>
              <p className="phase-range">{phase.range}</p>
              <h3>{phase.title}</h3>
              {phase.openingImage && (
                <figure className="phase-photo phase-opening-photo">
                  <img
                    src={phase.openingImage.src}
                    alt={phase.openingImage.alt}
                    width={phase.openingImage.width}
                    height={phase.openingImage.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {phase.openingImage.caption && <figcaption>{phase.openingImage.caption}</figcaption>}
                </figure>
              )}
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
                    {entry.images && (
                      <div className={`timeline-gallery${entry.images.length > 1 ? " photo-pair" : ""}`}>
                        {entry.images.map((timelineImage) => (
                          <figure key={timelineImage.src}>
                            <img
                              src={timelineImage.src}
                              alt={timelineImage.alt}
                              width={timelineImage.width}
                              height={timelineImage.height}
                              loading="lazy"
                              decoding="async"
                            />
                            {timelineImage.caption && <figcaption>{timelineImage.caption}</figcaption>}
                          </figure>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>
              {phase.closingImage && (
                <figure className="phase-photo">
                  <img
                    src={phase.closingImage.src}
                    alt={phase.closingImage.alt}
                    width={phase.closingImage.width}
                    height={phase.closingImage.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {phase.closingImage.caption && <figcaption>{phase.closingImage.caption}</figcaption>}
                </figure>
              )}
            </section>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <p>
          Organized by Forest Hills residents and the Boston Better Streets
          Coalition. For questions or media information, <a href="mailto:bostonbetterstreets@gmail.com">email here</a>.
        </p>
      </footer>

      {expanded && (
        <div className="plan-modal" role="dialog" aria-modal="true" aria-label={`${activePlan.date} enlarged plan`}>
          <button className="modal-close" type="button" onClick={() => setExpanded(false)} aria-label="Close enlarged plan">Close ×</button>
          <img src={activePlan.image} alt={activePlan.alt} />
        </div>
      )}
    </main>
  );
}
