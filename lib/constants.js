export const STORES = [
  { id: "MW", label: "Mattress Warehouse", icon: "🏬", includes: ["MW", "SO"], competitor: "MF" },
  { id: "SO", label: "Sleep Outfitters", icon: "😴", includes: ["SO"], competitor: "MF" },
  { id: "MF", label: "Mattress Firm", icon: "🛏️", includes: ["MF"], competitor: "MW" },
];

export const CATS = [
  { id: "mattresses", label: "Mattresses", icon: "🛏️", color: "#6366f1" },
  { id: "adjustable", label: "Adjustable Bases", icon: "⚙️", color: "#8b5cf6" },
  { id: "soft_goods", label: "Soft Goods", icon: "🧣", color: "#06b6d4" },
  { id: "objections", label: "Objections", icon: "🥊", color: "#ef4444" },
  { id: "selling_psych", label: "Selling Psychology", icon: "🧠", color: "#a855f7" },
  { id: "financing", label: "Math & Financing", icon: "💰", color: "#f59e0b" },
  { id: "profiling", label: "Customer Profiling", icon: "🎯", color: "#14b8a6" },
  { id: "competitive", label: "Competitive Intel", icon: "⚔️", color: "#ec4899" },
];

export const RANKS = [
  { min: 0, label: "Rookie", icon: "🌱", maxDifficulty: 1 },
  { min: 100, label: "Floor Starter", icon: "👟", maxDifficulty: 2 },
  { min: 300, label: "Sleep Advisor", icon: "💬", maxDifficulty: 3 },
  { min: 600, label: "Mattress Pro", icon: "⭐", maxDifficulty: 3 },
  { min: 1000, label: "Certified Expert", icon: "🏅", maxDifficulty: 4 },
  { min: 2000, label: "Sleep Master", icon: "🏆", maxDifficulty: 5 },
  { min: 5000, label: "Grand Master", icon: "👑", maxDifficulty: 5 },
];
