import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iefgjjgoswtymucyqlzn.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZmdqamdvc3d0eW11Y3lxbHpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjI2NzQsImV4cCI6MjA4ODYzODY3NH0.uoNQcUyaLxgzAczx0sbn9Snabh2jKC4jcmZeYFQFnf0";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const NAVY = "#1B2B4B",
  GOLD = "#C9A84C",
  LIGHT = "#F7F8FA";

// ── COMPLETE 332 QUESTION BANK ──────────────────────────────────────
const Q = {
  // ── MATTRESSES (50 questions) ──────────────────────────────────────
  mattresses: [
    {
      q: "What does FAB stand for in sales?",
      o: [
        "Features, Advantages, Benefits",
        "Facts, Attributes, Brands",
        "Features, Attributes, Basics",
        "Findings, Actions, Benefits",
      ],
      a: 0,
    },
    {
      q: "Up to what percentage of buying decisions are emotional?",
      o: ["50%", "70%", "90%", "100%"],
      a: 2,
    },
    {
      q: "Recommended mattress replacement cycle?",
      o: ["3–4 years", "5–6 years", "7–10 years", "15+ years"],
      a: 2,
    },
    {
      q: "What is motion transfer?",
      o: [
        "Moving a mattress during delivery",
        "Partner movement traveling across the bed",
        "Adjusting firmness remotely",
        "A type of coil design",
      ],
      a: 1,
    },
    {
      q: "Why avoid leading with price?",
      o: [
        "Prices change daily",
        "Shifts focus to cost before value is established",
        "Managers prefer it",
        "It confuses customers",
      ],
      a: 1,
    },
    {
      q: "What happens to spinal discs during sleep?",
      o: [
        "They compress further",
        "They rehydrate and expand",
        "Nothing changes",
        "They permanently fuse",
      ],
      a: 1,
    },
    {
      q: "Side sleepers need what type of feel?",
      o: [
        "Very firm",
        "Extra firm only",
        "Medium-firm to firm",
        "Softer — for shoulder and hip pressure relief",
      ],
      a: 3,
    },
    {
      q: "Guest over 250 lbs — most critical mattress factor?",
      o: [
        "Thread count",
        "Pillow loft only",
        "Color and aesthetics",
        "Enhanced support — thicker coils and denser foam",
      ],
      a: 3,
    },
    {
      q: "What does ILD measure in foam?",
      o: [
        "Durability over time",
        "Temperature response",
        "Density in pounds",
        "Firmness via indentation load deflection",
      ],
      a: 3,
    },
    {
      q: "Best closing question when guest compares two mattresses?",
      o: [
        "Just pick one",
        "Which fits your budget?",
        "Both are the same really",
        "Which one made your back feel better?",
      ],
      a: 3,
    },
    {
      q: "'I need to think about it' — best response?",
      o: [
        "Give your card and let them leave",
        "Offer a discount immediately",
        "Tell them the sale ends today",
        "Ask what specifically they need to think through",
      ],
      a: 3,
    },
    {
      q: "'It's too expensive' — best first move?",
      o: [
        "Show a cheaper option immediately",
        "Match a competitor's price",
        "Argue quality justifies cost",
        "Explore their budget and reframe to cost-per-night",
      ],
      a: 3,
    },
    {
      q: "'I read bad reviews' — best approach?",
      o: [
        "Dismiss the reviews entirely",
        "Agree and show another brand",
        "Defensive explanation of the brand",
        "Validate concern and address the specific issue",
      ],
      a: 3,
    },
    {
      q: "Which sleep position benefits most from a softer feel?",
      o: ["Stomach", "Back", "All equally", "Side"],
      a: 3,
    },
    {
      q: "What body change triggers sleep onset?",
      o: [
        "Core temperature rises",
        "Heart rate spikes",
        "Blood pressure increases",
        "Core temperature drops slightly",
      ],
      a: 3,
    },
    {
      q: "How many sleep cycles does a healthy adult complete per night?",
      o: ["1–2", "2–3", "8–10", "4–6"],
      a: 3,
    },
    {
      q: "'My old mattress lasted 20 years' — what do you say?",
      o: [
        "Those were better times",
        "Show only durable options",
        "Agree and move on",
        "Support degrades long before the cover wears out",
      ],
      a: 3,
    },
    {
      q: "Cost-per-night of a $1,200 mattress over 10 years?",
      o: [
        "$1.20 per night",
        "$0.66 per night",
        "$0.33 per night",
        "$2.40 per night",
      ],
      a: 1,
    },
    {
      q: "What is the 'break-in' period for a new mattress?",
      o: [
        "There is no break-in",
        "30 days minimum",
        "1 year",
        "About 2–4 weeks for foam to fully soften",
      ],
      a: 3,
    },
    {
      q: "What does 'zoned support' mean in a mattress?",
      o: [
        "Different prices by zone",
        "Cooling in specific areas",
        "Air chambers by zone",
        "Firmness varies by body region for targeted support",
      ],
      a: 3,
    },
    {
      q: "Tempur-Adapt firmness options?",
      o: [
        "One size only",
        "Four options",
        "Six options",
        "Two: Medium and Medium Hybrid",
      ],
      a: 3,
    },
    {
      q: "LuxeAdapt vs. ProAdapt — key difference?",
      o: [
        "Color only",
        "ProAdapt costs more",
        "Identical internally",
        "LuxeAdapt has thicker TEMPUR for deeper pressure relief",
      ],
      a: 3,
    },
    {
      q: "Which Tempur model offers up to 8° cooler sleep?",
      o: ["Adapt", "Cloud", "ProBreeze°", "LuxeBreeze°"],
      a: 3,
    },
    {
      q: "Tempur-Pedic standard warranty length?",
      o: ["5-year", "2-year", "Lifetime", "10-year full replacement limited"],
      a: 3,
    },
    {
      q: "PureCool+™ technology does what?",
      o: [
        "Uses water channels",
        "Requires electricity to activate",
        "Only works with Ergo base",
        "Proactively absorbs surface heat before you feel it",
      ],
      a: 3,
    },
    {
      q: "What makes TEMPUR material unique?",
      o: [
        "It's the cheapest foam",
        "It contains coils",
        "It's a type of latex",
        "Viscoelastic foam originally developed by NASA",
      ],
      a: 3,
    },
    {
      q: "Sealy Posturepedic targets support where?",
      o: [
        "Head zone only",
        "Foot zone",
        "Edges only",
        "Center third — where your heaviest part rests",
      ],
      a: 3,
    },
    {
      q: "Sealy's premium tier is called?",
      o: ["Essentials", "Response", "Basics", "Posturepedic Plus"],
      a: 3,
    },
    {
      q: "Sealy Chill™ technology targets?",
      o: [
        "Noise reduction",
        "Motion isolation",
        "Edge reinforcement",
        "Surface temperature regulation",
      ],
      a: 3,
    },
    {
      q: "Serta Perfect Sleeper is powered by?",
      o: [
        "Basic polyfoam",
        "Latex only",
        "Water tubes",
        "Advanced gel foam plus zoned coil support",
      ],
      a: 3,
    },
    {
      q: "Serta iComfort is known for?",
      o: [
        "Budget pricing",
        "Innerspring only",
        "Organic materials",
        "Carbon fiber memory foam for cooling and support",
      ],
      a: 3,
    },
    {
      q: "How many standard Helix models exist?",
      o: ["2", "4", "8", "6"],
      a: 3,
    },
    {
      q: "Which Helix model is best for side sleepers?",
      o: ["Dawn", "Dusk", "Twilight", "Midnight"],
      a: 3,
    },
    {
      q: "Helix Midnight Luxe adds what over standard Midnight?",
      o: [
        "Lower price",
        "More coils only",
        "Different cover only",
        "Zoned lumbar support and a pillow top",
      ],
      a: 3,
    },
    {
      q: "Purple Grid is made from?",
      o: [
        "Standard polyfoam",
        "Latex",
        "Cotton batting",
        "Hyper-Elastic Polymer",
      ],
      a: 3,
    },
    {
      q: "Purple Grid's key advantage over memory foam?",
      o: [
        "It's cheaper",
        "It's firmer",
        "It lasts longer",
        "No heat retention and instant pressure response",
      ],
      a: 3,
    },
    {
      q: "Purple 4 vs. Purple 3 — what differs?",
      o: [
        "Color only",
        "Price only",
        "Coil count",
        "Grid layer is 4 inches vs. 3 inches thick",
      ],
      a: 3,
    },
    {
      q: "Beautyrest Black signature technology?",
      o: [
        "Budget pricing",
        "Organic cotton only",
        "Pillow included",
        "T3 Pocketed Coil® plus BlackICE™ cooling",
      ],
      a: 3,
    },
    {
      q: "Pocketed Coil® vs. traditional innerspring?",
      o: [
        "Marketing only",
        "Fewer coils",
        "No real difference",
        "Each coil individually wrapped for independent response",
      ],
      a: 3,
    },
    {
      q: "BlackICE™ technology does what?",
      o: [
        "Provides lumbar support",
        "Adds bounce",
        "Reduces motion transfer only",
        "Multi-layer cooling system draws heat away",
      ],
      a: 3,
    },
    {
      q: "Stearns & Foster's brand claim?",
      o: [
        "Celebrity endorsed",
        "Lowest price guaranteed",
        "Only in luxury stores",
        "Handcrafted with IntelliCoil® and premium certified materials",
      ],
      a: 3,
    },
    {
      q: "IntelliCoil® HD design?",
      o: [
        "Air-filled chambers",
        "Standard Bonnell coil",
        "Just a brand name",
        "Coil-within-a-coil — soft entry, firms up progressively",
      ],
      a: 3,
    },
    {
      q: "Why does hand-tufting matter in Stearns & Foster?",
      o: [
        "It's cheaper to produce",
        "Just aesthetic",
        "Reduces weight",
        "Secures layers without adhesives for lasting durability",
      ],
      a: 3,
    },
    {
      q: "What is 'edge support' and why does it matter?",
      o: [
        "Decoration on the side",
        "Keeps the mattress from sliding",
        "Only for large guests",
        "Reinforced perimeter so you can sit and sleep to the edge without roll-off",
      ],
      a: 3,
    },
    {
      q: "What is a hybrid mattress?",
      o: [
        "Two mattresses stacked",
        "An adjustable mattress",
        "A mattress with a removable topper",
        "Coil support system combined with foam or latex comfort layers",
      ],
      a: 3,
    },
    {
      q: "Latex mattresses are best known for?",
      o: [
        "Cheapest option",
        "Heaviest feel",
        "Shortest lifespan",
        "Natural durability, responsiveness, and cooling",
      ],
      a: 3,
    },
    {
      q: "What does 'off-gassing' mean with new foam mattresses?",
      o: [
        "A defect requiring return",
        "Permanent chemical smell",
        "Air escaping from coils",
        "Temporary harmless odor as foam expands and releases VOCs",
      ],
      a: 3,
    },
    {
      q: "Which guest concern most directly points toward a cooling mattress?",
      o: [
        "Wakes up stiff",
        "Has back pain",
        "Moves a lot",
        "Says they sleep hot or wake up sweating",
      ],
      a: 3,
    },
    {
      q: "What is a 'pillow top' mattress?",
      o: [
        "A mattress that comes with pillows",
        "Refers to pillow firmness",
        "A flat firm mattress",
        "An extra layer of padding sewn onto the top surface",
      ],
      a: 3,
    },
    {
      q: "Somos Beds positioning in the market?",
      o: [
        "Luxury only",
        "Budget brand",
        "Online only",
        "Inclusive comfort for all body types with accessible price points",
      ],
      a: 3,
    },
  ],

  // ── ADJUSTABLE BASES (40 questions) ───────────────────────────────
  adjustable: [
    {
      q: "What is Zero Gravity position?",
      o: [
        "Flips the mattress",
        "Locks the base flat",
        "Turns off massage",
        "Head and legs elevated to reduce spinal and heart pressure",
      ],
      a: 3,
    },
    {
      q: "Best mattress type for an adjustable base?",
      o: [
        "Traditional innerspring",
        "Bonnell coil only",
        "Pillow-top only",
        "Memory foam or latex",
      ],
      a: 3,
    },
    {
      q: "#1 guest benefit after trying a base?",
      o: [
        "It looks stylish",
        "It's cheaper",
        "It lasts longer",
        "Relief from snoring and acid reflux",
      ],
      a: 3,
    },
    {
      q: "Split king base serves what purpose?",
      o: [
        "Cheaper option",
        "Fits smaller rooms",
        "For single sleepers only",
        "Each side adjusts independently for couples",
      ],
      a: 3,
    },
    {
      q: "Adjustable base massage helps with?",
      o: [
        "Nothing proven",
        "Cooling only",
        "Back pain only",
        "Circulation, relaxation, and falling asleep faster",
      ],
      a: 3,
    },
    {
      q: "'Wall hugger' technology means?",
      o: [
        "Sticks to the wall for stability",
        "Prevents movement during sleep",
        "A brand name for edge support",
        "Base slides back as head rises — nightstand items stay reachable",
      ],
      a: 3,
    },
    {
      q: "How does an adjustable base help acid reflux?",
      o: [
        "It doesn't help",
        "It massages the stomach",
        "By cooling the sleep surface",
        "Head elevation keeps stomach acid from traveling up",
      ],
      a: 3,
    },
    {
      q: "What is lumbar support on a base?",
      o: [
        "Decorative feature",
        "Foot elevation only",
        "Side rails",
        "Inflatable zone targeting the lower back",
      ],
      a: 3,
    },
    {
      q: "Weight capacity of most quality adjustable bases?",
      o: ["200 lbs", "350 lbs", "500 lbs", "750–850 lbs"],
      a: 3,
    },
    {
      q: "Best way to demo a base to a guest?",
      o: [
        "Describe it verbally",
        "Hand them a brochure",
        "Show a video",
        "Have them lie down and feel Zero Gravity themselves",
      ],
      a: 3,
    },
    {
      q: "Why upsell a base with every mattress?",
      o: [
        "Higher commission only",
        "Required by company",
        "They're always cheaper together",
        "Enhances comfort and addresses health concerns guests already have",
      ],
      a: 3,
    },
    {
      q: "Tempur-Ergo Smart base unique feature?",
      o: [
        "Budget pricing",
        "No remote needed",
        "Only one position",
        "Snore detection with automatic head elevation",
      ],
      a: 3,
    },
    {
      q: "Tempur-Ergo integrates with what smart home platforms?",
      o: [
        "Only Android",
        "Only Apple Watch",
        "No smart home integration",
        "Amazon Alexa and Google Home",
      ],
      a: 3,
    },
    {
      q: "Best base pairing for Tempur-LuxeBreeze°?",
      o: [
        "Any base works",
        "No base needed",
        "Sealy base only",
        "Tempur-Ergo for full system benefit",
      ],
      a: 3,
    },
    {
      q: "Percentage of couples with different sleep preferences?",
      o: ["10%", "25%", "50%", "About 80%"],
      a: 3,
    },
    {
      q: "What is the 'anti-snore' position on a base?",
      o: [
        "Sleeping flat on back",
        "Foot elevation only",
        "Zero Gravity only",
        "Slight head elevation that opens the airway to reduce snoring",
      ],
      a: 3,
    },
    {
      q: "Adjustable bases help with edema (swelling) how?",
      o: [
        "They don't",
        "By cooling the legs",
        "By vibrating the legs",
        "Elevating the foot section improves circulation and reduces swelling",
      ],
      a: 3,
    },
    {
      q: "What is a 'split queen' adjustable base?",
      o: [
        "A queen base cut in half",
        "Two separate twin XL bases",
        "Doesn't exist",
        "A queen base with independent head and foot adjustment",
      ],
      a: 3,
    },
    {
      q: "Why does an adjustable base require a compatible mattress?",
      o: [
        "For warranty purposes only",
        "For aesthetics",
        "For delivery reasons",
        "Rigid or bonnel coil mattresses crack when bent repeatedly",
      ],
      a: 3,
    },
    {
      q: "What is the TV/reading position on an adjustable base?",
      o: [
        "Flat with vibration",
        "Foot up only",
        "Full Zero Gravity",
        "Head elevated 45°+ for comfortable upright rest",
      ],
      a: 3,
    },
    {
      q: "How do you handle 'I don't need a base, I have a frame'?",
      o: [
        "Agree and move on",
        "Sell it anyway without explanation",
        "A frame is better",
        "'A frame holds the mattress — a base adds health benefits your frame can't'",
      ],
      a: 3,
    },
    {
      q: "What is the typical warranty on a quality adjustable base?",
      o: ["1 year", "3 years", "5 years", "10–20 years depending on brand"],
      a: 3,
    },
    {
      q: "What does 'programmable position memory' on a base do?",
      o: [
        "Locks the base in place",
        "Records sleep data",
        "Prevents accidental movement",
        "Saves your favorite positions so you can return to them with one button",
      ],
      a: 3,
    },
    {
      q: "What type of remote do most premium bases include?",
      o: [
        "Wired only",
        "None — voice only",
        "Phone app only",
        "Wireless backlit remote plus optional smartphone app",
      ],
      a: 3,
    },
    {
      q: "How does a base help with pregnancy discomfort?",
      o: [
        "It doesn't",
        "Cooling helps only",
        "Only foot elevation helps",
        "Elevating head and feet reduces back pressure and swelling — essential",
      ],
      a: 3,
    },
    {
      q: "What is 'underbed lighting' on a base used for?",
      o: [
        "Decoration only",
        "Sleep tracking",
        "Charging phones",
        "Low-light nighttime navigation without disrupting a sleeping partner",
      ],
      a: 3,
    },
    {
      q: "What is the average cost range for a quality adjustable base?",
      o: [
        "$100–$300",
        "$300–$500",
        "$2,000+",
        "$600–$1,500 for most quality options",
      ],
      a: 3,
    },
    {
      q: "What guest complaint is the #1 signal to recommend a base?",
      o: [
        "'I sleep too much'",
        "'My mattress is too soft'",
        "'I want a bigger bed'",
        "'I snore' or 'I have acid reflux'",
      ],
      a: 3,
    },
    {
      q: "What happens to a traditional innerspring on an adjustable base?",
      o: [
        "Works fine",
        "Gets firmer",
        "Improves over time",
        "Bonnell coils can break from repeated flexing — avoid pairing",
      ],
      a: 3,
    },
    {
      q: "What is 'zero clearance' on some adjustable bases?",
      o: [
        "No weight capacity",
        "Flat-only position",
        "No massage feature",
        "Base can work directly on the floor without needing legs",
      ],
      a: 3,
    },
    {
      q: "Purple base compatibility — what to know?",
      o: [
        "No bases allowed",
        "Only Purple bases work",
        "Any base works",
        "Purple mattresses work with adjustable bases — feature the Grid's flex",
      ],
      a: 3,
    },
    {
      q: "How does a base improve morning alertness?",
      o: [
        "It doesn't",
        "By cooling overnight",
        "By tracking sleep",
        "Gentle wake programs slowly raise the head to ease out of deep sleep",
      ],
      a: 3,
    },
    {
      q: "What is a 'dual massage' feature?",
      o: [
        "Two remote controls",
        "Two separate mattresses",
        "Massage only on foot section",
        "Independent massage zones for head and foot sections",
      ],
      a: 3,
    },
    {
      q: "Why is USB charging on a base a selling point?",
      o: [
        "It's required by law",
        "It charges the base",
        "It's only aesthetic",
        "Guests can charge phones at arm's reach without getting out of bed",
      ],
      a: 3,
    },
    {
      q: "What is the best way to justify base cost to a hesitant guest?",
      o: [
        "Just discount it",
        "Say it's on sale",
        "Ignore their hesitation",
        "Break into cost-per-night and tie to their specific health concern",
      ],
      a: 3,
    },
    {
      q: "What is 'flat' position on an adjustable base?",
      o: [
        "Off position",
        "Locked mode",
        "Zero Gravity",
        "Traditional flat sleep — base returns fully horizontal",
      ],
      a: 3,
    },
    {
      q: "Sealy adjustable base key feature?",
      o: [
        "Snore detection",
        "Only one position",
        "No app support",
        "Ergomotion technology with wireless remote and app control",
      ],
      a: 3,
    },
    {
      q: "What lifestyle guests benefit most from a base?",
      o: [
        "College students",
        "Occasional campers",
        "People who sleep perfectly",
        "Side sleepers, snorers, acid reflux, back pain, pregnancy, night shift",
      ],
      a: 3,
    },
    {
      q: "What is 'full-body massage' on premium bases?",
      o: [
        "Only available on kings",
        "A separate product",
        "Vibration only on foot",
        "Wave patterns that move from head to foot for full relaxation",
      ],
      a: 3,
    },
    {
      q: "How do you demo a base to a couple with different preferences?",
      o: [
        "Show only one position",
        "Have them each try separately",
        "Skip the demo",
        "Show split king — each person adjusts their side independently",
      ],
      a: 3,
    },
  ],

  // ── SOFT GOODS (40 questions) ──────────────────────────────────────
  soft_goods: [
    {
      q: "Luxury sheet thread count range?",
      o: ["100–200", "200–300", "300–400", "400–800"],
      a: 3,
    },
    {
      q: "Premium down pillow fill power rating?",
      o: ["100–200", "200–400", "400–600", "600+"],
      a: 3,
    },
    {
      q: "Primary benefit of a mattress protector?",
      o: [
        "Makes mattress firmer",
        "Just aesthetics",
        "Improves cooling only",
        "Protects warranty and guards against moisture and allergens",
      ],
      a: 3,
    },
    {
      q: "Tencel fabric is known for?",
      o: [
        "Being cheapest",
        "High thread count",
        "Scratchy texture",
        "Moisture-wicking and temperature regulation from eucalyptus fibers",
      ],
      a: 3,
    },
    {
      q: "Cooling pillow technology typically uses?",
      o: [
        "Ice packs inside",
        "Electric fans",
        "Water chambers",
        "Gel infusions or phase-change materials that absorb heat",
      ],
      a: 3,
    },
    {
      q: "Why always sell a protector with a new mattress?",
      o: [
        "Higher margin only",
        "It's optional",
        "Only for allergy sufferers",
        "Most warranties require it — stains can void coverage",
      ],
      a: 3,
    },
    {
      q: "#1 warranty-voiding issue on new mattresses?",
      o: [
        "Normal wear",
        "Being overweight",
        "Wrong sheet size",
        "Stains — even small ones without a protector in place",
      ],
      a: 3,
    },
    {
      q: "Waterproof vs. water-resistant protector?",
      o: [
        "Same thing",
        "Resistant is better",
        "Waterproof means plastic and uncomfortable",
        "Waterproof blocks all liquids; resistant can eventually soak through",
      ],
      a: 3,
    },
    {
      q: "Guest says 'I'll use my old pillow.' Problem?",
      o: [
        "Old pillows are fine",
        "It voids warranty",
        "Only a hygiene issue",
        "Pillows lose 50%+ support after 18–24 months — undoes mattress benefits",
      ],
      a: 3,
    },
    {
      q: "What is the 'full bed equation'?",
      o: [
        "A measurement formula",
        "A financing calculation",
        "A room layout guide",
        "Mattress + Base + Protector + Pillow + Sheets = Complete Sleep System",
      ],
      a: 3,
    },
    {
      q: "Target protector attachment rate?",
      o: ["25%", "50%", "65%", "80–90%+ of every mattress ticket"],
      a: 3,
    },
    {
      q: "GSM indicates what in bedding?",
      o: [
        "Thread count",
        "Color fastness",
        "Brand quality tier",
        "Weight per square meter — higher GSM = more substantial and durable",
      ],
      a: 3,
    },
    {
      q: "Eucalyptus-derived fabric vs. cotton?",
      o: [
        "Cheaper to produce",
        "Identical performance",
        "Only for hot climates",
        "Softer, more breathable, uses significantly less water to produce",
      ],
      a: 3,
    },
    {
      q: "Pillow protector vs. pillowcase — difference?",
      o: [
        "Same thing",
        "Pillowcase goes under both",
        "Only aesthetic difference",
        "Protector guards against moisture and allergens beneath the pillowcase",
      ],
      a: 3,
    },
    {
      q: "BEDGEAR brand is known for?",
      o: [
        "Lowest price bedding",
        "Highest thread counts",
        "Luxury aesthetics only",
        "Performance sleep accessories — moisture-wicking and ventilated",
      ],
      a: 3,
    },
    {
      q: "BEDGEAR pillows are fit by?",
      o: [
        "Color preference",
        "Price point",
        "Random selection",
        "Shoulder width and sleep position — like a shoe fitting",
      ],
      a: 3,
    },
    {
      q: "BEDGEAR Dri-Tec® does what?",
      o: [
        "Adds firmness",
        "Improves edge support",
        "Blocks allergens only",
        "Wicks moisture away from the sleep surface",
      ],
      a: 3,
    },
    {
      q: "Tempur-Cloud pillow strength?",
      o: [
        "It's the cheapest option",
        "One-size-fits-all",
        "No case needed",
        "Genuine TEMPUR micro-cushions that adapt like the mattress",
      ],
      a: 3,
    },
    {
      q: "How to pitch a Tempur pillow with a Tempur mattress?",
      o: [
        "Don't mention it",
        "Only for luxury budgets",
        "Wait until checkout",
        "'Your mattress adapts to you — shouldn't your pillow? Same material.'",
      ],
      a: 3,
    },
    {
      q: "What is a 'bamboo viscose' sheet fabric?",
      o: [
        "A synthetic blend",
        "Cotton alternative only",
        "Bamboo wood shavings woven in",
        "Soft, breathable fabric derived from bamboo plant fibers",
      ],
      a: 3,
    },
    {
      q: "How do you quickly test if a pillow is dead?",
      o: [
        "Smell it",
        "Weigh it",
        "Check the tag",
        "Fold it in half — if it doesn't spring back, it's lost its support",
      ],
      a: 3,
    },
    {
      q: "What is a 'mattress topper' vs. a 'mattress pad'?",
      o: [
        "Same product, different names",
        "Pad is thicker",
        "Topper goes under the mattress",
        "Topper adds comfort layer; pad is thinner for protection",
      ],
      a: 3,
    },
    {
      q: "What fill makes a pillow hypoallergenic?",
      o: [
        "Natural down only",
        "Foam always",
        "Cotton only",
        "Synthetic fills or certified down alternatives reduce allergen risk",
      ],
      a: 3,
    },
    {
      q: "What thread count is best for hot sleepers?",
      o: [
        "800+",
        "600–800",
        "400–600",
        "200–400 — lower counts breathe better",
      ],
      a: 3,
    },
    {
      q: "What is the BEDGEAR Air-X® panel?",
      o: [
        "A price tier",
        "A pillow firmness",
        "A sheet weave",
        "Ventilated side panels in pillows and protectors that increase airflow",
      ],
      a: 3,
    },
    {
      q: "Why does pillow loft matter?",
      o: [
        "Aesthetics only",
        "Price indicator",
        "Brand differentiator",
        "Loft height determines spinal alignment based on sleep position",
      ],
      a: 3,
    },
    {
      q: "What pillow loft suits back sleepers?",
      o: [
        "Very high loft",
        "Very low loft",
        "Extra firm only",
        "Medium loft to maintain neutral cervical alignment",
      ],
      a: 3,
    },
    {
      q: "What pillow loft suits stomach sleepers?",
      o: [
        "High loft",
        "Extra firm",
        "Medium loft",
        "Low loft to prevent neck hyperextension",
      ],
      a: 3,
    },
    {
      q: "What is a 'cooling cover' on a mattress protector?",
      o: [
        "A decoration",
        "A marketing term only",
        "Just a color option",
        "A phase-change or moisture-wicking surface layer that regulates temperature",
      ],
      a: 3,
    },
    {
      q: "Why should protectors be waterproof for kids' beds?",
      o: [
        "Not necessary",
        "Only for toddlers",
        "Any protector works",
        "Children's accidents are unpredictable — full waterproof protection is essential",
      ],
      a: 3,
    },
    {
      q: "What is the best way to wash a mattress protector?",
      o: [
        "Dry clean only",
        "Never wash",
        "Hand wash only",
        "Machine wash cold, tumble dry low per care instructions",
      ],
      a: 3,
    },
    {
      q: "What is 'fitted' vs. 'encasement' style protector?",
      o: [
        "Same thing",
        "Price difference only",
        "Brand variation",
        "Fitted covers top only; encasement zips around all six sides for full protection",
      ],
      a: 3,
    },
    {
      q: "How does a protector extend mattress life?",
      o: [
        "It doesn't",
        "Only for allergens",
        "By adding firmness",
        "Keeps moisture, sweat, and debris from breaking down foam and fabric",
      ],
      a: 3,
    },
    {
      q: "What is the markup opportunity on soft goods?",
      o: [
        "Minimal — skip it",
        "Only pitch to luxury buyers",
        "Avoid discussing price",
        "Protectors and pillows are high-margin add-ons that improve guest satisfaction",
      ],
      a: 3,
    },
    {
      q: "BEDGEAR pillow fitting process — how long does it take?",
      o: [
        "30 minutes minimum",
        "It's complex and time-consuming",
        "Not worth doing in-store",
        "2–3 minutes — quick shoulder width + sleep position match",
      ],
      a: 3,
    },
    {
      q: "What fabric is best for allergy sufferers?",
      o: [
        "Natural down",
        "Silk only",
        "Standard cotton",
        "Hypoallergenic synthetic fills and tightly woven, certified clean covers",
      ],
      a: 3,
    },
    {
      q: "What is 'cotton percale' weave?",
      o: [
        "A brand name",
        "A type of foam",
        "A pillow fill",
        "A crisp, cool, durable plain weave with a matte finish — great for hot sleepers",
      ],
      a: 3,
    },
    {
      q: "What is 'sateen' weave?",
      o: [
        "A type of foam",
        "A pillow fill",
        "A brand name",
        "Silky, lustrous weave that feels soft and smooth — warmer than percale",
      ],
      a: 3,
    },
    {
      q: "Best pillow for combination sleepers?",
      o: [
        "Very firm pillow",
        "Very flat pillow",
        "Feather only",
        "Adjustable fill pillow — can customize loft for different positions",
      ],
      a: 3,
    },
    {
      q: "What is the 'full bed equation' attachment sequence?",
      o: [
        "Sheets first, then pillow",
        "Protector first always",
        "Order doesn't matter",
        "Mattress → Protector (first, always) → Pillow → Sheets → Base",
      ],
      a: 3,
    },
  ],

  // ── OBJECTIONS (40 questions) ─────────────────────────────────────
  objections: [
    {
      q: "'We're just looking.' Best response?",
      o: [
        "Leave them alone",
        "Try to sell immediately",
        "Ignore them",
        "'Of course! Mind if I ask what brought you in today?'",
      ],
      a: 3,
    },
    {
      q: "'I can get it cheaper online.' Response?",
      o: [
        "We'll match any price",
        "Argue the price is fair",
        "Let them go",
        "Online skips try-before-you-buy, delivery setup, and expert fitting",
      ],
      a: 3,
    },
    {
      q: "'My old mattress lasted 20 years.' What do you say?",
      o: [
        "Those were better times",
        "Agree and move on",
        "Show cheapest option",
        "Support degrades long before the cover wears out — feel this difference",
      ],
      a: 3,
    },
    {
      q: "'I need to talk to my spouse first.' Best response?",
      o: [
        "Try harder to close",
        "Push for a decision now",
        "Nothing you can do",
        "'Want a summary to bring home so you're both on the same page?'",
      ],
      a: 3,
    },
    {
      q: "'Not ready to buy today.' What do you do?",
      o: [
        "Walk away",
        "Offer a fake deadline",
        "Push harder",
        "'That's fine — let me make sure you leave with the right info for when you're ready'",
      ],
      a: 3,
    },
    {
      q: "'It feels the same as my old one.' Response?",
      o: [
        "Agree — they're right",
        "Show cheaper option",
        "Ignore it",
        "'Let's compare — most guests are surprised how much support has actually changed'",
      ],
      a: 3,
    },
    {
      q: "'Better deal at another store.' Response?",
      o: [
        "We'll beat any price",
        "Argue your store is better",
        "Let them go",
        "'Let's confirm we're comparing the same thing — retailers use different names'",
      ],
      a: 3,
    },
    {
      q: "'Memory foam sleeps hot.' Counter?",
      o: [
        "Agree and show innerspring",
        "Memory foam doesn't sleep hot",
        "Ignore the concern",
        "'That used to be true — modern cooling technology is very different. Let me show you.'",
      ],
      a: 3,
    },
    {
      q: "'I've always had an innerspring.' Approach?",
      o: [
        "Show only innerspring",
        "Try to sell all-foam",
        "Agree and move on",
        "'This hybrid uses coils AND foam — support you know plus added pressure relief'",
      ],
      a: 3,
    },
    {
      q: "'The last salesperson was pushy.' How do you build trust?",
      o: [
        "Defend the other salesperson",
        "Ignore it",
        "Be overly apologetic",
        "'I hear that. My goal is to help you find the right fit — even if that means telling you to wait'",
      ],
      a: 3,
    },
    {
      q: "'My chiropractor said firm is best.' Response?",
      o: [
        "Show only firm options",
        "Argue with the chiropractor",
        "Agree completely",
        "'Research has shifted — alignment matters more than firmness. Let me show you what that means'",
      ],
      a: 3,
    },
    {
      q: "'I don't need a base, I have a frame.' Response?",
      o: [
        "Agree and forget it",
        "Sell it without explanation",
        "A frame is better",
        "'A frame holds the mattress — a base adds health benefits your frame can't. Try Zero Gravity?'",
      ],
      a: 3,
    },
    {
      q: "When a guest keeps saying 'maybe' — what's usually the real issue?",
      o: [
        "They're not interested",
        "Just indecisive",
        "Nothing you can do",
        "Price, uncertainty, or needing to consult a spouse — ask which one directly",
      ],
      a: 3,
    },
    {
      q: "'I want to sleep on it.' Best response?",
      o: [
        "Push for same-day sale",
        "Nothing you can do",
        "Laugh and let them go",
        "'Smart — which is why we have our comfort guarantee. What felt right to you?'",
      ],
      a: 3,
    },
    {
      q: "Why not open with 'Can I help you?'",
      o: [
        "It's too polite",
        "Not allowed by policy",
        "Wastes time",
        "It invites 'No thanks' — a dead end. Use open-ended questions instead",
      ],
      a: 3,
    },
    {
      q: "'I'll just put a topper on my old mattress.' Response?",
      o: [
        "Great idea, let them go",
        "Agree and sell a topper",
        "Ignore the comment",
        "'Toppers mask symptoms — they can't restore lost support. Let's see what your body actually needs'",
      ],
      a: 3,
    },
    {
      q: "'I saw it at Costco for less.' Response?",
      o: [
        "Can't compete with Costco",
        "Match the price",
        "Agree with them",
        "'Costco sells a limited selection — what you get here is expert fitting, choice, and service'",
      ],
      a: 3,
    },
    {
      q: "'I'm not sure which size I need.' How do you handle it?",
      o: [
        "Tell them to measure later",
        "Guess for them",
        "Skip to price",
        "'Tell me about your room and who's sleeping — I'll help you nail the right size'",
      ],
      a: 3,
    },
    {
      q: "Guest returns a mattress, unhappy. First move?",
      o: [
        "Blame the product",
        "Tell them it's their fault",
        "Start defense mode",
        "Lead with empathy — 'I'm sorry to hear that. Tell me exactly what's not working.'",
      ],
      a: 3,
    },
    {
      q: "'My friend said this brand is terrible.' Response?",
      o: [
        "Dismiss the friend",
        "Agree and show another brand",
        "Argue with the friend's opinion",
        "'I hear that — reviews are mixed for every brand. What specifically concerned them?'",
      ],
      a: 3,
    },
    {
      q: "'I need it delivered this week.' How do you handle urgency?",
      o: [
        "Promise anything",
        "Tell them it's impossible",
        "Ignore urgency",
        "Check availability honestly and offer solutions — same-day or scheduled options",
      ],
      a: 3,
    },
    {
      q: "'We just need something cheap for a guest room.' Response?",
      o: [
        "Show the cheapest item",
        "Don't upsell them at all",
        "Ignore them",
        "'Absolutely — let me show you the best value options. A protector is still worth it though.'",
      ],
      a: 3,
    },
    {
      q: "Guest disagrees with your recommendation. What do you do?",
      o: [
        "Insist you're right",
        "Give up and let them choose",
        "Ignore their feedback",
        "Acknowledge their perspective, ask more questions, adjust your recommendation",
      ],
      a: 3,
    },
    {
      q: "'I always buy online — why should I buy here?' Best answer?",
      o: [
        "You don't have to",
        "We're cheaper",
        "Ignore the question",
        "'Here you test it on your body, get expert guidance, real delivery, and no return hassle'",
      ],
      a: 3,
    },
    {
      q: "'That's more than I planned to spend.' Best next move?",
      o: [
        "Immediately show cheaper",
        "Apologize",
        "Ignore the concern",
        "'Tell me your number and I'll show you the best we can do at that budget'",
      ],
      a: 3,
    },
    {
      q: "Guest is with a teenager who wants a firm mattress. Parent wants soft. What do you do?",
      o: [
        "Side with the parent",
        "Side with the teenager",
        "Sell them both",
        "Explore who will actually use it most and recommend based on their sleep needs",
      ],
      a: 3,
    },
    {
      q: "'I need to pray about it.' How do you respond?",
      o: [
        "Argue against it",
        "Push for same-day decision",
        "Dismiss it",
        "Respect it completely — offer to hold pricing and follow up on their timeline",
      ],
      a: 3,
    },
    {
      q: "'I have a bad back and don't know what I need.' First question?",
      o: [
        "What's your budget?",
        "What brand do you want?",
        "What size do you need?",
        "'Where specifically — lower, upper, or both? What position do you sleep in?'",
      ],
      a: 3,
    },
    {
      q: "'We're buying for our college student.' Key recommendation?",
      o: [
        "Luxury model only",
        "Skip the protector",
        "Most expensive option",
        "Durable mid-range with a waterproof protector — durability and protection are key",
      ],
      a: 3,
    },
    {
      q: "Guest walks in and immediately heads to the clearance section. What do you do?",
      o: [
        "Leave them alone",
        "Tell them clearance is inferior",
        "Follow and pressure them",
        "Greet warmly, learn their budget, then show best value options at all levels",
      ],
      a: 3,
    },
    {
      q: "'I bought here before and had a bad experience.' Response?",
      o: [
        "Blame the previous associate",
        "Ignore the comment",
        "Get defensive",
        "'I'm sorry about that. Tell me what happened and let me make this experience different'",
      ],
      a: 3,
    },
    {
      q: "'Can I take it home and try it tonight and return it tomorrow?' Response?",
      o: [
        "No, that's not possible",
        "Yes, always say yes",
        "Ignore the question",
        "Explain your trial policy and comfort guarantee — and let them know what it covers",
      ],
      a: 3,
    },
    {
      q: "'I don't want to be upsold.' How do you respond?",
      o: [
        "Stop showing add-ons completely",
        "Apologize and back off",
        "Ignore the comment",
        "'Understood — I'm here to help you find the right fit, not stack products you don't need'",
      ],
      a: 3,
    },
    {
      q: "Guest is clearly in pain when lying on a display mattress. What do you do?",
      o: [
        "Keep pitching the mattress",
        "Ignore the signal",
        "Ask if they're comfortable",
        "'I can see that's not working — let's try something completely different for your specific needs'",
      ],
      a: 3,
    },
    {
      q: "'I read that all mattresses are made in the same factory.' Response?",
      o: [
        "Agree with them",
        "Ignore the claim",
        "Get defensive",
        "'Some shared components exist — but materials, construction quality, and warranties vary enormously'",
      ],
      a: 3,
    },
    {
      q: "Guest seems rushed and distracted. What do you do?",
      o: [
        "Match their energy and rush",
        "Slow them down with a long pitch",
        "Let them browse alone silently",
        "Acknowledge it — 'Looks like you're short on time. What's the most important thing I can help with?'",
      ],
      a: 3,
    },
    {
      q: "'A firm mattress is always better for your back.' True or false?",
      o: [
        "True — always firm",
        "True for everyone over 40",
        "Depends only on weight",
        "False — alignment and sleep position matter more than firmness level",
      ],
      a: 3,
    },
    {
      q: "Guest says nothing and just lies on every mattress quietly. What do you do?",
      o: [
        "Leave them completely alone",
        "Follow closely and keep pitching",
        "Ignore them",
        "Give space, then approach: 'Anything feeling closer to what you're looking for?'",
      ],
      a: 3,
    },
    {
      q: "'I want the best mattress you have.' What do you do first?",
      o: [
        "Show the most expensive",
        "Show your personal favorite",
        "Show the biggest",
        "Ask about their sleep needs — 'best' means different things for different bodies",
      ],
      a: 3,
    },
    {
      q: "'My insurance might cover a new mattress.' How do you handle?",
      o: [
        "Confirm it definitely will",
        "Ignore the topic",
        "Promise to handle the claim",
        "'Some medical plans do cover it — check with your provider. I can give you itemized documentation'",
      ],
      a: 3,
    },
  ],

  // ── SELLING PSYCHOLOGY (40 questions) ─────────────────────────────
  selling_psych: [
    {
      q: "What is 'anchoring' in sales?",
      o: [
        "Tying a guest to the store",
        "A type of mattress support",
        "Matching competitor pricing",
        "Setting an initial price as a reference point for all later comparisons",
      ],
      a: 3,
    },
    {
      q: "Good-better-best pricing — what do most guests choose?",
      o: [
        "The cheapest",
        "The most expensive",
        "The best tier",
        "The middle option",
      ],
      a: 3,
    },
    {
      q: "'Puppy dog close' means?",
      o: [
        "Bringing a pet for comfort",
        "A loyalty program",
        "A financing term",
        "A generous trial — after a week, they won't want to return it",
      ],
      a: 3,
    },
    {
      q: "'Social proof' on the floor sounds like?",
      o: [
        "Social media posts",
        "Bringing in friends",
        "Marketing materials",
        "'This is our most popular model' or 'Most couples choose this one'",
      ],
      a: 3,
    },
    {
      q: "'Takeaway close' technique?",
      o: [
        "Offering food",
        "Removing the mattress from display",
        "A financing term",
        "Suggesting scarcity — triggers loss aversion",
      ],
      a: 0,
    },
    {
      q: "Guest is on their phone during your pitch. What are they likely doing?",
      o: [
        "Being rude",
        "Taking notes",
        "Not interested",
        "Price-checking — say 'Comparing? Let me help you find it'",
      ],
      a: 3,
    },
    {
      q: "Why does 'cost-per-night' reframing work?",
      o: [
        "It confuses guests",
        "It reduces the actual price",
        "It inflates perceived value",
        "It shrinks a large purchase into a manageable daily amount",
      ],
      a: 3,
    },
    {
      q: "'What would make tonight the night?' does what?",
      o: [
        "Sounds too pushy",
        "Violates store policy",
        "Closes too fast",
        "Reveals the real objection holding the guest back",
      ],
      a: 3,
    },
    {
      q: "Best time to introduce financing?",
      o: [
        "Only at the very end",
        "Never — implies they can't afford it",
        "Before showing any mattress",
        "When budget is a stated concern — reframes monthly vs. total cost",
      ],
      a: 3,
    },
    {
      q: "Mirror and match technique means?",
      o: [
        "Using identical pricing",
        "Showing matching sets",
        "Repeating guest words verbatim",
        "Subtly matching the guest's communication style and pace",
      ],
      a: 3,
    },
    {
      q: "Why does building rapport before pitching matter?",
      o: [
        "It wastes time",
        "Guests prefer to browse alone",
        "Only for luxury sales",
        "People buy from people they trust — rapport reduces resistance",
      ],
      a: 3,
    },
    {
      q: "What is a 'trial close'?",
      o: [
        "The end of a sale",
        "A return policy",
        "A soft opening offer",
        "A question that tests readiness without demanding a full commitment",
      ],
      a: 3,
    },
    {
      q: "'Feel, Felt, Found' technique — what is it?",
      o: [
        "A foam testing method",
        "A brand comparison tool",
        "A warranty explanation",
        "Acknowledge their feeling, normalize with others, share what those guests found",
      ],
      a: 3,
    },
    {
      q: "Why use 'we' language instead of 'you' language?",
      o: [
        "It sounds more formal",
        "It implies ownership",
        "It's required by policy",
        "It creates partnership — 'what we want to find for you' reduces pressure",
      ],
      a: 3,
    },
    {
      q: "What does a long pause from a guest usually signal?",
      o: [
        "They're bored",
        "They're about to leave",
        "They didn't hear you",
        "They're processing — don't fill the silence, let them think",
      ],
      a: 3,
    },
    {
      q: "What is the 'Ben Franklin close'?",
      o: [
        "A historical reference",
        "A financing product",
        "A pillow brand",
        "List pros and cons together — seeing more pros visually tips the decision",
      ],
      a: 3,
    },
    {
      q: "What is 'assumptive selling'?",
      o: [
        "Assuming the guest is rich",
        "Guessing their preferred brand",
        "Skipping product knowledge",
        "Speaking as if the sale is happening: 'When we deliver this, you'll want to...'",
      ],
      a: 3,
    },
    {
      q: "What is 'scarcity close' and when is it ethical to use it?",
      o: [
        "Never ethical",
        "Always use it",
        "Only on clearance items",
        "Only when inventory is genuinely limited — never manufacture false urgency",
      ],
      a: 3,
    },
    {
      q: "What body language signals buying readiness?",
      o: [
        "Arms crossed",
        "Looking at their phone",
        "Backing away",
        "Leaning in, touching the mattress, asking delivery questions",
      ],
      a: 3,
    },
    {
      q: "What is 'active listening' in a sales context?",
      o: [
        "Listening while walking",
        "Just nodding",
        "Waiting for your turn to talk",
        "Reflecting back what guests say to show you understood and build trust",
      ],
      a: 3,
    },
    {
      q: "What is the 'summary close'?",
      o: [
        "Reading back the receipt",
        "A return policy",
        "A brand overview",
        "Reviewing all the guest's stated needs, then showing how your recommendation meets each one",
      ],
      a: 3,
    },
    {
      q: "What is 'objection prevention'?",
      o: [
        "Avoiding tough conversations",
        "Dismissing concerns early",
        "Only answering when asked",
        "Addressing likely objections proactively before the guest raises them",
      ],
      a: 3,
    },
    {
      q: "What does 'open-ended question' mean in sales?",
      o: [
        "A question with no answer",
        "A question about pricing",
        "Any question you ask",
        "A question that can't be answered with yes/no — opens up conversation",
      ],
      a: 3,
    },
    {
      q: "What is 'third-party validation'?",
      o: [
        "Getting a manager involved",
        "A warranty term",
        "A brand partnership",
        "Using reviews, awards, or other customers' stories to build credibility",
      ],
      a: 3,
    },
    {
      q: "What is the 'sharp angle close'?",
      o: [
        "A pricing tactic",
        "A delivery term",
        "A discount strategy",
        "Responding to a guest's condition with a yes — 'If I can do X, will you buy today?'",
      ],
      a: 3,
    },
    {
      q: "What does 'urgency without pressure' look like?",
      o: [
        "Fake deadlines",
        "Aggressive follow-up",
        "Discounting quickly",
        "Mentioning genuine timing factors — financing windows, delivery schedules, low stock",
      ],
      a: 3,
    },
    {
      q: "What is 'pain agitation' in selling?",
      o: [
        "Causing physical discomfort",
        "A negative tactic",
        "A massage feature",
        "Helping the guest feel the real cost of NOT solving their sleep problem",
      ],
      a: 3,
    },
    {
      q: "What is 'value stacking'?",
      o: [
        "Putting mattresses on top of each other",
        "A financing trick",
        "A brand ranking",
        "Adding up all the benefits — comfort, health, trial period, warranty — to justify the price",
      ],
      a: 3,
    },
    {
      q: "What does 'pacing the guest' mean?",
      o: [
        "Walking fast",
        "Rushing through the pitch",
        "Ignoring their pace",
        "Matching your energy and speed to the guest's comfort level",
      ],
      a: 3,
    },
    {
      q: "What is the 'alternative choice close'?",
      o: [
        "Showing two stores",
        "A financing choice",
        "A warranty tier",
        "'Would you prefer delivery Saturday or Monday?' — assumes the sale, offers a choice",
      ],
      a: 3,
    },
    {
      q: "What is 'the takeaway' close in practice?",
      o: [
        "Removing a discount",
        "Giving a gift",
        "A return policy",
        "'This is our last one at this price — but if it's not right for you, no worries'",
      ],
      a: 3,
    },
    {
      q: "Why should you never bad-mouth a competitor?",
      o: [
        "Store policy",
        "Legal reasons",
        "Competitors are allies",
        "It makes you look insecure and shifts focus away from your own value proposition",
      ],
      a: 3,
    },
    {
      q: "What is a 'silent close'?",
      o: [
        "Not speaking during the sale",
        "A written offer",
        "A non-verbal signal",
        "After presenting your recommendation, stop talking and let the guest process",
      ],
      a: 3,
    },
    {
      q: "What does 'building perceived value' mean?",
      o: [
        "Inflating the price",
        "Hiding the real price",
        "Comparing to competitors",
        "Helping the guest understand all the benefits so the price feels justified",
      ],
      a: 3,
    },
    {
      q: "What is 'emotional vs. rational selling'?",
      o: [
        "Crying during the pitch",
        "Memorizing specs",
        "Using only logic",
        "Lead with how it will feel and the problems it solves; support with facts",
      ],
      a: 3,
    },
    {
      q: "What is the best time to ask for the sale?",
      o: [
        "At the very beginning",
        "Only at the end",
        "Never ask directly",
        "When the guest shows buying signals — lean in, ask delivery questions, nod approval",
      ],
      a: 3,
    },
    {
      q: "What is 'the power of the pause' in sales?",
      o: [
        "Taking a break",
        "Slowing down the product pitch",
        "Pausing before discounting",
        "After asking a closing question, silence creates space — resist filling it",
      ],
      a: 3,
    },
    {
      q: "What is 'objection reframing'?",
      o: [
        "Ignoring the objection",
        "Arguing against the objection",
        "Discounting to overcome it",
        "Turning an objection into a reason to buy: 'That's exactly why I recommend this one'",
      ],
      a: 3,
    },
    {
      q: "What is 'reciprocity' in sales psychology?",
      o: [
        "Matching prices",
        "A loyalty program",
        "Giving gifts randomly",
        "When you give value first — info, time, expertise — guests feel inclined to reciprocate",
      ],
      a: 3,
    },
    {
      q: "What makes a great discovery question?",
      o: [
        "It leads to the most expensive option",
        "It's closed-ended",
        "It's about price only",
        "It reveals the guest's real sleep problem, lifestyle, and what success looks like for them",
      ],
      a: 3,
    },
  ],

  // ── MATH & FINANCING (35 questions) ───────────────────────────────
  financing: [
    {
      q: "'Can't afford $2,000.' Best reframe?",
      o: [
        "Show cheaper options only",
        "Apologize and discount",
        "Tell them to come back",
        "'That's 55 cents per night for 10 years — less than a cup of coffee'",
      ],
      a: 3,
    },
    {
      q: "0% APR as a selling tool works because?",
      o: [
        "It's a mattress type",
        "It extends warranty",
        "It's a delivery option",
        "A $3K premium mattress = same monthly cost as a budget one with interest",
      ],
      a: 3,
    },
    {
      q: "'Let me check my bank' usually means?",
      o: [
        "They're making a transfer",
        "They're checking their balance",
        "They're ready to buy",
        "They're stalling — not fully convinced. Offer financing.",
      ],
      a: 3,
    },
    {
      q: "$3,000 ÷ 60 months = ?",
      o: ["$75/month", "$100/month", "$60/month", "$50/month"],
      a: 3,
    },
    {
      q: "$800/5yr vs. $2,000/12yr — annual cost comparison?",
      o: [
        "$800 is clearly cheaper",
        "Can't be calculated",
        "They're identical",
        "Nearly same annual cost — but the $2K gives 7 more years of better support",
      ],
      a: 3,
    },
    {
      q: "$1,800 → $2,400 ticket. What % increase?",
      o: ["20%", "25%", "50%", "33%"],
      a: 3,
    },
    {
      q: "7hrs × 365 × 10 years = how many hours on a mattress?",
      o: ["10,000 hrs", "15,000 hrs", "20,000 hrs", "25,550 hrs"],
      a: 3,
    },
    {
      q: "$2,400 ÷ 3,650 nights = cost per night?",
      o: ["$2.40", "$1.50", "$1.00", "$0.66"],
      a: 3,
    },
    {
      q: "When should you introduce monthly payment math?",
      o: [
        "Only at the register",
        "Never — implies they can't afford it",
        "Only for purchases over $3,000",
        "As soon as price resistance appears",
      ],
      a: 3,
    },
    {
      q: "How does 0% financing make premium feel accessible?",
      o: [
        "It reduces the actual price",
        "It adds hidden fees",
        "It shortens warranty",
        "Same monthly as a budget mattress — without the interest penalty",
      ],
      a: 3,
    },
    {
      q: "$800 difference between two mattresses ÷ 60 months = ?",
      o: [
        "$20/month more",
        "$30/month more",
        "$25/month more",
        "About $13/month more",
      ],
      a: 3,
    },
    {
      q: "What is the 'sleep investment' framing?",
      o: [
        "A financing product",
        "A warranty tier",
        "A luxury upsell",
        "Repositioning a mattress from a cost to an investment in daily health and energy",
      ],
      a: 3,
    },
    {
      q: "$1,000 mattress at 20% APR over 24 months — approximate monthly payment?",
      o: ["$35/month", "$55/month", "$41/month", "$50/month"],
      a: 3,
    },
    {
      q: "How many hours does the average person spend on a mattress per year?",
      o: [
        "1,200 hours",
        "2,000 hours",
        "3,000 hours",
        "2,555 hours (7hrs x 365)",
      ],
      a: 3,
    },
    {
      q: "What is a 'deferred interest' financing offer?",
      o: [
        "Always good for the customer",
        "No interest ever",
        "Just a marketing term",
        "0% if paid in full within promo period — interest backdated if not paid off",
      ],
      a: 3,
    },
    {
      q: "$600 mattress vs. $1,200 mattress — cost difference per night over 10 years?",
      o: [
        "$0.60/night more",
        "$0.33/night more",
        "$1.00/night more",
        "About $0.16/night more",
      ],
      a: 3,
    },
    {
      q: "Guest says 'I'll just finance it and pay it off early.' Smart response?",
      o: [
        "Talk them out of it",
        "Agree and say nothing more",
        "Ignore the plan",
        "'Great plan — just confirm there's no prepayment penalty on the terms'",
      ],
      a: 3,
    },
    {
      q: "What is Synchrony Bank used for in mattress retail?",
      o: [
        "Online-only purchases",
        "Employee purchases",
        "Warranty claims",
        "Consumer financing for in-store mattress and accessory purchases",
      ],
      a: 3,
    },
    {
      q: "How do you introduce financing without making it awkward?",
      o: [
        "Only if they bring it up",
        "Avoid it",
        "Mention it at checkout only",
        "'We have 0% options that make this really manageable — want me to walk you through it?'",
      ],
      a: 3,
    },
    {
      q: "What is a 'double ticket' strategy?",
      o: [
        "Selling two mattresses",
        "A pricing error",
        "A warranty bundle",
        "Selling the full system — mattress + base + protector + pillow",
      ],
      a: 3,
    },
    {
      q: "Guest buys $1,500 mattress + $500 base + $100 protector + $80 pillow. Total ticket?",
      o: ["$1,500", "$2,000", "$2,100", "$2,180"],
      a: 3,
    },
    {
      q: "What is the 'rule of 3,650'?",
      o: [
        "A coil count standard",
        "A warranty requirement",
        "A brand tier system",
        "Divide total mattress cost by 3,650 nights to get cost-per-night over 10 years",
      ],
      a: 3,
    },
    {
      q: "$179 protector on a $1,800 ticket = what % add-on?",
      o: ["5%", "15%", "20%", "About 10%"],
      a: 3,
    },
    {
      q: "How do you justify a $200 pillow?",
      o: [
        "You can't",
        "Only for luxury buyers",
        "Avoid the conversation",
        "'That's $0.055/night over 10 years — less than a penny per sleep. For your neck support.'",
      ],
      a: 3,
    },
    {
      q: "What does APR stand for?",
      o: [
        "Annual Purchase Rate",
        "Applied Pricing Rate",
        "Adjusted Payment Rate",
        "Annual Percentage Rate",
      ],
      a: 3,
    },
    {
      q: "If a guest qualifies for 18 months same-as-cash, how do you pitch it?",
      o: [
        "Avoid mentioning it",
        "Only mention at checkout",
        "Say it's complicated",
        "'You can take 18 months to pay with no interest — break it down to whatever works for you'",
      ],
      a: 3,
    },
    {
      q: "What is the best way to handle a guest on a strict $500 budget?",
      o: [
        "Show only $500 options",
        "Tell them it's not enough",
        "Skip add-ons entirely",
        "Show best value at $500, add protector, keep them in the system for future upgrade",
      ],
      a: 3,
    },
    {
      q: "$3,600 mattress. Salesperson says 'That's a lot.' What's wrong with that?",
      o: [
        "Nothing wrong",
        "Should say it differently",
        "Should offer a discount",
        "Never anchor a negative — you just validated their price objection",
      ],
      a: 3,
    },
    {
      q: "What is 'ticket building' in mattress sales?",
      o: [
        "Writing up the receipt",
        "A pricing system",
        "A brand strategy",
        "Strategically adding base + protector + pillow to grow total transaction value",
      ],
      a: 3,
    },
    {
      q: "Guest finances $2,400 at 0% for 36 months. Monthly payment?",
      o: ["$100/month", "$80/month", "$60/month", "$66.67/month"],
      a: 3,
    },
    {
      q: "How does mattress price compare to other sleep costs guests already pay?",
      o: [
        "It's always the most expensive",
        "No fair comparison",
        "Only compare to cars",
        "'You probably spend $100/month on coffee or streaming — this is $0.55/night for 10 years'",
      ],
      a: 3,
    },
    {
      q: "What is 'anchoring up' in financing?",
      o: [
        "A loan type",
        "A price guarantee",
        "A brand comparison",
        "Show the high-end first so mid-tier feels affordable by comparison",
      ],
      a: 3,
    },
    {
      q: "What is a 'soft pull' credit check?",
      o: [
        "A gentle credit inquiry",
        "A type of financing",
        "A store policy",
        "Pre-qualification that doesn't affect credit score — great first step for hesitant guests",
      ],
      a: 3,
    },
    {
      q: "Why is it important to know your store's current financing promotions?",
      o: [
        "Not important",
        "Only for big purchases",
        "Rarely matters",
        "It's a key closing tool — the right promo can flip a 'no' to a 'yes'",
      ],
      a: 3,
    },
    {
      q: "What does 'revenue per guest' mean and why does it matter?",
      o: [
        "Total store revenue",
        "A brand metric",
        "A delivery stat",
        "Average transaction value per customer — add-ons directly raise this number",
      ],
      a: 3,
    },
  ],

  // ── CUSTOMER PROFILING (40 questions) ─────────────────────────────
  profiling: [
    {
      q: "Millennial couple — best approach?",
      o: [
        "Same as everyone",
        "Focus on price only",
        "Focus on health only",
        "Lifestyle benefits, transparency, and real reviews + technology story",
      ],
      a: 3,
    },
    {
      q: "Retired couple — focus on?",
      o: [
        "Cheapest option",
        "Trendiest model",
        "Speed of delivery",
        "Health benefits, ease of use, base demo, and long-term value",
      ],
      a: 3,
    },
    {
      q: "Buying for a college student?",
      o: [
        "Luxury model",
        "Most expensive",
        "No protector needed",
        "Durable, affordable, easy setup — and always include a protector",
      ],
      a: 3,
    },
    {
      q: "Guest mentions chronic back pain — first question?",
      o: [
        "What's your budget?",
        "What brand do you want?",
        "How fast do you need it?",
        "'Where specifically — lower, upper, or both? What position do you sleep in?'",
      ],
      a: 3,
    },
    {
      q: "Hot sleeper profiling — what to emphasize?",
      o: [
        "Plush feel",
        "Coil count",
        "Pillow height",
        "Cooling technology, breathable covers, and airflow-optimized construction",
      ],
      a: 3,
    },
    {
      q: "Couple with different firmness preferences?",
      o: [
        "Pick the softer one",
        "Pick the firmer one",
        "Tell them to compromise",
        "Split king adjustable base — each side fully customizable",
      ],
      a: 3,
    },
    {
      q: "Guest who researched everything online — approach?",
      o: [
        "Ignore their research",
        "Compete with their knowledge",
        "Simplify everything",
        "Validate their research, then add what the internet can't: in-person feel and expert fit",
      ],
      a: 3,
    },
    {
      q: "Guest buying for Airbnb property?",
      o: [
        "Luxury mattress only",
        "Cheapest available",
        "No protector needed",
        "Durable mid-range with heavy-duty waterproof protector — durability is priority",
      ],
      a: 3,
    },
    {
      q: "Guest with fibromyalgia — what matters most?",
      o: [
        "Firmness only",
        "Brand name",
        "Price only",
        "Pressure relief and temperature regulation — pain sensitivity requires extra care",
      ],
      a: 3,
    },
    {
      q: "Night shift worker — what do they need?",
      o: [
        "Standard mattress",
        "Cheapest option",
        "Luxury only",
        "Blackout-compatible setup, temperature regulation, maximum comfort for daytime sleep",
      ],
      a: 3,
    },
    {
      q: "First-time mattress buyer — what do they need most?",
      o: [
        "Most expensive option",
        "Most technical explanation",
        "No guidance needed",
        "Education first — walk them through types, firmness, and sleep position basics",
      ],
      a: 3,
    },
    {
      q: "Guest trading up from a $400 mattress — approach?",
      o: [
        "Show only budget options",
        "Immediately show most expensive",
        "Ignore their history",
        "Acknowledge their upgrade mindset, show the quality jump from entry to mid-range",
      ],
      a: 3,
    },
    {
      q: "Pregnant guest — key considerations?",
      o: [
        "No special needs",
        "Only size matters",
        "Standard recommendation",
        "Side sleeping support, pressure relief on hips and shoulders, adjustable base for comfort",
      ],
      a: 3,
    },
    {
      q: "Guest with sleep apnea — what to recommend?",
      o: [
        "Ignore the condition",
        "Softest mattress",
        "No recommendation possible",
        "Adjustable base for head elevation + supportive mattress — can reduce apnea episodes",
      ],
      a: 3,
    },
    {
      q: "Guest buying for an elderly parent?",
      o: [
        "Cheapest available",
        "No special needs",
        "Firmest option",
        "Easy entry/exit height, supportive but pressure-relieving, adjustable base a strong option",
      ],
      a: 3,
    },
    {
      q: "Heavy guest (300+ lbs) — what matters most?",
      o: [
        "Thread count",
        "Softest feel",
        "Pillow count",
        "High-density foam, reinforced coils, strong edge support, and firm to medium-firm feel",
      ],
      a: 3,
    },
    {
      q: "Light guest (under 130 lbs) — what to avoid?",
      o: [
        "Soft mattresses",
        "Any hybrid",
        "All-foam mattresses",
        "Very firm mattresses — lighter guests don't compress enough to activate support",
      ],
      a: 3,
    },
    {
      q: "Guest with restless leg syndrome — what helps?",
      o: [
        "Hardest mattress",
        "Nothing helps",
        "Softest mattress only",
        "Motion-isolating mattress + adjustable base massage to relax legs before sleep",
      ],
      a: 3,
    },
    {
      q: "Guest buying a mattress for their child (age 10) — key factors?",
      o: [
        "Luxury brands only",
        "Adult specifications apply",
        "No protector needed",
        "Supportive, durable, waterproof protector essential, age-appropriate size",
      ],
      a: 3,
    },
    {
      q: "Guest who is a professional athlete — what to emphasize?",
      o: [
        "Budget options",
        "Standard comfort",
        "Brand name only",
        "Recovery-focused — pressure relief, temperature regulation, and adjustable base for recovery positioning",
      ],
      a: 3,
    },
    {
      q: "Guest mentions shoulder pain — what's the best starting point?",
      o: [
        "Firm mattress",
        "Innerspring only",
        "No special consideration",
        "Side sleeper with shoulder pain = softer feel with good shoulder cradle, often memory foam or hybrid",
      ],
      a: 3,
    },
    {
      q: "Couple where one is a side sleeper and one is a back sleeper?",
      o: [
        "Pick based on back sleeper",
        "Pick based on side sleeper",
        "Tell them to sleep separately",
        "Medium feel hybrid — compromise that works for both positions",
      ],
      a: 3,
    },
    {
      q: "Guest who travels frequently for work — what do they value?",
      o: [
        "Lowest price",
        "Same as everyone",
        "No special needs",
        "Consistent deep sleep quality — high comfort, motion isolation, and possibly base for jet lag recovery",
      ],
      a: 3,
    },
    {
      q: "Guest mentions they have allergies — key recommendation?",
      o: [
        "Any mattress works",
        "Price-based only",
        "Ignore the mention",
        "Hypoallergenic protector, pillow with certified clean fill, and mattress with allergen-resistant cover",
      ],
      a: 3,
    },
    {
      q: "Guest is a stomach sleeper with lower back pain — what to recommend?",
      o: [
        "Very soft mattress",
        "Extra firm always best",
        "No recommendation possible",
        "Medium-firm to firm — stomach sleepers need hips prevented from sinking",
      ],
      a: 3,
    },
    {
      q: "Guest buying a mattress to improve their work performance?",
      o: [
        "Ignore this angle",
        "Only relevant for athletes",
        "No connection to mattresses",
        "Sleep directly impacts focus, mood, and performance — make the health ROI connection",
      ],
      a: 3,
    },
    {
      q: "Guest says 'I sleep fine.' How do you create awareness?",
      o: [
        "Take them at their word",
        "Skip the sale",
        "Assume they don't need anything",
        "Ask: 'How do you feel when you first wake up? Any stiffness? Do you wake up during the night?'",
      ],
      a: 3,
    },
    {
      q: "Guest with a toddler at home — what do they value?",
      o: [
        "Trendy aesthetics",
        "Brand names only",
        "Price only",
        "Quick delivery, easy setup, durable materials, and a protector for inevitable spills",
      ],
      a: 3,
    },
    {
      q: "Guest buying their first king-size bed — what to address?",
      o: [
        "Nothing special",
        "Only size matters",
        "Same as twin buyer",
        "Foundation/frame compatibility, room dimensions, split king base option, and budget planning",
      ],
      a: 3,
    },
    {
      q: "Guest mentions poor sleep affecting their relationship — how do you respond?",
      o: [
        "Ignore personal details",
        "Sell them two mattresses",
        "Move on quickly",
        "Empathize and connect — better sleep transforms daily life together. Show split king option.",
      ],
      a: 3,
    },
    {
      q: "What does profiling a guest early accomplish?",
      o: [
        "Wastes time",
        "Only helps with brand choice",
        "Only useful for price negotiation",
        "Allows you to match the right product, save time, and build trust through personalization",
      ],
      a: 3,
    },
    {
      q: "Guest is clearly on a tight budget but has back pain. What do you do?",
      o: [
        "Ignore their pain and sell cheap",
        "Push luxury and hope they finance",
        "Skip soft goods entirely",
        "Start at good-better-best in their range, mention financing, always include a protector",
      ],
      a: 3,
    },
    {
      q: "Guest mentions they've had 3 mattresses in 5 years. What does that tell you?",
      o: [
        "They're indecisive",
        "They're wealthy",
        "They return everything",
        "They haven't found the right fit — discovery is critical. Ask what went wrong each time.",
      ],
      a: 3,
    },
    {
      q: "Guest buying mattress as a gift — what do you need to know?",
      o: [
        "Nothing extra",
        "Just the price",
        "Only the size",
        "Recipient's sleep position, health needs, size preference, and whether they'll want to exchange",
      ],
      a: 3,
    },
    {
      q: "Guest has a new puppy and is worried about damage — what do you recommend?",
      o: [
        "No special recommendation",
        "Skip the protector pitch",
        "Suggest a different brand",
        "Waterproof encasement protector — full six-side protection for worst-case scenarios",
      ],
      a: 3,
    },
    {
      q: "What is the 'sleep story' approach to profiling?",
      o: [
        "Telling guests about your own sleep",
        "A marketing campaign",
        "A brand origin story",
        "Asking guests to describe their ideal sleep experience — builds emotional investment",
      ],
      a: 3,
    },
    {
      q: "Guest says their doctor told them to get a new mattress. How do you use this?",
      o: [
        "Tell them the doctor is wrong",
        "Ignore it — doctors don't know mattresses",
        "Just show the most expensive",
        "Validate the doctor's advice and use it as a strong buying motivator — it's already a decided need",
      ],
      a: 3,
    },
    {
      q: "Guest shopping for a vacation rental property (multiple units)?",
      o: [
        "Standard single-unit approach",
        "No special consideration",
        "Skip soft goods",
        "Volume opportunity — durable mid-range + protectors on every unit, ask about future purchases",
      ],
      a: 3,
    },
    {
      q: "Guest mentions waking up 3–4 times per night. What does this suggest?",
      o: [
        "Normal, nothing to address",
        "They sleep too much",
        "They need a bigger bed",
        "Could indicate discomfort, temperature issues, or support problems — all solvable with the right mattress",
      ],
      a: 3,
    },
    {
      q: "What does 'lifestyle selling' mean in mattress retail?",
      o: [
        "Selling based on income",
        "Selling based on brand preference",
        "Selling based on room decor",
        "Connecting the mattress to the guest's real life — their health, energy, relationships, and performance",
      ],
      a: 3,
    },
  ],

  // ── COMPETITIVE INTEL (47 questions) ──────────────────────────────
  competitive: [
    {
      q: "Sleep Number's biggest weakness?",
      o: [
        "Only one firmness",
        "No warranty offered",
        "Only sold online",
        "Air chambers can develop leaks and require costly maintenance over time",
      ],
      a: 3,
    },
    {
      q: "Mattress Firm's most common pressure tactic?",
      o: [
        "Free delivery always",
        "Aggressive loyalty rewards",
        "Bundle discounts",
        "Artificial urgency — 'sale ends tonight' (it almost always doesn't)",
      ],
      a: 3,
    },
    {
      q: "Sleep Number 'trench effect' refers to?",
      o: [
        "A delivery issue",
        "A firmness setting",
        "A return policy",
        "The valley that forms between two sides of a split air bed over time",
      ],
      a: 3,
    },
    {
      q: "How do you counter 'Sleep Number lets me adjust firmness'?",
      o: [
        "Ours does too",
        "Agree and lose the sale",
        "Show only firm options",
        "Adjustable bases + multiple firmness options give customization without air leak risk",
      ],
      a: 3,
    },
    {
      q: "Mattress Firm model name tactic?",
      o: [
        "They sell better mattresses",
        "They offer better warranties",
        "They're always cheaper",
        "Same mattress, different name by retailer so consumers can't comparison shop",
      ],
      a: 3,
    },
    {
      q: "'I can get 120 nights at Mattress Firm.' Response?",
      o: [
        "We can't compete with that",
        "Match it regardless",
        "Ignore it",
        "'Check our trial — more importantly, let's get it right the first time together'",
      ],
      a: 3,
    },
    {
      q: "Purple's biggest in-store weakness?",
      o: [
        "No warranty",
        "Only one model",
        "Always too expensive",
        "Unfamiliar feel causes hesitation — needs a strong hands-on demo to convert",
      ],
      a: 3,
    },
    {
      q: "Casper's primary sales channel?",
      o: [
        "Walmart",
        "Hospital chains",
        "Department stores",
        "Direct-to-consumer online — no try-before-you-buy experience",
      ],
      a: 3,
    },
    {
      q: "How does online mattress shopping hurt the consumer?",
      o: [
        "Worse warranties",
        "Higher prices",
        "No loyalty program",
        "No ability to test comfort on their specific body — returns are wasteful and inconvenient",
      ],
      a: 3,
    },
    {
      q: "Sleep Number 'SleepIQ' is?",
      o: [
        "A mattress material",
        "A pillow product",
        "A financing option",
        "Sleep tracking via sensors built into the mattress",
      ],
      a: 3,
    },
    {
      q: "Strongest argument vs. any online brand?",
      o: [
        "We're cheaper",
        "Longer warranties",
        "More models",
        "You can test it right now on your body with an expert — you can't do that online",
      ],
      a: 3,
    },
    {
      q: "Mattress Firm 'Sleep Expert' program?",
      o: [
        "Certified sleep doctors on staff",
        "Free medical assessments",
        "Academic credentials required",
        "Associates complete 200+ hours of training — match and exceed this with your expertise",
      ],
      a: 3,
    },
    {
      q: "How do you beat an online price match request?",
      o: [
        "Just match it",
        "Refuse",
        "Ignore the request",
        "'Let's confirm it's truly the same product. Then we can talk. But here you get the full experience.'",
      ],
      a: 3,
    },
    {
      q: "Sleep Number pricing range?",
      o: ["$300–$1,000", "$500–$2,000", "$800–$3,000", "$1,099–$5,999+"],
      a: 3,
    },
    {
      q: "Sleep Number trial period?",
      o: ["30 nights", "60 nights", "120 nights", "100 nights"],
      a: 3,
    },
    {
      q: "Sleep Number warranty?",
      o: ["5-year", "10-year", "Lifetime", "15-year limited"],
      a: 3,
    },
    {
      q: "What is Sleep Number's 'SleepIQ score'?",
      o: [
        "A firmness number",
        "A price tier",
        "A warranty rating",
        "A daily sleep quality score based on movement, breathing, and heart rate data",
      ],
      a: 3,
    },
    {
      q: "Why does Sleep Number's app dependency create a weakness?",
      o: [
        "It doesn't",
        "Only for tech-averse guests",
        "Minor inconvenience only",
        "App bugs mean data gaps — and the mattress itself is still just air + foam underneath",
      ],
      a: 3,
    },
    {
      q: "What is Mattress Firm's 120-night guarantee fine print risk?",
      o: [
        "No fine print",
        "Always fully refunded",
        "Easy to use",
        "Exchanges often involve fees or limited selections — not a true full return in all cases",
      ],
      a: 3,
    },
    {
      q: "Mattress Firm pricing range?",
      o: ["$100–$1,000", "$200–$2,000", "$500–$5,000", "$300–$8,000+"],
      a: 3,
    },
    {
      q: "What are Mattress Firm's core brand weaknesses vs. a specialty store?",
      o: [
        "They have better selection",
        "They're always cheaper",
        "Their associates are better trained",
        "Volume focus, high-pressure culture, manufactured scarcity, and inflated 'sale' pricing",
      ],
      a: 3,
    },
    {
      q: "'They're doing a manager special at Mattress Firm.' Response?",
      o: [
        "Agree and discount",
        "Ignore it",
        "Can't compete",
        "'That's a common tactic — let me show you our actual pricing and what you get for it'",
      ],
      a: 3,
    },
    {
      q: "Nectar mattress positioning?",
      o: [
        "Luxury brand",
        "Retail-only",
        "Premium brick-and-mortar",
        "Budget-friendly bed-in-a-box — long trial, but no in-person fit, one-size feel",
      ],
      a: 3,
    },
    {
      q: "Tuft & Needle positioning?",
      o: [
        "Luxury brand",
        "Medical brand",
        "Traditional retail",
        "DTC simplified — minimal options, foam-only, no expert guidance, no customization",
      ],
      a: 3,
    },
    {
      q: "What is the 'bed-in-a-box' disadvantage vs. in-store purchase?",
      o: [
        "Higher price",
        "Worse warranty",
        "Better selection online",
        "Compressed shipping means off-gassing, no fit testing, and inconvenient returns",
      ],
      a: 3,
    },
    {
      q: "How do Amazon mattress brands compete — and what's their weakness?",
      o: [
        "Better quality",
        "Longer warranties",
        "More selection",
        "Low price + Prime shipping — but zero fit expertise and unknown long-term quality",
      ],
      a: 3,
    },
    {
      q: "What is the key question to ask when a guest mentions a competitor?",
      o: [
        "'Have you bought from them before?'",
        "'Can you afford it?'",
        "'Do you like their brand?'",
        "'Did you actually lie on it? How did your body feel after 10 minutes?'",
      ],
      a: 3,
    },
    {
      q: "'Saatva is rated #1 online.' How do you respond?",
      o: [
        "Agree — Saatva is great",
        "Ignore the claim",
        "Argue the rating",
        "'Online ratings are often affiliate-driven. Let me show you what your body tells you in person.'",
      ],
      a: 3,
    },
    {
      q: "What is the 'white glove' delivery advantage over online brands?",
      o: [
        "Faster shipping",
        "Just marketing",
        "Only for expensive mattresses",
        "In-home delivery, setup, removal of old mattress, and post-purchase support",
      ],
      a: 3,
    },
    {
      q: "What is a 'DTC' (direct-to-consumer) brand's business model?",
      o: [
        "Sells through retail only",
        "Sells through hospitals",
        "Partners with specialty stores",
        "Sells online direct, no retailer markup — but no try-before-you-buy or expert fitting",
      ],
      a: 3,
    },
    {
      q: "How do you handle a guest who bought online before and wasn't happy?",
      o: [
        "Tell them it was their fault",
        "Ignore their history",
        "Agree online is bad",
        "Validate their experience, then show them exactly what in-person expert fitting looks like",
      ],
      a: 3,
    },
    {
      q: "What is Mattress Firm's 'staged discount' tactic?",
      o: [
        "An honest sale",
        "A real markdown",
        "A loyalty perk",
        "Prices artificially inflated so percentage discounts look impressive — the 'sale' is the normal price",
      ],
      a: 3,
    },
    {
      q: "How does your store's expertise differentiate vs. Mattress Firm volume selling?",
      o: [
        "It doesn't really",
        "Only for luxury buyers",
        "Expertise isn't a selling point",
        "Fewer transactions per associate means deeper knowledge, slower pitch, better fit",
      ],
      a: 3,
    },
    {
      q: "Sleep Number's coil limitation — what is it?",
      o: [
        "They use cheap coils",
        "They use too many coils",
        "They have great coil support",
        "Sleep Number has NO coils — just air + foam, which sags faster for heavier sleepers",
      ],
      a: 3,
    },
    {
      q: "What is the 'center gap' weakness of Sleep Number split beds?",
      o: [
        "Doesn't exist",
        "Minor cosmetic issue",
        "Only for tall people",
        "Two separate air chambers create a noticeable gap in the center — uncomfortable for closeness",
      ],
      a: 3,
    },
    {
      q: "How do you counter 'I can return it if I don't like it' from an online buyer?",
      o: [
        "Agree — returns are easy",
        "Ignore the point",
        "Say returns are bad",
        "'Returns for mattresses are actually difficult — compression, scheduling, restocking. Get it right here first.'",
      ],
      a: 3,
    },
    {
      q: "What is the Purple 'try before you buy' weakness?",
      o: [
        "No weakness",
        "Great in-store experience",
        "Always available",
        "Purple is sold online and in limited retail — most guests can't feel it before buying",
      ],
      a: 3,
    },
    {
      q: "What is Casper's main competitive weakness vs. your store?",
      o: [
        "Worse pricing",
        "Fewer models",
        "Shorter warranty",
        "No in-store fit — they sell one feel, one firmness per model, no expert guidance",
      ],
      a: 3,
    },
    {
      q: "What does 'showrooming' mean in retail?",
      o: [
        "Showing the showroom to guests",
        "A display strategy",
        "A training term",
        "Guest tries mattress in your store, then buys it online — counter with service and price matching",
      ],
      a: 3,
    },
    {
      q: "'I watched a YouTube review and...' How do you respond?",
      o: [
        "Dismiss YouTube",
        "Argue with the reviewer",
        "Ask for the channel",
        "'Great research! What specifically did they say? Let's see if that matches what your body tells us here.'",
      ],
      a: 3,
    },
    {
      q: "What is the strongest counter to ANY online competitor?",
      o: [
        "Price match guarantee",
        "Longer warranty",
        "Better brand",
        "The in-person test on your specific body with expert guidance — impossible to replicate online",
      ],
      a: 3,
    },
    {
      q: "Why does brand fragmentation at Mattress Firm create confusion?",
      o: [
        "It doesn't",
        "Only for first-time buyers",
        "Minor issue",
        "Carrying 50+ brands with identical names across retailers makes comparison impossible for consumers",
      ],
      a: 3,
    },
    {
      q: "What is your single best competitive advantage as a sleep specialist?",
      o: [
        "Lower prices",
        "More brands",
        "Faster delivery",
        "Knowledge, trust, and the ability to match a specific body to a specific sleep solution in person",
      ],
      a: 3,
    },
    {
      q: "'I'll just order the same model on Amazon.' Response?",
      o: [
        "Can't compete",
        "Match the price",
        "Agree and let them go",
        "'The model name might match — the specs often don't. Let me pull up exactly what's in each version.'",
      ],
      a: 3,
    },
    {
      q: "How do you respond when a guest says 'I trust online reviews more than salespeople'?",
      o: [
        "Get defensive",
        "Agree with them",
        "Ignore the comment",
        "'Fair — that's why I want to show you, not just tell you. Your body won't lie. Try it.'",
      ],
      a: 3,
    },
    {
      q: "What is the Sleep Number 'smart home dependency' weakness?",
      o: [
        "Not a weakness",
        "Minor tech issue",
        "Only affects techies",
        "Relies on Wi-Fi, app, and proprietary system — outages or bugs disrupt the entire experience",
      ],
      a: 3,
    },
    {
      q: "What is the final reason a well-trained specialist always beats online brands?",
      o: [
        "Price",
        "Selection",
        "Speed",
        "Personalization — no algorithm can replace a trained human who listens, asks, and fits",
      ],
      a: 3,
    },
  ],
};

