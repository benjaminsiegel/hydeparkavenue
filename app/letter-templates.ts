export type LetterVariant = {
  subject: string;
  body: string;
};

export type LetterCategory = {
  id: string;
  label: string;
  variants: LetterVariant[];
};

export const defaultSubjects = [
  "Hyde Park Avenue: Don’t repave without real safety changes",
  "Hyde Park Avenue deserves more than asphalt and paint",
  "Fix Hyde Park Avenue before you repave it",
  "Hyde Park Avenue resurfacing must include safety",
  "Forest Hills is asking for a safer Hyde Park Avenue",
  "Do not lock in an unsafe Hyde Park Avenue for years",
  "Use this fall’s repaving to make Hyde Park Avenue safer",
  "A smoother Hyde Park Avenue is not a safer Hyde Park Avenue",
  "Mayor Wu: choose safety on Hyde Park Avenue",
  "Hyde Park Avenue needs a safety plan, not just new pavement",
];

export const letterCategories: LetterCategory[] = [
  {
    id: "resident",
    label: "As a Forest Hills resident",
    variants: [
      {
        subject: "Forest Hills residents need a safer Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

I live in Forest Hills and use Hyde Park Avenue regularly. [Describe when and how you use the street, and what you see there.]

The current plan would give us smoother pavement while leaving speeding, reckless driving, difficult crossings, and the missing bicycle connection essentially unchanged. After years of resident participation, that is not an acceptable result.

Please do not repave these blocks until the City includes lasting safety improvements. This is a rare opportunity to fix a dangerous street; Boston should not pave over it.`,
      },
      {
        subject: "Hyde Park Avenue deserves more than another temporary fix",
        body: `Dear Mayor Wu and Streets Team,

Forest Hills residents have attended meetings, signed letters, joined safety walks, and explained the same problems for years. I have personally experienced [describe a problem you encounter on Hyde Park Avenue].

The City’s answer cannot be three blocks of asphalt, paint, and signs. Repaving without changing the design will preserve the conditions that make the street unsafe—and could encourage even faster driving.

Please return with a plan that calms traffic, protects crossings, and connects people walking, biking, and taking transit before repaving begins.`,
      },
      {
        subject: "Do not lock in an unsafe Hyde Park Avenue for years",
        body: `Dear Mayor Wu and Streets Team,

I am writing as a Forest Hills resident because the fall repaving plan would lock an inadequate design into place for many years. [Share what part of the corridor concerns you most.]

Residents supported a practical three-lane alternative in 2025 because it would have reduced conflicts and added real pedestrian protection. Abandoning that work in favor of paint and signs ignores both the evidence and the community.

Pause the current proposal and use the resurfacing project to make permanent safety improvements now.`,
      },
      {
        subject: "Mayor Wu: listen to Forest Hills on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

What was the purpose of years of public engagement if the final Hyde Park Avenue plan leaves the central safety problems untouched? Residents have consistently asked for slower traffic, shorter crossings, safer intersections, and a route for people biking.

For me, this matters because [add your own experience or concern]. The current design does not answer it.

Please listen to the people who live with this street every day. Do not repave Hyde Park Avenue until the plan reflects the safety improvements residents have repeatedly requested.`,
      },
      {
        subject: "Make Hyde Park Avenue safer while the street is already being rebuilt",
        body: `Dear Mayor Wu and Streets Team,

When a dangerous street is already being resurfaced, the responsible choice is to make it safer at the same time. I live nearby, and [describe how Hyde Park Avenue affects your daily life].

Boston has already studied stronger options. Choosing not to implement them is still a choice—one that leaves residents exposed and wastes a construction opportunity we may not get again for years.

Please revise the fall project to include meaningful traffic calming and permanent pedestrian, bicycle, and transit improvements before work begins.`,
      },
    ],
  },
  {
    id: "parent",
    label: "As a parent or caregiver",
    variants: [
      {
        subject: "Children need a safer Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

I use Hyde Park Avenue with my family, and [describe a crossing, trip, or moment that has felt unsafe]. The speed and behavior of drivers make ordinary trips feel far more dangerous than they should.

Fresh asphalt and paint will not protect a child crossing the street or slow a reckless driver. Please do not repave these blocks until the City includes permanent improvements that shorten crossings, calm traffic, and make families visible and protected.

Our children should not have to wait through another generation of plans and meetings for a safe street.`,
      },
      {
        subject: "Do not repave Hyde Park Avenue without protecting families",
        body: `Dear Mayor Wu and Streets Team,

Parents and caregivers make constant calculations on Hyde Park Avenue: Is there enough time to cross? Will a turning driver stop? Can a child safely bike or walk here? In my family, [describe the calculation you have to make].

The City’s proposal does nothing meaningful to change those conditions. A smoother roadway is not protection, and paint is not a substitute for a safer design.

Please redesign the project around the safety of children, caregivers, and everyone who needs more time or space before repaving begins.`,
      },
      {
        subject: "Hyde Park Avenue must be safe for children to cross",
        body: `Dear Mayor Wu and Streets Team,

No parent should have to teach a child that a neighborhood street is simply too dangerous to cross. Yet on Hyde Park Avenue, [describe where or why crossing feels unsafe for your family].

The City has considered pedestrian islands, shorter crossings, and fewer travel lanes. Those are the kinds of physical changes families need—not a plan centered on new pavement and better sight lines for drivers.

Please include permanent crossing protection and traffic calming in this fall’s work. Do not repave first and postpone safety again.`,
      },
      {
        subject: "Put family safety first on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

Hyde Park Avenue connects homes, schools, shops, buses, and Forest Hills Station. Families should be able to use that connection safely. My own experience is [share how your family travels here and what makes it difficult].

Repaving the same wide, fast street would send the message that vehicle movement matters more than the safety of the people who live here. Boston can do better.

Please adopt a design that slows drivers and protects people crossing before the resurfacing project moves forward.`,
      },
      {
        subject: "Give Forest Hills families a safer Hyde Park Avenue now",
        body: `Dear Mayor Wu and Streets Team,

Families have already waited through years of studies and engagement on Hyde Park Avenue. We should not be asked to wait through another paving cycle for basic safety improvements.

[Tell the City about a child, older relative, or other family member who uses this street.] Their safety depends on the street’s physical design, not on hoping every driver behaves perfectly.

Use this project to create shorter crossings, calmer traffic, and safer connections now. Please do not move ahead with repaving until those protections are part of the plan.`,
      },
    ],
  },
  {
    id: "walking",
    label: "As someone who walks here",
    variants: [
      {
        subject: "Hyde Park Avenue crossings cannot wait",
        body: `Dear Mayor Wu and Streets Team,

I regularly walk along and across Hyde Park Avenue. [Describe where you cross and what makes it difficult or frightening.]

The current proposal leaves long, exposed crossings and dangerous driving patterns essentially unchanged. A fresh coat of paint is not a pedestrian safety plan. Please use this opportunity to add lasting protection, especially at Ukraine Way and other places where people struggle to cross safely.

Do not repave Hyde Park Avenue until the design takes the safety of people walking seriously.`,
      },
      {
        subject: "Make Hyde Park Avenue safe to cross before repaving",
        body: `Dear Mayor Wu and Streets Team,

Crossing Hyde Park Avenue should not require courage, luck, or a sprint. At [name a location], I experience [describe the problem: speed, distance, turning cars, visibility, or signal timing].

New asphalt does not shorten that crossing or give a person anywhere to wait safely. The City has already developed alternatives with pedestrian islands and curb extensions; the current plan abandons those protections.

Please restore meaningful pedestrian improvements and calm traffic before resurfacing the street.`,
      },
      {
        subject: "Paint is not pedestrian protection on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

The City’s Hyde Park Avenue plan asks people walking to trust paint and signs while four lanes of traffic remain. My experience at [location] shows why that is not enough: [tell what happens there].

Pedestrian safety requires physical protection—shorter crossings, islands, curb extensions, slower speeds, and signals that account for dangerous driver behavior.

Please do not call resurfacing progress while leaving people exposed. Revise the plan to include permanent pedestrian safety measures before repaving begins.`,
      },
      {
        subject: "Shorten and protect Hyde Park Avenue crossings",
        body: `Dear Mayor Wu and Streets Team,

People walking on Hyde Park Avenue are expected to cross a wide roadway while monitoring several lanes, turning vehicles, and drivers who may run the light. [Describe a crossing you use or avoid.]

The three-lane alternative presented in 2025 would have reduced conflicts and created room for real pedestrian protection. The current plan does neither.

Please choose a design that makes crossings shorter and more predictable. Do not repave Hyde Park Avenue until people can cross it with dignity and safety.`,
      },
      {
        subject: "Hyde Park Avenue needs a pedestrian safety plan",
        body: `Dear Mayor Wu and Streets Team,

Walking is how many residents reach buses, businesses, homes, and Forest Hills Station. Yet [describe how the street interrupts or endangers one of your walking trips].

The proposed repaving treats pedestrian safety as an edge condition instead of a basic purpose of the street. Better sight lines for drivers are not enough when speed and crossing distance remain unchanged.

Please make safe crossings a central requirement of this project and implement lasting improvements before laying new asphalt.`,
      },
    ],
  },
  {
    id: "biking",
    label: "As someone who bikes here",
    variants: [
      {
        subject: "Hyde Park Avenue still needs a safe bicycle connection",
        body: `Dear Mayor Wu and Streets Team,

I bike in and around Forest Hills, and Hyde Park Avenue does not provide a safe, clear way to continue my trip. [Describe the route you take or a place where you are forced into danger.]

The City has previously studied designs with meaningful bicycle connections, yet the current repaving plan offers none. New asphalt without a safe route will only preserve the same dangerous conditions.

Please do not repave these blocks until the City adopts a design that protects people biking as well as people walking and driving.`,
      },
      {
        subject: "Do not strand bike riders at Forest Hills on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

Forest Hills is a major transportation hub, but people arriving by bike are left without a safe way to continue along Hyde Park Avenue. I encounter this gap when [describe your route or destination].

That missing connection has been documented for years. Repaving without addressing it would make the omission harder and more expensive to fix later.

Please include a safe, legible bicycle connection in the project before construction begins. A transportation hub should connect people—not abandon them at the edge of a dangerous road.`,
      },
      {
        subject: "New pavement will not make biking on Hyde Park Avenue safe",
        body: `Dear Mayor Wu and Streets Team,

Smoother pavement can make a street more comfortable to bike on, but it cannot make four fast traffic lanes safe. On Hyde Park Avenue, [share a close pass, merge, turn, or other problem you experience].

The current plan adds no protected route and makes no meaningful change to driver behavior. The City’s earlier proposals showed that allocating safer space is possible.

Please use the resurfacing project to build a real bicycle connection and calm traffic rather than simply renewing the status quo.`,
      },
      {
        subject: "Restore a safe bike route to the Hyde Park Avenue plan",
        body: `Dear Mayor Wu and Streets Team,

Boston developed a 2020 multimodal design and a 2025 three-lane option that both made room for people biking. The finalized plan has erased that progress.

For me, the consequence is [describe where you ride, where the route ends, or what alternative you take]. Paint and signs will not solve it.

Please explain why the bicycle connection disappeared and restore a safe route before repaving Hyde Park Avenue. Years of planning should lead to implementation, not retreat.`,
      },
      {
        subject: "Hyde Park Avenue should connect every way people travel",
        body: `Dear Mayor Wu and Streets Team,

Hyde Park Avenue carries people walking, biking, driving, and taking transit, but the repaving plan is designed almost entirely around cars. [Describe your bicycle trip and why this corridor matters to it.]

A complete street cannot simply leave one group without a safe path. This fall’s construction is the moment to correct the gap at Forest Hills and create a predictable connection.

Please revise the design so people biking are protected and connected before the street is resurfaced.`,
      },
    ],
  },
  {
    id: "transit",
    label: "As a bus or transit rider",
    variants: [
      {
        subject: "Make Hyde Park Avenue safer for transit riders",
        body: `Dear Mayor Wu and Streets Team,

I use Hyde Park Avenue to reach buses and Forest Hills Station. [Describe your regular trip and the part that feels unsafe or unreliable.]

People should be able to walk, bike, and cross the street safely on the way to transit. The current plan does not meaningfully improve those connections, despite years of study and earlier proposals that did.

Please do not treat new asphalt as progress. Repave Hyde Park Avenue only after the City has incorporated lasting safety and transit improvements.`,
      },
      {
        subject: "A safer Hyde Park Avenue is essential to reaching the bus",
        body: `Dear Mayor Wu and Streets Team,

A bus stop is only useful if people can reach it safely. On my trip along Hyde Park Avenue, [describe a crossing, stop, or transfer that is difficult].

The resurfacing plan focuses on the roadway while ignoring the walking and biking connections every transit trip depends on. It also abandons earlier work on bus priority.

Please redesign this project around complete trips: safer crossings, calmer traffic, and reliable access to buses and Forest Hills Station before repaving begins.`,
      },
      {
        subject: "Do not repave Hyde Park Avenue and ignore Route 32 riders",
        body: `Dear Mayor Wu and Streets Team,

Route 32 riders have been part of Hyde Park Avenue studies for more than a decade, yet the current plan offers no meaningful transit improvement. I rely on this corridor for [describe your trip or destination].

New pavement will not make the bus more reliable or make the walk to a stop safer. After so much study, riders deserve more than maintenance presented as progress.

Please include safety and transit improvements in the fall project rather than postponing them again.`,
      },
      {
        subject: "Hyde Park Avenue repaving must improve access to Forest Hills",
        body: `Dear Mayor Wu and Streets Team,

Forest Hills Station serves thousands of daily trips, and Hyde Park Avenue is one of its most important approaches. [Explain how you reach the station and where the trip breaks down.]

The City’s proposal leaves unsafe crossings and the missing bicycle connection in place. That makes transit harder to reach and undermines Boston’s own transportation goals.

Please use resurfacing to create safer, more direct access to Forest Hills for everyone—not only people arriving by car.`,
      },
      {
        subject: "Bring safety and bus priority back to Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

The City once described Hyde Park Avenue as a multimodal corridor project, with bus priority and safer bicycle connections. The current plan has been reduced to asphalt, signs, and paint.

As a transit rider, I experience [describe delay, crowding, an unsafe stop, or a difficult connection]. Those problems have not disappeared simply because the plan stopped addressing them.

Please restore the project’s multimodal purpose and make lasting safety and transit improvements before repaving.`,
      },
    ],
  },
  {
    id: "driving",
    label: "As someone who drives here",
    variants: [
      {
        subject: "A safer Hyde Park Avenue will help responsible drivers too",
        body: `Dear Mayor Wu and Streets Team,

I drive on Hyde Park Avenue and regularly see [describe speeding, weaving, red-light running, or another dangerous behavior]. The street’s design encourages behavior that puts everyone at risk, including careful drivers.

Resurfacing without redesigning the street will not solve that problem—and smoother pavement may make speeding even easier. Please adopt permanent traffic-calming and crossing improvements before repaving these blocks.

Drivers, pedestrians, cyclists, and transit riders all need a street designed for predictable, safe travel.`,
      },
      {
        subject: "Stop dangerous weaving and speeding on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

Behind the wheel on Hyde Park Avenue, I see how four lanes invite drivers to weave, pass, and race toward the next red light. [Describe what you regularly observe and where.]

Paint and signs will not change that pattern. The three-lane option presented in 2025 would have reduced conflict points and made driving more orderly as well as safer for people crossing.

Please reconsider that approach and calm the street before repaving it.`,
      },
      {
        subject: "Do not make Hyde Park Avenue smoother but just as dangerous",
        body: `Dear Mayor Wu and Streets Team,

As someone who drives this corridor, I am concerned that fresh asphalt without design changes will make an already fast street feel even faster. At [location], I have seen [describe a dangerous maneuver or recurring problem].

Good street design helps responsible drivers know where to be and discourages aggressive behavior. The current plan does neither.

Please include lane reduction, traffic calming, and protected crossings in the project before putting down new pavement.`,
      },
      {
        subject: "Hyde Park Avenue needs predictable traffic, not four unsafe lanes",
        body: `Dear Mayor Wu and Streets Team,

Driving should not require guessing whether another vehicle will speed past, cut across lanes, or run the light at Ukraine Way. [Share what you experience while driving here.]

The wide four-lane design creates unnecessary conflict and makes every road user less predictable. A three-lane configuration could organize turns, reduce weaving, and create space for safety improvements.

Please choose a design that makes Hyde Park Avenue calmer and more predictable before repaving begins.`,
      },
      {
        subject: "Traffic safety on Hyde Park Avenue requires a better design",
        body: `Dear Mayor Wu and Streets Team,

Dangerous driving is not only a matter of individual choices; Hyde Park Avenue’s design enables it. I see the results when [describe a routine condition or incident].

The City’s plan maintains the same lane configuration and expects signs and markings to carry the burden. That is not a serious response to years of documented speeding and red-light running.

Please redesign the street to encourage safe driving speeds and protect everyone before resurfacing it.`,
      },
    ],
  },
  {
    id: "accessibility",
    label: "About age or accessibility",
    variants: [
      {
        subject: "Hyde Park Avenue must be safe at every age and ability",
        body: `Dear Mayor Wu and Streets Team,

Hyde Park Avenue’s long and exposed crossings are especially difficult for older residents, disabled people, and anyone who needs more time to cross. [Share your own experience or that of someone you know.]

Paint and signs do not provide the physical protection people need. The City should shorten crossings, slow drivers, and design for people with a wide range of ages and abilities.

Please do not repave Hyde Park Avenue until those lasting safety improvements are part of the plan.`,
      },
      {
        subject: "Give people enough time and protection to cross Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

The test of a safe crossing is not whether the fastest person can make it. It is whether an older adult, a disabled neighbor, or someone using a mobility aid can cross without being stranded or rushed.

At [location], [describe the difficulty you or someone you know faces]. The current proposal does not shorten the crossing or add a protected place to wait.

Please build accessibility into the street itself before repaving—not as a promise for some later project.`,
      },
      {
        subject: "Accessibility cannot be postponed on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

Residents who move more slowly cannot simply adapt to fast traffic and long crossings. [Describe an accessibility concern, destination, or person affected.]

Boston has already considered designs with curb extensions and pedestrian islands. Dropping those features from the resurfacing plan means knowingly leaving a barrier in place for years.

Please restore permanent crossing protections and calm traffic before the City repaves Hyde Park Avenue.`,
      },
      {
        subject: "Design Hyde Park Avenue for the people who need protection most",
        body: `Dear Mayor Wu and Streets Team,

Street safety should be measured from the perspective of the person most at risk—not the convenience of the fastest driver. On Hyde Park Avenue, [share an experience involving age, disability, vision, hearing, balance, or mobility].

The current plan improves pavement and driver sight lines but offers little physical protection to the person crossing.

Please revise the project around universal access: shorter crossings, slower traffic, and clear, protected routes before resurfacing begins.`,
      },
      {
        subject: "A smoother Hyde Park Avenue is still a barrier without safe crossings",
        body: `Dear Mayor Wu and Streets Team,

New pavement may improve the road surface, but it does not remove the barrier Hyde Park Avenue creates for people who cannot cross quickly. [Describe how this affects you, your family, or a neighbor.]

If the City resurfaces without adding islands, curb extensions, and safer signal operations, that barrier will remain for another paving cycle.

Please make accessibility and pedestrian protection part of the construction happening now. Do not separate repaving from safety.`,
      },
    ],
  },
  {
    id: "close-call",
    label: "After a close call",
    variants: [
      {
        subject: "My close call shows why Hyde Park Avenue cannot wait",
        body: `Dear Mayor Wu and Streets Team,

I had—or witnessed—a close call on Hyde Park Avenue. [Describe what happened, where it happened, and how it affected you.]

Experiences like this are why residents have asked for meaningful safety changes for years. Repaving the street without addressing the design that enables speeding, red-light running, and unsafe crossings ignores what people are telling the City.

Please pause the current plan and make lasting safety improvements before putting down new asphalt.`,
      },
      {
        subject: "Hyde Park Avenue should not require another crash before action",
        body: `Dear Mayor Wu and Streets Team,

At [location], [describe your close call or one you witnessed]. The difference between that moment and a serious injury was luck—not a street designed to keep people safe.

The City already knows about the speeding, difficult crossings, and red-light running on this corridor. It should not take another crash to justify physical changes.

Please act on the evidence now. Redesign Hyde Park Avenue for slower traffic and protected crossings before repaving it.`,
      },
      {
        subject: "A dangerous moment on Hyde Park Avenue changed how I travel",
        body: `Dear Mayor Wu and Streets Team,

After [briefly describe what happened], I changed the way I use Hyde Park Avenue. [Explain whether you avoid a crossing, change routes, drive instead, or feel less safe.]

No resident should have to reorganize daily life around a preventable street danger. Asphalt, signs, and paint will not address the design that created that moment.

Please include permanent traffic calming and pedestrian protection in the project before resurfacing begins.`,
      },
      {
        subject: "Do not pave over the warning signs on Hyde Park Avenue",
        body: `Dear Mayor Wu and Streets Team,

Close calls are warning signs. Mine happened when [describe the event and location]. It revealed exactly the problems residents have documented: excessive speed, too many conflict points, and too little protection.

The City’s current proposal treats the surface while ignoring the cause. Repaving now would waste the chance to prevent the next close call from becoming a tragedy.

Please revise the design and make the needed safety changes first.`,
      },
      {
        subject: "Turn Hyde Park Avenue close calls into real safety action",
        body: `Dear Mayor Wu and Streets Team,

I am sharing a real experience because the risks on Hyde Park Avenue can sound abstract until they happen to someone: [tell your story].

Residents should not have to collect more frightening stories to prove this street needs a better design. The City has safer alternatives and a construction opportunity this fall.

Please use both. Do not repave Hyde Park Avenue until the project addresses the conditions behind these close calls.`,
      },
    ],
  },
  {
    id: "business",
    label: "As a local business customer or owner",
    variants: [
      {
        subject: "A safer Hyde Park Avenue will support Forest Hills businesses",
        body: `Dear Mayor Wu and Streets Team,

I own, work at, or regularly visit businesses near Hyde Park Avenue. [Describe your connection to the corridor.]

A safer street would make it easier for customers, workers, and neighbors to reach local businesses on foot, by bike, by transit, and by car. The current proposal misses that opportunity and leaves dangerous conditions in place.

Please do not repave these blocks until the City has included permanent safety improvements that support the people and businesses of Forest Hills.`,
      },
      {
        subject: "Hyde Park Avenue businesses need a street people can reach safely",
        body: `Dear Mayor Wu and Streets Team,

Local businesses depend on people being able to cross the street, walk from transit, bike from nearby homes, and park without navigating chaos. At [business or location], [describe what customers or workers experience].

Fresh pavement does not improve those connections. Slower traffic, shorter crossings, and safer access would.

Please use the resurfacing project to strengthen the Forest Hills business district rather than preserving a street that divides it.`,
      },
      {
        subject: "Do not let unsafe traffic define Hyde Park Avenue’s business district",
        body: `Dear Mayor Wu and Streets Team,

Hyde Park Avenue should function as a neighborhood main street, not simply a route for fast through-traffic. I see the difference when [share your experience as a customer, owner, or worker].

The four-lane design makes crossing between businesses difficult and discourages people from lingering or arriving without a car. The current plan locks that problem in.

Please calm traffic and improve pedestrian access before repaving so the street better serves local businesses and residents.`,
      },
      {
        subject: "Invest in a safer Hyde Park Avenue commercial corridor",
        body: `Dear Mayor Wu and Streets Team,

Repaving is a public investment. On Hyde Park Avenue, that investment should deliver more than a smoother driving surface—it should create a safer, more welcoming commercial corridor.

[Describe a business you visit or operate and how street conditions affect it.] Permanent crossing and traffic-calming improvements would help customers and employees reach it safely.

Please revise the project so this fall’s work supports the long-term vitality of Forest Hills businesses.`,
      },
      {
        subject: "The safer Hyde Park Avenue option had business support",
        body: `Dear Mayor Wu and Streets Team,

Many local businesses joined hundreds of residents in supporting the three-lane alternative presented in 2025. That support reflected a simple truth: a safer, calmer street is good for a neighborhood business district.

My connection to the area is [describe where you shop, work, own a business, or spend time]. The current plan offers little improvement to that experience.

Please reconsider the supported alternative and include lasting safety measures before repaving Hyde Park Avenue.`,
      },
    ],
  },
  {
    id: "accountability",
    label: "About the City’s broken process",
    variants: [
      {
        subject: "Hyde Park Avenue: seven years of engagement cannot end in paint",
        body: `Dear Mayor Wu and Streets Team,

After seven years of studies and public meetings, residents deserve more than three blocks of asphalt and paint. The City developed stronger alternatives—including a three-lane plan supported by 700 residents and many local businesses—but now refuses even to acknowledge those proposals.

That is not meaningful public engagement, and new asphalt is not a safety plan. Please explain why the safer alternatives were abandoned and do not repave Hyde Park Avenue until the design addresses speeding, unsafe crossings, and the needs of bus and bike riders.`,
      },
      {
        subject: "Explain why Boston abandoned the safer Hyde Park Avenue plan",
        body: `Dear Mayor Wu and Streets Team,

In May 2025, the City presented a three-lane Hyde Park Avenue option with permanent pedestrian protection and room for bicycle lanes. Hundreds of residents and many businesses supported it. Then the proposal disappeared.

The public deserves a clear explanation of what changed, who made that decision, and why the replacement plan removes the meaningful safety features.

Please answer those questions and pause repaving until a credible safety design is restored. Public engagement must influence the outcome.`,
      },
      {
        subject: "Do not call the Hyde Park Avenue process public engagement",
        body: `Dear Mayor Wu and Streets Team,

Residents attended open houses where no designs were shown, participated in surveys and safety walks, signed letters, and testified at a City Council hearing. The consistent request was for real safety improvements.

Presenting paint and signs as the final answer makes that participation feel performative. [Add what you did or what you expected from the process.]

Please do not repave Hyde Park Avenue until the City responds publicly to the community’s recommendations and restores meaningful safety changes.`,
      },
      {
        subject: "Boston made promises on Hyde Park Avenue—now deliver",
        body: `Dear Mayor Wu and Streets Team,

For years, Boston described Hyde Park Avenue as a multimodal corridor project. Officials discussed bus priority, bicycle connections, safer crossings, and immediate improvements. The current resurfacing plan delivers almost none of that.

The gap between the promises and the project is unacceptable. [Describe a meeting, promise, or proposal that mattered to you.]

Please honor the City’s commitments by incorporating lasting safety improvements before repaving begins.`,
      },
      {
        subject: "Hyde Park Avenue residents deserve an answer before repaving",
        body: `Dear Mayor Wu and Streets Team,

Why is the City moving forward with a Hyde Park Avenue plan that no one asked for while ignoring alternatives developed through its own process?

Residents deserve an answer before construction—not after the street has been repaved and the opportunity is gone. The City should publish its reasoning, explain the fate of the 2025 options, and show how the current design addresses documented danger.

Until it can do that, please pause the project and work with Forest Hills on a safer plan.`,
      },
    ],
  },
];
