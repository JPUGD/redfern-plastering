export type Service = {
  slug: string;
  icon: "wrench" | "home" | "hammer" | "droplets" | "layers" | "building";
  title: string;
  short: string;
  detail: string;
  includes: string[];
  span: string; // bento grid span classes
};

export const services: Service[] = [
  {
    slug: "repairs-patching",
    icon: "wrench",
    title: "Repairs & Patching",
    short:
      "Holes, cracks and impact damage patched and feathered flat — invisible once painted.",
    detail:
      "From door-handle punches to after-electrical cut-outs, we patch, tape and feather every repair flush with the surrounding surface. Small jobs are core work, not an inconvenience.",
    includes: [
      "Holes, dents and impact damage",
      "Stress and settlement cracks",
      "After-trades patches (electrical, data, AC)",
      "Single-sheet and multi-sheet repairs",
    ],
    span: "sm:col-span-3",
  },
  {
    slug: "renovations",
    icon: "home",
    title: "Renovations",
    short:
      "Whole-room and whole-home re-plaster for renovation projects, old and new.",
    detail:
      "Residential renovations are our specialty. Kitchens, bathrooms, living spaces — we strip out, re-sheet and finish to a paint-ready standard, coordinating around your other trades.",
    includes: [
      "Full-room re-sheet and finish",
      "Kitchen and bathroom strip-outs",
      "Wall and ceiling upgrades",
      "Working in with your build schedule",
    ],
    span: "sm:col-span-3",
  },
  {
    slug: "ceiling-repairs",
    icon: "hammer",
    title: "Ceiling Repairs",
    short:
      "Sagging ceilings, access cut-outs and ceiling patches keyed in and finished flush.",
    detail:
      "Ceilings are the hardest surface to get right — and the first place a bad patch shows. We reinstate cut-outs, re-fix sagging sheets and finish ceiling planes so the repair disappears under light.",
    includes: [
      "Access cut-out reinstatement",
      "Sagging and bulging ceiling re-fix",
      "Cornice and coving re-runs",
      "Water-stained sheet replacement",
    ],
    span: "sm:col-span-2",
  },
  {
    slug: "water-damage",
    icon: "droplets",
    title: "Water Damage Repairs",
    short:
      "Storm and leak damage re-lined, sealed and finished — insurance repair work welcome.",
    detail:
      "South-East Queensland weather is hard on ceilings and walls. After the leak is fixed, we replace saturated sheeting, treat stains and return the surface to paint-ready condition.",
    includes: [
      "Storm and leak damage re-lining",
      "Stain-sealing and sheet replacement",
      "Insurance repair scopes welcome",
      "Rushed turnarounds after wet weather",
    ],
    span: "sm:col-span-2",
  },
  {
    slug: "plasterboard-fitouts",
    icon: "layers",
    title: "New Plasterboard & Fit-outs",
    short:
      "New walls, extensions and room linings — set, taped and finished to level.",
    detail:
      "From a new laundry wall to a full extension, we set new plasterboard straight and finish it smooth: square-set or cornice, flush joints, clean corners.",
    includes: [
      "Extensions and new walls",
      "Garage and rumpus room linings",
      "Square-set and cornice finishes",
      "Level 4 and Level 5 finishes",
    ],
    span: "sm:col-span-2",
  },
  {
    slug: "commercial",
    icon: "building",
    title: "Commercial Projects",
    short:
      "Small-to-medium commercial repairs, make-goods and fit-outs across Brisbane.",
    detail:
      "Offices, retail and light commercial — repair and make-good work delivered on schedule with minimal disruption to your operation. Out-of-hours work can be arranged.",
    includes: [
      "Office and retail repairs",
      "Make-goods and refits",
      "Scheduled around your operating hours",
      "Reliable, tidy sites",
    ],
    span: "sm:col-span-6",
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you take on small jobs?",
    a: "Yes. Single patches, cracks and one-off repairs are core work — we specialise in small to medium residential and commercial projects, so a small job gets the same care as a full renovation.",
  },
  {
    q: "Do you do commercial work?",
    a: "Yes. Small to medium commercial projects — repairs, make-goods and fit-outs — with work scheduled to keep disruption to your operation to a minimum.",
  },
  {
    q: "How do I get a quote?",
    a: "Call or text 0425 743 992. Photos of the damage or the room help us scope the job faster and give you a clearer price sooner.",
  },
  {
    q: "What areas do you cover?",
    a: "We're Brisbane-based and work across the greater Brisbane region. If you're nearby and not sure, just ask.",
  },
  {
    q: "Will there be much mess?",
    a: "We protect floors and furnishings before we start and clean up at the end of each day. The aim is minimal disruption — you shouldn't be finding plaster dust a week later.",
  },
  {
    q: "Will the surface be ready to paint?",
    a: "Yes. Joints are taped, coated and feathered, then sanded smooth. The finished surface is ready for your painter — or for us to discuss a finish if you need one.",
  },
];

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  tag: string;
  own?: boolean; // Redfern's own work vs stock craft imagery
};

