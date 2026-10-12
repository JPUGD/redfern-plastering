import type { Faq } from "@/lib/data";

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  note?: string;
};

export type ServicePageContent = {
  slug: string;
  key: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: ContentSection[];
  faqs: Faq[];
};

export type AreaPageContent = {
  slug: string;
  key: string;
  area: string;
  navLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  suburbs: string[];
  commonJobs: string[];
  extra: string;
};

/* ------------------------------------------------------------------ */
/* SERVICE PAGES                                                       */
/* ------------------------------------------------------------------ */

export const SERVICE_PAGES: Record<string, ServicePageContent> = {
  "plaster-repairs": {
    slug: "plaster-repairs",
    key: "plaster-repairs",
    name: "Plaster Repairs & Patching",
    h1: "Plaster repairs & patching, done properly",
    metaTitle: "Plaster & Gyprock Repairs Brisbane | Redfern",
    metaDescription:
      "Gyprock and plaster repairs across Brisbane — holes, cracks and cut-outs patched, taped and feathered flat. Same-day photo quotes. Call 0425 743 992.",
    intro:
      "A door-handle punch, a crack that reopens every winter, the hole your sparky left behind — small gyprock and plaster repairs are core work for us, not an inconvenience. Patched, taped and feathered flat, then sanded under raking light so the repair disappears.",
    sections: [
      {
        heading: "What we patch",
        bullets: [
          "Door-handle punches, dents and impact damage",
          "Settlement and truss-uplift cracks — re-taped, not just filled",
          "Cut-outs left by electricians, data cablers and air-con installers",
          "Nail and screw pops across older walls and ceilings",
          "Single-sheet and multi-sheet damage, walls and ceilings",
          "Rental changeover patch-ups — quick, tidy, documented",
        ],
      },
      {
        heading: "Why cracks keep coming back",
        paragraphs: [
          "Filling a crack with compound alone is a six-month fix. Brisbane homes move — truss uplift lifts ceiling edges every dry winter, frames settle, and an untaped fill simply splits back open with the season.",
          "We tape every crack we repair, so the joint moves with the house instead of tearing through the fill. That's the difference between a patch that lasts and one you redo next year.",
        ],
      },
      {
        heading: "What affects the price",
        bullets: [
          "How many patches we can batch into one visit",
          "Wall vs ceiling — height and overhead work",
          "Whether the surface is smooth or textured (texture blends are harder)",
          "Coats required and site access",
          "Paint — usually by your painter, or we can discuss it",
        ],
        note: "Every job gets a firm written price — text photos of the damage and small repairs are usually quoted the same day.",
      },
    ],
    faqs: [
      {
        q: "How much does it cost to patch a hole in a plaster wall?",
        a: "Small single patches are among our most common jobs, quoted in writing before we start. Photos of the damage from two or three angles will get you a firm price faster than a phone description.",
      },
      {
        q: "Is gyprock the same as plasterboard?",
        a: "Same thing — Gyprock is CSR's brand name and what most Brisbane tradies call it; plasterboard and drywall are the same product too. Whatever you call the wall, we patch it the same way: cut back to solid board, tape the joint, feather the coats, sand under raking light.",
      },
      {
        q: "Why does the same crack keep coming back?",
        a: "Almost always movement — truss uplift in ceilings or frame settling in walls. Filled without tape, the crack reopens as the house moves. We tape the crack so the repair flexes with the house instead of splitting.",
      },
      {
        q: "Can you match a textured ceiling when patching?",
        a: "Smooth finishes disappear completely. Heavier stipple or orbital textures can usually be blended, but an invisible match on decades-old texture isn't always possible — we'll tell you straight before we start rather than after.",
      },
    ],
  },

  "ceiling-repairs": {
    slug: "ceiling-repairs",
    key: "ceiling-repairs",
    name: "Ceiling Repairs",
    h1: "Ceiling repairs — the hardest surface to get right",
    metaTitle: "Ceiling Repairs Brisbane — Sagging & Cut-Outs | Redfern",
    metaDescription:
      "Sagging ceilings, access cut-outs, water stains and cracks — reinstated, re-fixed and finished so the repair disappears. Brisbane-wide. Call 0425 743 992.",
    intro:
      "Ceilings are the first place bad work shows — evening light rakes across the plane and exposes every ridge. We reinstate cut-outs, re-fix sagging sheets, replace water-stained board and finish ceiling planes so the repair disappears under light.",
    sections: [
      {
        heading: "Common ceiling jobs",
        bullets: [
          "Access cut-outs reinstated after hot-water, air-con or wiring work",
          "Sagging and bulging sheets — re-fixed or replaced",
          "Water-stained sheet replacement after storms and leaks",
          "Cornice repairs and re-runs where ceilings meet walls",
          "Nail and screw pops across 80s and 90s ceilings",
          "Ceiling cracks from truss uplift, taped so they stay closed",
        ],
      },
      {
        heading: "Repair or replace — the honest answer",
        paragraphs: [
          "Localised damage patches cleanly. But if a sheet has delaminated, is sagging wider than a patch can feather, or has been wet repeatedly, replacing the sheet costs less than fighting it — and finishes better.",
          "One safety note worth making: if your ceiling is pre-1990 fibro or hardboard rather than plasterboard, get it tested for asbestos before anyone cuts it. We'll flag it the moment we see it.",
        ],
      },
      {
        heading: "Why ceilings punish bad work",
        paragraphs: [
          "Gravity, a flat plane and raking light — three things that show up every shortcut. We feather ceiling coats wider than seems necessary, sand under raking light before we call it done, and drop-sheet everything below, because plaster dust travels.",
        ],
      },
    ],
    faqs: [
      {
        q: "How much does a ceiling repair cost in Brisbane?",
        a: "It depends mostly on size, height, access and whether it's a patch or a full sheet — every job is quoted in writing before work starts. Photos of the ceiling from below (and the roof space above, if there's been a leak) get you a firm price fastest.",
      },
      {
        q: "Can you repair a ceiling without repainting the whole ceiling?",
        a: "Usually — patch, spot-prime and blend. On aged ceilings where the paint has shifted colour over years of sun and smoke, a perfect colour match may need a full-ceiling repaint. We'll tell you which situation you're in before starting.",
      },
      {
        q: "How long before the repair can be painted?",
        a: "Multi-coat patches need each coat dry before the next — typically a few days in Brisbane humidity, longer in wet weather. Rushing the paint onto green compound is how you get a visible patch.",
      },
    ],
  },

  "renovation-plastering": {
    slug: "renovation-plastering",
    key: "renovation-plastering",
    name: "Renovation Plastering",
    h1: "Renovation plastering — rooms brought back to square",
    metaTitle: "Renovation Plastering Brisbane — Full Rooms & Homes | Redfern",
    metaDescription:
      "Full-room re-sheets, kitchen and bathroom strip-outs, square-set or cornice finishes — reno plastering that works in with your trades. Call 0425 743 992.",
    intro:
      "Residential renovations are our specialty. We strip out, re-sheet and finish to a paint-ready standard — and we work in with your chippy, sparky and painter so nobody's waiting on anybody.",
    sections: [
      {
        heading: "What a reno re-sheet involves",
        bullets: [
          "Full-room wall and ceiling re-sheets, old linings out",
          "Kitchen and bathroom strip-outs, with water-resistant board in wet areas",
          "Square-set or cornice — your call, both finished clean",
          "Wall straightening before the boards go on",
          "Working in with your build schedule, not around it",
        ],
      },
      {
        heading: "Level 4 vs Level 5 finishes, plainly",
        paragraphs: [
          "Level 4 is the industry standard — taped, coated, sanded, and ready for flat or low-sheen paint. Level 5 adds a full skim coat across the surface, and it's what gloss paint and raking wall-washer lights demand.",
          "Most rooms are Level 4. Hallways with downlights and feature walls going gloss are where Level 5 earns its cost. We'll tell you which you actually need — not the dearer one by default.",
        ],
      },
      {
        heading: "Why coordination matters",
        paragraphs: [
          "The cheapest reno plaster is the one that happens in the right order. Boards in after electrical rough-in, before the painter, with the cornice matching the era of the house where it shows. We plan the sequence with you up front.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you remove the old plaster or just cover it?",
        a: "For re-sheets we strip out and remove — boarding over damaged linings hides problems and eats room size. For sound linings that just look tired, a skim coat over the existing surface can be the faster, cheaper route.",
      },
      {
        q: "Can you match existing cornice in an older home?",
        a: "Standard 90mm cornice is easy to match. Ornate period cornice is matched by profile where available, or quoted after photos — it's a specialty job and we'll say so upfront.",
      },
      {
        q: "How long does a room re-sheet take?",
        a: "A standard bedroom — board, set, tape, three coats, sand — is typically several working days across visits, because coats need to dry between passes. We give you the sequence in writing before we start.",
      },
    ],
  },

  "water-damage-plaster-repairs": {
    slug: "water-damage-plaster-repairs",
    key: "water-damage-plaster-repairs",
    name: "Water Damage Plaster Repairs",
    h1: "Water-damaged walls & ceilings, sorted properly",
    metaTitle: "Water Damage Plaster Repairs Brisbane | Redfern",
    metaDescription:
      "Storm and leak damage re-lined, sealed and finished — with moisture checked before boards go back. Insurance scopes welcome. Call Redfern on 0425 743 992.",
    intro:
      "South-East Queensland weather is hard on ceilings. After the leak is fixed, we replace saturated sheeting, seal the stains and return the surface to paint-ready — and we check it's actually dry before anything gets boarded over.",
    sections: [
      {
        heading: "How we handle water damage",
        bullets: [
          "Fix the source first — no point re-lining a live leak",
          "Moisture check before re-boarding; trapped damp becomes mould",
          "Saturated sheets replaced, not patched and hoped-for",
          "Stain-blocking primer so the brown edge never ghosts through paint",
          "Written scope and photos for your insurer or assessor",
        ],
      },
      {
        heading: "Why speed saves money",
        paragraphs: [
          "A saturated ceiling is heavy and getting heavier. Left alone, a contained one-sheet repair can become a full-ceiling replacement once the sheet sags past recovery — and sagging wet board can drop without warning.",
          "Board it back while the damage is still one sheet, and the repair is quick and cheap. Wait until it spreads, and you're paying to re-line the whole room.",
        ],
      },
      {
        heading: "Insurance repairs",
        paragraphs: [
          "We do scopes for insurance repairs regularly: clear written scope, photos of damage before and after, and the finish documented so the assessor has everything needed. If your insurer wants their own trades, our scope still gives you a fair yardstick to measure their quote against.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you repair the leak too?",
        a: "No — the plumber or roofer fixes the source first. We do the re-line and finish once it's dry. Going in before the source is fixed means doing the job twice.",
      },
      {
        q: "Will the water stain come back through the paint?",
        a: "Not if it's sealed properly. We stain-block the water marks before finishing, which stops the tannin bleed that otherwise ghosts back through paint months later.",
      },
      {
        q: "How do you know the wall is dry enough to board over?",
        a: "We moisture-check the cavity and surrounding sheets before closing anything up. Trapped moisture behind fresh plasterboard is how you get mould in a wall that looks perfectly finished.",
      },
    ],
  },

  "plasterboard-installation": {
    slug: "plasterboard-installation",
    key: "plasterboard-installation",
    name: "New Plasterboard Installation",
    h1: "New plasterboard, set straight and finished smooth",
    metaTitle: "Plasterboard Installation Brisbane | Redfern",
    metaDescription:
      "Extensions, garages, rumpus rooms and conversions — plasterboard set plumb, taped and finished to Level 4 or 5, cornice or square-set. Call 0425 743 992.",
    intro:
      "From a new laundry wall to a full extension, we set new plasterboard straight and finish it smooth: taped joints, clean corners, square-set or cornice, ready for your painter.",
    sections: [
      {
        heading: "Where new linings earn their keep",
        bullets: [
          "Extensions and room conversions",
          "Garages and rumpus rooms brought inside the house",
          "Under-stair and storage nooks",
          "Room splits — one big room into two real bedrooms",
          "Ceiling drops for ducted air and feature bulkheads",
        ],
      },
      {
        heading: "Board choice, briefly",
        paragraphs: [
          "Standard 10mm board does most walls and ceilings. Wet areas — bathrooms, laundries, toilets — get water-resistant board by standard, not as an upsell. Fire-rated and acoustic board exists for specific separations; if your build needs it, we'll say so rather than guess.",
        ],
      },
      {
        heading: "Set, taped, finished",
        paragraphs: [
          "Plumb and square before the first screw — a wavy wall can't be fixed with compound, only hidden badly. Then taped joints, coated corners, and a finish sanded flat and checked under light before handover to paint.",
        ],
      },
    ],
    faqs: [
      {
        q: "How long does plasterboard installation take?",
        a: "Boarding a standard room is quick; the finish is what takes time — each coat needs to dry before the next. Across visits, a room typically runs several working days end to end.",
      },
      {
        q: "Do you do the framing too?",
        a: "We fix to existing or your builder's framing. If new framing is needed, that's a carpenter's scope — we're happy to coordinate so the frame arrives set for straight board.",
      },
      {
        q: "What finish level do I need?",
        a: "Level 4 for flat and low-sheen paints, Level 5 for gloss or walls under feature lighting. We advise per wall, not per invoice.",
      },
    ],
  },

  "commercial-plastering": {
    slug: "commercial-plastering",
    key: "commercial-plastering",
    name: "Commercial Plastering",
    h1: "Commercial repairs & fit-outs, on your schedule",
    metaTitle: "Commercial Plastering Brisbane — Offices & Retail | Redfern",
    metaDescription:
      "Small-to-medium commercial repairs, make-goods and fit-outs across Brisbane — scheduled around your operating hours, minimal disruption. Call 0425 743 992.",
    intro:
      "Offices, retail and light commercial — repair and make-good work delivered on schedule, with the site kept clean and your operation kept open.",
    sections: [
      {
        heading: "What we do commercially",
        bullets: [
          "Office and retail wall repairs between tenants",
          "Lease make-goods — damage made right before handback",
          "Fit-out linings for partitions, ceilings and features",
          "Storm and water damage in commercial ceilings",
          "Written scopes for facility managers and body corporates",
        ],
      },
      {
        heading: "Built around your operating hours",
        paragraphs: [
          "A shop can't close for a week of patching. We scope the work, then schedule it — after hours, early mornings, or in staged zones — so the trowels never cross the customer. Dust containment and clean-downs are part of the scope, not an extra.",
        ],
      },
      {
        heading: "Documentation for managers",
        paragraphs: [
          "You get a written scope before we start and a clean record after — photos, areas, finishes. If you manage multiple sites, the same scope format every job, so approval isn't a guessing game.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you work after hours or on weekends?",
        a: "Yes — out-of-hours work can be arranged for sites that can't close during trade. We factor it into the quote so there are no surprises on the invoice.",
      },
      {
        q: "What size commercial jobs do you take?",
        a: "Small to medium — repairs, make-goods and staged fit-out linings. For large multi-trade commercial builds we're honest that a bigger crew is a better fit, and we'll say so early.",
      },
      {
        q: "Can you quote from a schedule of rates?",
        a: "For repeat facility work, yes — a written scope or a schedule-of-rates approach both work. Tell us how your organisation buys trade services and we'll match it.",
      },
    ],
  },

  "cornice-repairs": {
    slug: "cornice-repairs",
    key: "cornice-repairs",
    name: "Cornice Repairs",
    h1: "Cornice repairs — cracks, matching & re-runs",
    metaTitle: "Cornice Repairs Brisbane — Cracks & Matching | Redfern",
    metaDescription:
      "Cracked cornice re-set and re-run, period pattern matching, cornice for new re-sheets. Brisbane-wide, from single mitres to whole-room runs. Call 0425 743 992.",
    intro:
      "Cornice is the trim that catches every crack a house produces — mitred joints open with seasonal movement, ceilings drop a millimetre, and the line above your wall starts telling stories. We re-set damaged sections, re-run lengths after wall removals, and match patterns where they still exist.",
    sections: [
      {
        heading: "Cornice work we do",
        bullets: [
          "Cracked and open mitres re-set — the joint, not just the crack",
          "Damaged sections cut out and re-run to match",
          "Cornice after wall removals and openings re-formed cleanly",
          "New cornice in re-sheeted rooms — standard or profiled",
          "Ceiling roses and feature mouldings re-set or replaced",
          "Period pattern matching where the profile is still available",
        ],
      },
      {
        heading: "Why cornice cracks at the corners",
        paragraphs: [
          "The mitred joint is the weakest point in the run. Truss uplift and frame settling move the ceiling a millimetre or two with the seasons, and the joint opens instead of flexing — usually in the same corner, every year.",
          "That's why filling a cornice crack and painting it rarely lasts. The proper fix is to re-set the joint: open it, re-bed the cornice, re-mitre and finish. A re-set corner moves with the house; a filled one tears through the paint next dry season.",
        ],
      },
      {
        heading: "Repair or replace — per metre thinking",
        paragraphs: [
          "A single cracked mitre or a damaged half-metre repairs economically. Long failing runs, water-stained cornice, or patterns discontinued decades ago usually come out cheaper re-run in full — new lengths, fresh mitres, one finish.",
          "Every job is quoted in writing before work starts; ornate period profiles are quoted from photos because the pattern determines the work.",
        ],
        note: "If your cornice pattern is hard to match, text us a close-up photo of the profile — we can usually identify it on sight.",
      },
    ],
    faqs: [
      {
        q: "Can you match 1970s cornice patterns?",
        a: "Most 70s and 80s cornice is still made — the common patterns never went away. Genuinely ornate period cornice is matched where the profile exists, and quoted from a close-up photo of the profile where it doesn't.",
      },
      {
        q: "Why does the same corner crack every year?",
        a: "Seasonal movement — truss uplift lifts the ceiling edge in dry weather and the mitre opens. Filling it is a cosmetic fix that reopens; re-setting the joint is the repair that holds.",
      },
      {
        q: "Is it cheaper to replace cornice or repair it?",
        a: "Short damaged sections repair cheaper. Long failing runs, stained cornice or discontinued profiles usually replace cheaper than fighting them — new lengths, fresh mitres, one clean finish.",
      },
    ],
  },

  "insurance-plaster-repairs": {
    slug: "insurance-plaster-repairs",
    key: "insurance-plaster-repairs",
    name: "Insurance Plaster Repairs",
    h1: "Insurance plaster repairs — scopes assessors accept",
    metaTitle: "Insurance Plaster Repairs Brisbane | Redfern",
    metaDescription:
      "Storm, leak and impact plaster repairs with written scopes, photos and moisture checks — the documentation insurers need. Brisbane-wide. Call 0425 743 992.",
    intro:
      "When a storm, a burst pipe or an accident opens up your walls or ceiling, the repair is only half the job. The other half is the paperwork: a written scope, photos of the damage, moisture readings before boards go back, and a finish documented so the assessor can approve it without a second visit. We do both halves.",
    sections: [
      {
        heading: "What we scope and repair",
        bullets: [
          "Storm and hail damage — ceilings and walls re-lined after roof leaks",
          "Burst-pipe and overflow damage — wet board cut out, dried, replaced",
          "Accidental impact repairs — walls and ceilings made good",
          "Fire and smoke damage — linings replaced after clean-up crews finish",
          "Rental and strata make-goods — documented for property managers",
          "Mould-affected board — removed and replaced once the moisture source is fixed",
        ],
      },
      {
        heading: "How the insurance process runs",
        paragraphs: [
          "You can claim two ways. If your insurer runs their own repair panel, our written scope and photos give you a fair yardstick to measure their quote against — you'll know if their panel is under-scoping the job. If you can choose your own trades, we carry out the repair to the documented scope and your insurer pays per your policy.",
          "Either way the sequence is the same: photograph everything before anything is touched, moisture-check the cavity before new board goes up (re-boarding a wet cavity guarantees mould and a rejected claim), then repair, document the finish, and hand you the file for the assessor.",
        ],
      },
      {
        heading: "What your assessor gets",
        bullets: [
          "A written scope of works — line by line, in the format insurers expect",
          "Photos of the damage before the repair and the finish after",
          "Moisture readings recorded before re-boarding",
          "A firm written price — not an open-ended estimate",
        ],
        note: "Urgent cases first: an exposed ceiling or active water entry gets made safe and dried before the paperwork. We prioritise those.",
      },
    ],
    faqs: [
      {
        q: "Do you deal directly with my insurer?",
        a: "We can. We prepare the scope, photos and moisture documentation to the standard insurers expect, and we can liaise with your assessor directly so you're not managing the back-and-forth. If your insurer insists on their own panel, our scope still gives you a fair yardstick to measure their quote against.",
      },
      {
        q: "Should I lodge a claim before or after the quote?",
        a: "Either works. Many homeowners find it useful to have a documented scope in hand before lodging — it makes the claim concrete. If you've already lodged, quote us the claim reference and we'll prepare the documentation to match.",
      },
      {
        q: "Can I claim a plaster repair on insurance?",
        a: "Sudden and accidental damage — storms, burst pipes, impact — is usually covered; gradual wear and maintenance issues usually aren't. Your policy wording decides. Photograph the damage before anything is touched either way, and we'll document the rest.",
      },
    ],
  },

  "sagging-ceiling-repairs": {
    slug: "sagging-ceiling-repairs",
    key: "sagging-ceiling-repairs",
    name: "Sagging Ceiling Repairs",
    h1: "Sagging ceiling repairs — re-fixed, not patched over",
    metaTitle: "Sagging Ceiling Repairs Brisbane | Redfern",
    metaDescription:
      "Sagging and bulging ceilings re-fixed properly — adhesive re-bonded, sheets re-screwed to battens, checked flat before finishing. Repair first, replace only when needed.",
    intro:
      "A sagging ceiling is almost always an adhesive problem, not a board problem — the glue holding the sheet to the battens has let go, and gravity is doing the rest. The right repair re-bonds the sheet to the structure and re-screws it properly, so the ceiling goes flat and stays flat. Patching over a sag is a six-month fix.",
    sections: [
      {
        heading: "Why Brisbane ceilings sag",
        bullets: [
          "Ageing adhesive — the most common cause, especially in 1980s–2000s homes",
          "Roof-space heat cycling — Brisbane summers cook the glue bond year after year",
          "Water events — a leak adds weight and softens the bond at the same time",
          "Under-fixing — original sheets fixed too sparsely for their weight",
          "Termite or batten damage — needs structural attention before any lining work",
        ],
      },
      {
        heading: "Repair first — replace only when it's earned",
        paragraphs: [
          "Most sagging ceilings are repairable. The sheet gets re-bonded with fresh adhesive, re-screwed to the battens at proper centres, and checked flat before any finishing work starts. That saves the ceiling you have instead of paying to replace it.",
          "But honesty works both ways: a sheet that has delaminated, been wet repeatedly, or sagged past recovery is cheaper to replace than to fight — and a ceiling with batten or termite damage needs the structural issue fixed first. We'll tell you which situation you're in before work starts, not after.",
        ],
      },
      {
        heading: "Safety while you wait",
        bullets: [
          "Keep people and pets out of the room — a saturated sheet is heavy and can drop",
          "Don't press or poke the sag — you can trigger the failure you're avoiding",
          "If it's actively leaking, catch the water and get the roof/plumbing seen to first",
        ],
        note: "A sag that moves when you open an internal door, or cracks that run along a straight line, needs checking sooner rather than later. Text photos and we'll tell you how urgent it is.",
      },
    ],
    faqs: [
      {
        q: "Can a sagging ceiling be repaired without replacing it?",
        a: "Usually yes. If the board itself is sound, we re-bond it to the battens with fresh adhesive, re-screw at proper centres and check it flat — the ceiling you have is saved. Sheets that are delaminated, repeatedly wet, or sagged past recovery replace cheaper than the fight to save them.",
      },
      {
        q: "Is a sagging ceiling dangerous?",
        a: "A dry sagging ceiling is usually a slow problem; a saturated or bulging one is a now problem — waterlogged plasterboard is heavy and can drop without warning. Keep people out of the room under a wet sag and get it looked at promptly.",
      },
      {
        q: "Why is my ceiling sagging in the middle but fine at the edges?",
        a: "Cornices help hold the edges, so failures show mid-sheet where the adhesive bond has let go between battens. That's the classic adhesive-failure pattern — and the most repairable kind. A straight-line sag that tracks one batten points at the structure instead, which we check before quoting.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* AREA PAGES                                                          */
/* ------------------------------------------------------------------ */

export const AREA_PAGES: Record<string, AreaPageContent> = {
  "south-brisbane": {
    slug: "south-brisbane",
    key: "south-brisbane",
    area: "South Brisbane",
    navLabel: "Southside",
    h1: "Plasterer in South Brisbane",
    metaTitle: "Plasterer South Brisbane — Repairs & Renovations | Redfern",
    metaDescription:
      "Plaster repairs, ceiling repairs and renovations across Brisbane's south — Mt Gravatt, Sunnybank, Holland Park, Greenslopes and surrounds. Call 0425 743 992.",
    intro:
      "The southside runs from post-war weatherboards through to 60s and 70s brick veneer — and both eras have their signature plaster problems. Older weatherboards crack along hallway ceilings as frames settle; brick veneer homes from the reno wave are stripping kitchens and bathrooms back to the frame.",
    suburbs: [
      "Mt Gravatt",
      "Sunnybank",
      "Holland Park",
      "Greenslopes",
      "Wishart",
      "Runcorn",
      "Macgregor",
      "Hollands Park",
    ],
    commonJobs: [
      "Hallway ceiling cracks that reopen every dry winter — taped, not just filled",
      "Kitchen and bathroom strip-out re-sheets as southside renos ramp up",
      "Cornice repairs where wall removals have opened older rooms up",
      "Garage and rumpus linings as homes grow outwards",
      "Storm-season ceiling patches after east-coast lows",
    ],
    extra:
      "We're based in Brisbane's south-east ourselves, so southside jobs are a short run — which matters when a storm leaves three ceilings sagging in the same street and everyone calls on the same Tuesday.",
  },

  "north-brisbane": {
    slug: "north-brisbane",
    key: "north-brisbane",
    area: "North Brisbane",
    navLabel: "Northside",
    h1: "Plasterer in North Brisbane",
    metaTitle: "Plasterer North Brisbane — Repairs & Renovations | Redfern",
    metaDescription:
      "Plaster repairs, ceilings and renovation linings across Brisbane's north — Chermside, Aspley, North Lakes, Bracken Ridge. Call 0425 743 992.",
    intro:
      "The northside mixes 50s and 60s post-war homes with the big growth estates that spread out from the 90s onward. The older pockets are at the age where ceilings need help; the newer estates are building extensions and garage conversions.",
    suburbs: [
      "Chermside",
      "Aspley",
      "North Lakes",
      "Bracken Ridge",
      "Zillmere",
      "Bridgeman Downs",
      "Kedron",
      "Murrumba Downs",
    ],
    commonJobs: [
      "Ceiling pops and sag fixes in post-war homes reaching sixty-plus years",
      "Extension linings as North Lakes and Mango Hill homes expand",
      "Garage conversions brought up to real-room standard",
      "Water damage re-lines after summer storms push across the Pine Rivers",
      "Patch-and-make-good between tenants in rental stock",
    ],
    extra:
      "Newer estates move fast — if you're mid-extension, getting the lining sequence right with your chippy and sparky is the difference between a smooth handover and a four-week tail of call-backs.",
  },

  "east-brisbane": {
    slug: "east-brisbane",
    key: "east-brisbane",
    area: "East Brisbane & Bayside",
    navLabel: "East & Bayside",
    h1: "Plasterer in East Brisbane & the Bayside",
    metaTitle: "Plasterer East Brisbane & Bayside — Repairs | Redfern",
    metaDescription:
      "Plaster repairs and ceiling work across Brisbane's east — Carindale, Belmont, Wynnum, Manly, Lota and the bayside. Call Redfern on 0425 743 992.",
    intro:
      "This is our home turf — we're based in Brisbane's south-east ourselves. The bayside adds salt air and storm exposure to the usual mix, and the older beach shacks around Wynnum and Manly cop the worst of it: moisture in ceilings, swelling cornice joints, stains after every big east-coast low.",
    suburbs: [
      "Carindale",
      "Belmont",
      "Wynnum",
      "Manly",
      "Lota",
      "Tingalpa",
      "Morningside",
      "Hemmant",
    ],
    commonJobs: [
      "Storm and water-damage ceiling repairs after bayside fronts come through",
      "Moisture-stained sheets replaced and sealed before the mould sets in",
      "Cornice and ceiling-rose repairs in the older pre-war pockets",
      "Reno re-sheets as the older shacks are brought up to modern living",
      "Patch-ups between tenancies around Tingalpa and Hemmant",
    ],
    extra:
      "Bayside humidity slows compound drying and swells older linings — the work here is less about speed and more about doing it right for the conditions.",
  },

  logan: {
    slug: "logan",
    key: "logan",
    area: "Logan",
    navLabel: "Logan",
    h1: "Plasterer in Logan",
    metaTitle: "Plasterer Logan — Repairs, Rentals & Renovations | Redfern",
    metaDescription:
      "Plaster repairs and ceiling work across Logan — Springwood, Beenleigh, Crestmead, Browns Plains and surrounds. Fast patch turnarounds. Call 0425 743 992.",
    intro:
      "Logan is a mix of 70s and 80s family homes, big rental stock, and new estates pushing out through Flagstone and Yarrabilba. The rental stock keeps us busy — patch turnarounds matter when the tenant changeover is Friday and the new lease starts Monday.",
    suburbs: [
      "Springwood",
      "Beenleigh",
      "Crestmead",
      "Browns Plains",
      "Logan Central",
      "Daisy Hill",
      "Flagstone",
      "Yarrabilba",
    ],
    commonJobs: [
      "Fast between-tenant patch-ups for property managers",
      "Ceiling repairs in 80s homes where glue-and-screw ceilings have let go",
      "New-estate defect and damage repairs in Yarrabilba and Flagstone",
      "Storm damage scopes with photos landlords can forward to insurers",
      "Garage and rumpus linings in growing family homes",
    ],
    extra:
      "If you manage rentals in Logan: text us photos and the access window, and you get a firm price back the same day wherever possible.",
  },

  ipswich: {
    slug: "ipswich",
    key: "ipswich",
    area: "Ipswich",
    navLabel: "Ipswich",
    h1: "Plasterer in Ipswich",
    metaTitle: "Plasterer Ipswich — Repairs & Renovations | Redfern",
    metaDescription:
      "Plaster repairs, ceiling work and period cornice repairs across Ipswich — from Queenslanders to the new estates. Call Redfern on 0425 743 992.",
    intro:
      "Ipswich has some of the oldest housing stock in South-East Queensland, and that changes the work. Pre-war Queenslanders carry pressed-metal ceiling panels, ornate cornice and ceiling roses that need a lighter hand; post-war weatherboards often have hardboard or fibro ceilings that need care before anyone cuts.",
    suburbs: [
      "Ipswich Central",
      "Raceview",
      "Karalee",
      "Springfield Lakes",
      "Redbank Plains",
      "Eastern Heights",
      "Coalfalls",
      "Chuwar",
    ],
    commonJobs: [
      "Cornice and ceiling-rose repairs in pre-war Queenslanders",
      "Hardboard and fibro ceiling replacements in post-war homes — asbestos-checked first",
      "Storm-damage re-lines when the Bremer and creeks come up",
      "New-estate linings across Springfield Lakes and Redbank Plains",
      "Hallway and living-room crack taping in the older timber-frame homes",
    ],
    extra:
      "One thing we always flag out here: if your ceiling is fibro or hardboard and pre-1990, it gets tested before cutting — no exceptions. Plenty of tradies won't tell you that.",
  },

  redlands: {
    slug: "redlands",
    key: "redlands",
    area: "Redlands",
    navLabel: "Redlands",
    h1: "Plasterer in the Redlands",
    metaTitle: "Plasterer Redlands — Repairs & Renovations | Redfern",
    metaDescription:
      "Plaster repairs and ceiling work across the Redlands — Cleveland, Victoria Point, Capalaba, Birkdale and surrounds. Call Redfern on 0425 743 992.",
    intro:
      "The Redlands runs from older bayside cottages around Cleveland and Wellington Point to the big estates spreading through Victoria Point and Ormiston. Bayside air keeps the older ceilings honest, and the newer estates are all extensions and garage linings.",
    suburbs: [
      "Cleveland",
      "Victoria Point",
      "Capalaba",
      "Birkdale",
      "Wellington Point",
      "Ormiston",
      "Thornlands",
      "Alexandra Hills",
    ],
    commonJobs: [
      "Water-damage ceilings after bay storms and king tides push moisture inland",
      "Cornice repairs in the older bayside cottages",
      "Extension linings through the Victoria Point growth corridor",
      "Ceiling pops and sag fixes in 80s and 90s family homes",
      "Insurance repair scopes for storm-affected Redlands properties",
    ],
    extra:
      "Bayside conditions mean finishes here take the humidity into account — compound timing is planned around the weather, not despite it.",
  },
};

/* ------------------------------------------------------------------ */
/* COST GUIDE                                                           */
/* ------------------------------------------------------------------ */

export type CostRow = {
  job: string;
  range: string;
  notes?: string;
};

// NOTE: COST_ROWS removed 2026-10-12 at the owner's request — no public
// price table. Quotes are given in writing per job. Do not republish
// price ranges without Tim's approval.

export const COST_FAQS: Faq[] = [
  {
    q: "How much do you charge?",
    a: "Every job is quoted in writing before work starts — there's no flat rate, because a small patch and a full re-sheet are different jobs. Small repairs are usually priced the same day from photos: text images of the damage and you'll get a firm price back.",
  },
  {
    q: "Is it cheaper to patch or replace a ceiling sheet?",
    a: "A patch is cheaper while the damage is localised. Once a sheet has delaminated or sagged past where it can feather out, replacing it is the cheaper job — because the patch won't hold and you'll pay twice.",
  },
  {
    q: "Do you charge a call-out fee?",
    a: "Small jobs are usually quoted from photos — text images of the damage and you get a price back, no visit needed. Bigger work gets a site visit so the quote is accurate, and the visit is free if we do the job.",
  },
  {
    q: "Why do plasterers' quotes vary so much?",
    a: "Some quote hourly, some per job; some price one coat and come back three times, some price three coats up front. Compare what's actually included — coats, sanding, clean-up, who paints — not just the bottom line.",
  },
];