// ── CATEGORIES ──────────────────────────────────────────────────────
const CATS = [
  { id: "mattresses", label: "Mattresses", icon: "🛏️", color: "#1d4ed8" },
  { id: "adjustable", label: "Adjustable Bases", icon: "⚙️", color: "#7c3aed" },
  { id: "soft_goods", label: "Soft Goods", icon: "🧣", color: "#059669" },
  { id: "objections", label: "Objections", icon: "🥊", color: "#dc2626" },
  {
    id: "selling_psych",
    label: "Selling Psychology",
    icon: "🧠",
    color: "#6366f1",
  },
  { id: "financing", label: "Math & Financing", icon: "💰", color: "#d97706" },
  {
    id: "profiling",
    label: "Customer Profiling",
    icon: "🎯",
    color: "#0891b2",
  },
  {
    id: "competitive",
    label: "Competitive Intel",
    icon: "⚔️",
    color: "#be185d",
  },
];

const RANKS = [
  { min: 0, label: "Rookie", icon: "🛏️" },
  { min: 100, label: "Floor Starter", icon: "👟" },
  { min: 300, label: "Sleep Advisor", icon: "💬" },
  { min: 600, label: "Mattress Pro", icon: "⭐" },
  { min: 1000, label: "KY Certified", icon: "🏅" },
  { min: 2000, label: "Sleep Master", icon: "🏆" },
  { min: 5000, label: "Grand Mattress Master", icon: "👑" },
];

