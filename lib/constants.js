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
  { min: 0, label: "Rookie", icon: "🌱" },
  { min: 100, label: "Floor Starter", icon: "👟" },
  { min: 300, label: "Sleep Advisor", icon: "💬" },
  { min: 600, label: "Mattress Pro", icon: "⭐" },
  { min: 1000, label: "Certified Expert", icon: "🏅" },
  { min: 2000, label: "Sleep Master", icon: "🏆" },
  { min: 5000, label: "Grand Master", icon: "👑" },
];
