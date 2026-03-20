"use client";

export default function Spinner() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl">🛏️</div>
        <div className="text-gold font-serif text-lg mt-3">Loading...</div>
      </div>
    </div>
  );
}
