import type { Faq } from "@/lib/data";

export const DIY_GUIDE = {
  metaTitle: "DIY Plaster Repairs — When to Fix It Yourself | Redfern Brisbane",
  metaDescription:
    "Nail holes and hairline cracks you can patch yourself. Ceilings, returning cracks, texture and water damage you can't. An honest guide from a Brisbane plasterer.",
  h1: "DIY plaster repairs: when to fix it yourself",
  quickAnswer:
    "You can safely DIY: nail holes, picture-hook holes, hairline cracks and holes smaller than a 50c piece on walls at eye level. Call a plasterer for: anything on a ceiling, cracks that keep returning, texture matching, water stains, cornice damage, or holes bigger than your palm.",
  diyOk: [
    "Nail and picture-hook holes — fill, sand, spot-prime",
    "Hairline cracks narrower than a 20c coin, walls only",
    "Small holes up to a 50c piece, at eye level, smooth surfaces",
    "Fill-and-paint touch-ups between tenancies",
  ],
  diyNo: [
    "Anything on a ceiling — gravity and raking light expose everything",
    "Cracks that have returned after a previous fill — the house is moving",
    "Texture matching — stipple and orbital finishes rarely blend invisibly",
    "Water-stained plaster — the stain bleeds back through paint until sealed",
    "Cornice mitres and profiles — re-setting is the fix, filling is cosmetic",
    "Holes bigger than your palm — structural backing needed behind the patch",
  ],
  kit: [
    "Ready-mixed joint compound — a small tub beats a big tub that dries out",
    "Self-adhesive mesh patch for holes, paper tape for cracks",
    "A 100mm flexible knife — wider isn't better for small work",
    "120-grit then 180-grit sandpaper, wrapped on a flat block",
    "Spot primer — patching compound sucks paint in differently to the wall",
  ],
  steps: [
    {
      n: "01",
      title: "Nail holes",
      body: "Squeeze compound in, scrape it flat with the knife, let it dry, sand with 180-grit, spot-prime. Two minutes each, and they're gone forever.",
    },
    {
      n: "02",
      title: "Hairline cracks",
      body: "The mistake is filling bare. Scrape the crack open slightly, bed in paper tape over compound, then coat twice, sanding between. Taped, it holds; filled bare, it returns.",
    },
    {
      n: "03",
      title: "Small holes",
      body: "Stick a mesh patch over the hole, coat compound across it, feather wider than feels necessary, twice. Sand under a raking light before priming — if you can see the edge, another skim coat fixes it.",
    },
  ],
  honestNote:
    "Here's the trade truth: your patch will look perfect at noon and show at 5pm when the sun rakes the wall. If a repair is in a sightline, at height, or in a room that matters, the difference between DIY and professional is exactly the width of the feathering — and that's hours of craft, not a better product from the shelf.",
  faqs: [
    {
      q: "How long does plaster compound take to dry before painting?",
      a: "Thin skim coats dry in a few hours; deeper fills and full patches need a day or more per coat in Brisbane humidity. If the compound has changed from pink to white it's dry — sand before the next coat, and never paint onto compound that still feels cool to the touch.",
    },
    {
      q: "Can I just use filler from a hardware tube instead of compound?",
      a: "For nail holes, yes. For anything with width or depth, tube filler shrinks and cracks — joint compound plus tape is the material the trade uses because it's built to be layered and feathered.",
    },
    {
      q: "Why did my patch crack again?",
      a: "Either the crack wasn't taped — movement tears straight back through bare fill — or the fill went on too thick in one hit and shrank as it dried. Tape the crack and build coats in layers.",
    },
    {
      q: "How big a hole is too big for DIY?",
      a: "Bigger than your palm, anything on a ceiling, or any hole where you can't push a backing support behind the patch. The patch needs something to sit on — the trade answer is a new piece of board fixed to the frame, which is exactly the job we do daily.",
    },
  ] as Faq[],
};