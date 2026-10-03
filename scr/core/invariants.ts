export const Invariants = {
  normalize(v: number): number {
    return Math.max(0, Math.min(1, v));
  },

  isNormalized(v: number): boolean {
    return v >= 0 && v <= 1;
  },

  checkEmbedding(embedding: any): InvariantCheck {
    const normalized = Object.values(embedding).every(v => v >= 0 && v <= 1);
    return {
      domain_integrity: true,
      normalized_values: normalized
    };
  }
};