function getRank(xp) {
  return [...RANKS].reverse().find((r) => xp >= r.min) || RANKS[0];
}
function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

// ── AUTH ─────────────────────────────────────────────────────────────
function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [store, setStore] = useState("Richmond, KY");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const inp = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.08)",
    color: "white",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    marginBottom: 12,
    fontFamily: "inherit",
  };
  async function go() {
    setErr("");
    setOk("");
    setLoading(true);
    try {
      if (mode === "signup") {
        if (!name) {
          setErr("Enter your name.");
          setLoading(false);
          return;
        }
        const { data, error: e } = await supabase.auth.signUp({
          email,
          password: pw,
        });
        if (e) throw e;
        if (data.user) {
          await supabase
            .from("profiles")
            .insert({
              id: data.user.id,
              full_name: name,
              store_location: store,
              role: "rep",
            });
          await supabase.from("streaks").insert({ user_id: data.user.id });
        }
        setOk("Account created! Check your email to confirm, then log in.");
      } else {
        const { error: e } = await supabase.auth.signInWithPassword({
          email,
          password: pw,
        });
        if (e) throw e;
      }
    } catch (e) {
      setErr(e.message || "Something went wrong.");
    }
    setLoading(false);
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 52 }}>🛏️</div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              color: GOLD,
              fontSize: 26,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            KY Mattress Guy Pro
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            Sales Training Platform — v10
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16,
            padding: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              marginBottom: 20,
              background: "rgba(0,0,0,0.3)",
              borderRadius: 8,
              padding: 4,
            }}
          >
            {["login", "signup"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "8px 0",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: 14,
                  background: mode === m ? GOLD : "transparent",
                  color: mode === m ? NAVY : "rgba(255,255,255,0.5)",
                }}
              >
                {m === "login" ? "Log In" : "Sign Up"}
              </button>
            ))}
          </div>
          {mode === "signup" && (
            <>
              <input
                style={inp}
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                style={inp}
                placeholder="Store location (e.g. Richmond, KY)"
                value={store}
                onChange={(e) => setStore(e.target.value)}
              />
            </>
          )}
          <input
            style={inp}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={inp}
            type="password"
            placeholder="Password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
          />
          {err && (
            <div style={{ color: "#ff6b6b", fontSize: 13, marginBottom: 10 }}>
              {err}
            </div>
          )}
          {ok && (
            <div style={{ color: "#51cf66", fontSize: 13, marginBottom: 10 }}>
              {ok}
            </div>
          )}
          <button
            onClick={go}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              background: GOLD,
              color: NAVY,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? "..." : mode === "login" ? "Log In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── HOME ─────────────────────────────────────────────────────────────
