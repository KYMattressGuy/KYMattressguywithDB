"use client";

export default function Spinner() {
  return (
    <div className="min-h-screen gradient-radial flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-5xl mx-auto mb-4 animate-pulse-ring">
          🛏️
        </div>
        <div className="gradient-text text-lg font-bold">Loading...</div>
      </div>
    </div>
  );
}