export const gallery: GalleryItem[] = [
  {
    src: "/images/work-ceiling-patch.jpg",
    alt: "Ceiling repair with an access patch feathered into the surrounding sheet",
    caption:
      "Ceiling repair — access patch set and feathered out into the surrounding sheet.",
    tag: "Our work",
    own: true,
  },
  {
    src: "/images/work-access-cut.jpg",
    alt: "Ceiling cut-away showing joists and insulation before the patch is reinstated",
    caption:
      "Ceiling cut-away re-lined — joists and insulation exposed while the new patch is keyed in.",
    tag: "Our work",
    own: true,
  },
  {
    src: "/images/work-tape-coat.jpg",
    alt: "Ceiling mid-plaster with joints and screw heads taped and first-coated",
    caption:
      "Tape and first coat — joints and set screws covered, ready for finishing coats.",
    tag: "Our work",
    own: true,
  },
  {
    src: "/images/work-resheet.jpg",
    alt: "Room with fresh plasterboard being mudded and taped across the ceiling",
    caption: "Full re-sheet in progress — mudding and taping across the ceiling plane.",
    tag: "Our work",
    own: true,
  },
  {
    src: "/images/stock-drywall-install.jpg",
    alt: "Plasterer applying compound to a wall during a bathroom renovation",
    caption: "Renovation lining — compound laid on and worked flat, board by board.",
    tag: "Renovations",
  },
  {
    src: "/images/stock-trowel-wall.jpg",
    alt: "Gloved hand plastering a wall smooth with a trowel",
    caption: "The skim — compound worked to a tight, even finish with the trowel.",
    tag: "Finishing",
  },
  {
    src: "/images/stock-putty-ladder.jpg",
    alt: "Tradesman with a trowel and ladder repairing an interior wall",
    caption: "Repair work at height — patch prepped, feathered and ready for paint.",
    tag: "Repairs",
  },
  {
    src: "/images/stock-power-sander.jpg",
    alt: "Close-up of a wall being power-sanded under bright light",
    caption: "Machine sanding under raking light — the last pass before primer.",
    tag: "Finishing",
  },
  {
    src: "/images/stock-sanding-mask.jpg",
    alt: "Worker in safety gear smoothing an interior wall",
    caption: "Surface prep done properly — contained, protected and dust-managed.",
    tag: "Repairs",
  },
  {
    src: "/images/stock-stilts-worker.jpg",
    alt: "Plasterer working on stilts inside a home renovation",
    caption: "Ceiling lines on stilts — how the big planes get finished clean.",
    tag: "Renovations",
  },
  {
    src: "/images/stock-trowel-cement.jpg",
    alt: "Close-up of a trowel loaded with compound",
    caption: "Loaded and ready — the right amount, every pass.",
    tag: "Finishing",
  },
  {
    src: "/images/stock-reno-room.jpg",
    alt: "Bright room mid-renovation with materials staged",
    caption: "Mid-renovation — linings staged, site kept tidy as we go.",
    tag: "Renovations",
  },
];

export type ProcessStep = {
  n: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Quote & prep",
    body: "Walk the job with you, agree the scope, and protect floors and furnishings before a tool comes out.",
  },
  {
    n: "02",
    title: "Set & tape",
    body: "Sheets set plumb and square, joints taped, first coat applied — the structure of the finish.",
  },
  {
    n: "03",
    title: "Skim coats",
    body: "Coats feathered out wider than you'd think necessary. That's what makes the repair disappear.",
  },
  {
    n: "04",
    title: "Sand & finish",
    body: "Sanded smooth under raking light, edges sealed, site cleaned — ready for paint.",
  },
];

export const marqueeItems = [
  "Repairs & patching",
  "Ceiling repairs",
  "Renovations",
  "Water damage",
  "Cornice & coving",
  "New plasterboard",
  "Commercial fit-outs",
  "Insurance repairs",
];