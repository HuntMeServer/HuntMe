import type { Snapshot } from "./types";

const KEY = "hm-history";
const MAX = 12;

export interface HistoryEntry {
  id: string;
  code: string;
  title: string;
  mode: string;
  endedAt: number;
  reason: string | null;
  hunters: number;
  runners: number;
  standing: number;
  apexName: string | null;
  apexTags: number;
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const list = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(list) ? list.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

export function pushHistory(snap: Snapshot) {
  try {
    const runners = snap.players.filter((p) => p.role === "runner");
    const standing = runners.filter((p) => !p.taggedAt).length;
    const apex = [...snap.players].sort((a, b) => b.tags - a.tags)[0];
    const entry: HistoryEntry = {
      id: `${snap.code}-${snap.startedAt ?? Date.now()}`,
      code: snap.code,
      title: snap.title,
      mode: snap.settings.mode ?? "standard",
      endedAt: Date.now(),
      reason: snap.endedReason,
      hunters: snap.players.filter((p) => p.role === "hunter").length,
      runners: runners.length,
      standing,
      apexName: apex && apex.tags > 0 ? apex.name : null,
      apexTags: apex?.tags ?? 0,
    };
    const prev = loadHistory().filter((h) => h.id !== entry.id);
    localStorage.setItem(KEY, JSON.stringify([entry, ...prev].slice(0, MAX)));
  } catch {
    /* ignore quota / private mode */
  }
}
