import { RANKS } from "./constants";

export function getRank(xp) {
  return [...RANKS].reverse().find((r) => xp >= r.min) || RANKS[0];
}

export function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
