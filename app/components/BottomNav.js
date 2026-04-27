"use client";

const tabs = [
  { id: "home", label: "Home", icon: "🏠", activeIcon: "🏠" },
  { id: "board", label: "Ranks", icon: "🏆", activeIcon: "🏆" },
  { id: "manager", label: "Dashboard", icon: "📊", activeIcon: "📊", managerOnly: true },
  { id: "profile", label: "Profile", icon: "👤", activeIcon: "👤" },
];

export default function BottomNav({ screen, onNavigate, isManager }) {
  const visibleTabs = tabs.filter((t) => !t.managerOnly || isManager);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 safe-bottom z-50">
      <div className="flex items-center justify-around px-2 pt-2 pb-1" style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}>
        {visibleTabs.map((tab) => {
          const active = screen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-4 rounded-xl border-none cursor-pointer transition-all ${
                active
                  ? "text-primary"
                  : "text-muted hover:text-surface-dark"
              } bg-transparent`}
            >
              <span className={`text-xl transition-transform ${active ? "scale-110" : ""}`}>
                {active ? tab.activeIcon : tab.icon}
              </span>
              <span className={`text-[10px] font-semibold ${active ? "text-primary" : ""}`}>
                {tab.label}
              </span>
              {active && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
