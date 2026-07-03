// Affinity values (e.g. "Moon", "Dawn") are content-defined, not hardcoded here —
// see the World Bible / Combat Bible for the canonical list as it's established.
export type ResonanceAffinity = string

export interface ResonanceProfile {
  affinities: ResonanceAffinity[]
  harmony: number
}
