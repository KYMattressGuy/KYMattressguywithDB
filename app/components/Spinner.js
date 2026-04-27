"use client";

export default function Spinner() {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl mx-auto mb-3 animate-pulse-soft">
          🎓
        </div>
        <div className="text-white/60 text-sm font-medium">Loading...</div>
      </div>
    </div>
  );
}