function Home({ profile, streak, onQuiz, onBoard, onManager, onSignOut }) {
  const xp = streak?.total_xp || 0;
  const rank = getRank(xp);
  const next = RANKS.find((r) => r.min > xp);
  const prog = next
    ? Math.round(((xp - rank.min) / (next.min - rank.min)) * 100)
    : 100;
  const totalQ = Object.values(Q).reduce((a, c) => a + c.length, 0);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: LIGHT,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          background: NAVY,
          padding: "20px 20px 24px",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              color: GOLD,
              fontFamily: "Georgia,serif",
              fontWeight: "bold",
              fontSize: 17,
            }}
          >
            🛏️ KY Mattress Guy Pro
          </div>
          <button
            onClick={onSignOut}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "rgba(255,255,255,0.6)",
              padding: "6px 12px",
              borderRadius: 8,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Sign Out
          </button>
        </div>
        <div style={{ color: "white", fontSize: 21, fontWeight: "bold" }}>
          Hey, {profile?.full_name?.split(" ")[0]}! 👋
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          {profile?.store_location}
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span style={{ color: GOLD, fontWeight: "bold" }}>
              {rank.icon} {rank.label}
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
              {xp} XP{next && ` → ${next.min}`}
            </span>
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 4,
              height: 6,
            }}
          >
            <div
              style={{
                background: GOLD,
                height: 6,
                borderRadius: 4,
                width: `${prog}%`,
                transition: "width 0.5s",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              🔥 {streak?.current_streak || 0} day streak
            </span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
              📚 {totalQ} questions total
            </span>
          </div>
        </div>
      </div>
      <div style={{ padding: "18px 16px 40px" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <button
            onClick={onBoard}
            style={{
              flex: 1,
              padding: 13,
              background: "white",
              border: `2px solid ${GOLD}`,
              borderRadius: 12,
              color: NAVY,
              fontWeight: "bold",
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            🏆 Leaderboard
          </button>
          {profile?.role === "manager" && (
            <button
              onClick={onManager}
              style={{
                flex: 1,
                padding: 13,
                background: NAVY,
                border: "none",
                borderRadius: 12,
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              📊 Dashboard
            </button>
          )}
        </div>
        <div
          style={{
            fontWeight: "bold",
            color: NAVY,
            fontSize: 15,
            marginBottom: 12,
          }}
        >
          Choose Your Training Category
        </div>
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
        >
          {CATS.map((cat) => {
            const count = (Q[cat.id] || []).length;
            return (
              <button
                key={cat.id}
                onClick={() => onQuiz(cat)}
                style={{
                  padding: "16px 10px",
                  background: "white",
                  border: "2px solid transparent",
                  borderRadius: 14,
                  cursor: "pointer",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cat.color;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{ fontSize: 26 }}>{cat.icon}</div>
                <div
                  style={{
                    color: NAVY,
                    fontWeight: "bold",
                    fontSize: 12,
                    marginTop: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {cat.label}
                </div>
                <div
                  style={{
                    color: "rgba(0,0,0,0.35)",
                    fontSize: 11,
                    marginTop: 3,
                  }}
                >
                  {count} questions
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── QUIZ ─────────────────────────────────────────────────────────────
function Quiz({ cat, userId, onDone }) {
  const pool = Q[cat.id] || [];
  const questions = shuffle(pool).slice(0, Math.min(10, pool.length));
  const [idx, setIdx] = useState(0);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [opts, setOpts] = useState([]);
  const q = questions[idx];
  useEffect(() => {
    if (q) setOpts(shuffle(q.o));
  }, [idx]);
  async function saveResult(fs) {
    setSaving(true);
    const total = questions.length,
      pct = Math.round((fs / total) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    await supabase
      .from("quiz_results")
      .insert({
        user_id: userId,
        category: cat.id,
        score: fs,
        total,
        percent: pct,
        xp_earned: xpE,
      });
    const { data: s } = await supabase
      .from("streaks")
      .select("*")
      .eq("user_id", userId)
      .single();
    const today = new Date().toISOString().split("T")[0];
    const ns =
      s?.last_played_date !== today
        ? (s?.current_streak || 0) + 1
        : s?.current_streak || 0;
    await supabase
      .from("streaks")
      .upsert({
        user_id: userId,
        current_streak: ns,
        longest_streak: Math.max(ns, s?.longest_streak || 0),
        last_played_date: today,
        total_xp: (s?.total_xp || 0) + xpE,
      });
    setSaving(false);
  }
  function answer(opt) {
    if (sel) return;
    setSel(opt);
    const correct = q.o[q.a];
    const ns = opt === correct ? score + 1 : score;
    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        setScore(ns);
        setDone(true);
        saveResult(ns);
      } else {
        setIdx(idx + 1);
        setSel(null);
        if (opt === correct) setScore(ns);
      }
    }, 1000);
  }
  if (done) {
    const pct = Math.round((score / questions.length) * 100);
    const xpE = pct >= 80 ? 50 : pct >= 60 ? 30 : 10;
    return (
      <div
        style={{
          minHeight: "100vh",
          background: NAVY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          fontFamily: "system-ui,sans-serif",
        }}
      >
        <div style={{ textAlign: "center", color: "white", maxWidth: 320 }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>
            {pct >= 80 ? "🏆" : pct >= 60 ? "⭐" : "📚"}
          </div>
          <div
            style={{
              fontFamily: "Georgia,serif",
              fontSize: 26,
              color: GOLD,
              marginBottom: 8,
            }}
          >
            {pct >= 80
              ? "Crushed it! 🔥"
              : pct >= 60
              ? "Solid work! 💪"
              : "Keep grinding! 📚"}
          </div>
          <div style={{ fontSize: 52, fontWeight: "bold", margin: "16px 0" }}>
            {pct}%
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>
            {score} of {questions.length} correct
          </div>
          <div style={{ color: GOLD, fontSize: 13, marginBottom: 6 }}>
            +{xpE} XP earned
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              marginBottom: 32,
            }}
          >
            {saving ? "Saving..." : "✓ Saved to your record"}
          </div>
          <button
            onClick={onDone}
            style={{
              padding: "14px 40px",
              background: GOLD,
              border: "none",
              borderRadius: 12,
              color: NAVY,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  if (!q) return null;
  const correct = q.o[q.a];
  return (
    <div
      style={{
        minHeight: "100vh",
        background: LIGHT,
        padding: 20,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <div style={{ fontWeight: "bold", color: NAVY }}>
          {cat.icon} {cat.label}
        </div>
        <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
          {idx + 1} / {questions.length}
        </div>
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.08)",
          borderRadius: 4,
          height: 6,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: cat.color,
            height: 6,
            borderRadius: 4,
            width: `${((idx + 1) / questions.length) * 100}%`,
            transition: "width 0.3s",
          }}
        />
      </div>
      <div
        style={{
          background: "white",
          borderRadius: 16,
          padding: 22,
          marginBottom: 18,
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 17,
            color: NAVY,
            lineHeight: 1.5,
          }}
        >
          {q.q}
        </div>
      </div>
      {opts.map((opt) => {
        let bg = "white",
          border = "2px solid rgba(0,0,0,0.08)",
          color = NAVY;
        if (sel) {
          if (opt === correct) {
            bg = "#d4edda";
            border = "2px solid #28a745";
          } else if (opt === sel) {
            bg = "#f8d7da";
            border = "2px solid #dc3545";
          }
        }
        return (
          <button
            key={opt}
            onClick={() => answer(opt)}
            style={{
              width: "100%",
              padding: "13px 16px",
              marginBottom: 9,
              background: bg,
              border,
              borderRadius: 12,
              cursor: "pointer",
              textAlign: "left",
              color,
              fontSize: 14,
              fontWeight: "500",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── LEADERBOARD ──────────────────────────────────────────────────────
function Board({ onBack }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase
      .from("leaderboard")
      .select("*")
      .limit(25)
      .then(({ data: d }) => {
        setData(d || []);
        setLoading(false);
      });
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: LIGHT,
        padding: 20,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 22,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: NAVY,
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 22,
            fontWeight: "bold",
            color: NAVY,
          }}
        >
          🏆 Leaderboard
        </div>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
      ) : data.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: 40, color: "rgba(0,0,0,0.4)" }}
        >
          No reps yet — be the first! 🚀
        </div>
      ) : (
        data.map((rep, i) => {
          const rank = getRank(rep.total_xp || 0);
          const medals = ["🥇", "🥈", "🥉"];
          return (
            <div
              key={rep.id}
              style={{
                background: "white",
                borderRadius: 14,
                padding: "14px 16px",
                marginBottom: 9,
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow:
                  i < 3
                    ? "0 2px 12px rgba(201,168,76,0.18)"
                    : "0 1px 6px rgba(0,0,0,0.05)",
                border: i === 0 ? `2px solid ${GOLD}` : "2px solid transparent",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: i < 3 ? GOLD : LIGHT,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                  color: i < 3 ? "white" : NAVY,
                  fontSize: i < 3 ? 18 : 14,
                  flexShrink: 0,
                }}
              >
                {medals[i] || i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "bold", color: NAVY }}>
                  {rep.full_name}
                </div>
                <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 12 }}>
                  {rank.icon} {rank.label} · {rep.store_location}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", color: GOLD, fontSize: 16 }}>
                  {rep.total_xp || 0} XP
                </div>
                <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 11 }}>
                  {rep.avg_score || 0}% avg · {rep.total_quizzes || 0} quizzes
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ── MANAGER DASHBOARD ─────────────────────────────────────────────────
function Manager({ onBack }) {
  const [reps, setReps] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  useEffect(() => {
    Promise.all([
      supabase.from("leaderboard").select("*"),
      supabase.from("category_averages").select("*"),
    ]).then(([{ data: r }, { data: c }]) => {
      setReps(r || []);
      setCats(c || []);
      setLoading(false);
    });
  }, []);
  const repCats = (id) => cats.filter((c) => c.user_id === id);
  return (
    <div
      style={{
        minHeight: "100vh",
        background: LIGHT,
        padding: 20,
        fontFamily: "system-ui,sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: NAVY,
          }}
        >
          ←
        </button>
        <div
          style={{
            fontFamily: "Georgia,serif",
            fontSize: 22,
            fontWeight: "bold",
            color: NAVY,
          }}
        >
          📊 Manager Dashboard
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 18,
        }}
      >
        {[
          { l: "Total Reps", v: reps.length },
          {
            l: "Avg Score",
            v:
              (reps.length
                ? Math.round(
                    reps.reduce((a, r) => a + (r.avg_score || 0), 0) /
                      reps.length
                  )
                : 0) + "%",
          },
          {
            l: "Total Quizzes",
            v: reps.reduce((a, r) => a + (r.total_quizzes || 0), 0),
          },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "14px 10px",
              textAlign: "center",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            <div style={{ fontWeight: "bold", color: NAVY, fontSize: 22 }}>
              {s.v}
            </div>
            <div
              style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, marginTop: 2 }}
            >
              {s.l}
            </div>
          </div>
        ))}
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 40 }}>Loading...</div>
      ) : reps.length === 0 ? (
        <div
          style={{ textAlign: "center", padding: 40, color: "rgba(0,0,0,0.4)" }}
        >
          No reps signed up yet.
        </div>
      ) : (
        reps.map((rep) => {
          const isOpen = open === rep.id;
          const rank = getRank(rep.total_xp || 0);
          const sc =
            rep.avg_score >= 80
              ? "#28a745"
              : rep.avg_score >= 60
              ? GOLD
              : "#dc3545";
          const rc = repCats(rep.id);
          return (
            <div
              key={rep.id}
              style={{
                background: "white",
                borderRadius: 14,
                marginBottom: 10,
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <div
                onClick={() => setOpen(isOpen ? null : rep.id)}
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: NAVY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: GOLD,
                    fontWeight: "bold",
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {rep.full_name?.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{ fontWeight: "bold", color: NAVY, fontSize: 15 }}
                  >
                    {rep.full_name}
                  </div>
                  <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 12 }}>
                    {rank.icon} {rank.label} · {rep.store_location}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: "bold", color: sc, fontSize: 17 }}>
                    {rep.avg_score || 0}%
                  </div>
                  <div style={{ color: "rgba(0,0,0,0.35)", fontSize: 11 }}>
                    {rep.total_xp || 0} XP · {rep.current_streak || 0}🔥
                  </div>
                </div>
                <div style={{ color: "rgba(0,0,0,0.3)", fontSize: 12 }}>
                  {isOpen ? "▲" : "▼"}
                </div>
              </div>
              {isOpen && (
                <div
                  style={{
                    borderTop: "1px solid rgba(0,0,0,0.06)",
                    padding: "14px 16px",
                    background: LIGHT,
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: "bold",
                      color: NAVY,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 10,
                    }}
                  >
                    Category Breakdown
                  </div>
                  {rc.length === 0 ? (
                    <div style={{ color: "rgba(0,0,0,0.4)", fontSize: 13 }}>
                      No quizzes completed yet.
                    </div>
                  ) : (
                    rc.map((c) => {
                      const cat = CATS.find((x) => x.id === c.category);
                      const col =
                        c.avg_percent >= 80
                          ? "#28a745"
                          : c.avg_percent >= 60
                          ? GOLD
                          : "#dc3545";
                      return (
                        <div key={c.category} style={{ marginBottom: 10 }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: 13,
                              marginBottom: 4,
                            }}
                          >
                            <span style={{ color: NAVY }}>
                              {cat?.icon} {cat?.label || c.category}
                            </span>
                            <span style={{ fontWeight: "bold", color: col }}>
                              {c.avg_percent}%{" "}
                              <span
                                style={{
                                  color: "rgba(0,0,0,0.3)",
                                  fontWeight: "normal",
                                }}
                              >
                                ({c.attempts} quiz
                                {c.attempts !== 1 ? "zes" : ""})
                              </span>
                            </span>
                          </div>
                          <div
                            style={{
                              background: "rgba(0,0,0,0.08)",
                              borderRadius: 4,
                              height: 5,
                            }}
                          >
                            <div
                              style={{
                                background: col,
                                height: 5,
                                borderRadius: 4,
                                width: `${c.avg_percent}%`,
                              }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div
                    style={{
                      marginTop: 10,
                      padding: "10px 12px",
                      background: "white",
                      borderRadius: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                    }}
                  >
                    <span style={{ color: "rgba(0,0,0,0.5)" }}>
                      Total quizzes:{" "}
                      <strong style={{ color: NAVY }}>
                        {rep.total_quizzes || 0}
                      </strong>
                    </span>
                    <span style={{ color: "rgba(0,0,0,0.5)" }}>
                      Best streak:{" "}
                      <strong style={{ color: NAVY }}>
                        {rep.longest_streak || 0}🔥
                      </strong>
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(undefined);
  const [profile, setProfile] = useState(null);
  const [streak, setStreak] = useState(null);
  const [screen, setScreen] = useState("home");
  const [activeCat, setActiveCat] = useState(null);
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (session?.user) load(session.user.id);
    else {
      setProfile(null);
      setStreak(null);
    }
  }, [session]);
  async function load(uid) {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).single(),
      supabase.from("streaks").select("*").eq("user_id", uid).single(),
    ]);
    setProfile(p);
    setStreak(s);
  }
  const spinner = (
    <div
      style={{
        minHeight: "100vh",
        background: NAVY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🛏️</div>
        <div
          style={{
            color: GOLD,
            fontFamily: "Georgia,serif",
            fontSize: 18,
            marginTop: 12,
          }}
        >
          Loading...
        </div>
      </div>
    </div>
  );
  if (session === undefined) return spinner;
  if (!session) return <Auth />;
  if (!profile) return spinner;
  if (screen === "quiz" && activeCat)
    return (
      <Quiz
        cat={activeCat}
        userId={session.user.id}
        onDone={() => {
          setScreen("home");
          load(session.user.id);
        }}
      />
    );
  if (screen === "board") return <Board onBack={() => setScreen("home")} />;
  if (screen === "manager") return <Manager onBack={() => setScreen("home")} />;
  return (
    <Home
      profile={profile}
      streak={streak}
      onQuiz={(cat) => {
        setActiveCat(cat);
        setScreen("quiz");
      }}
      onBoard={() => setScreen("board")}
      onManager={() => setScreen("manager")}
      onSignOut={() => supabase.auth.signOut()}
    />
  );
}
