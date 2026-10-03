export type Scalar = number; // normalized 0–1
export type PrimeIndex = number;

export interface Embedding {
  [key: string]: Scalar;
}

export interface InvariantCheck {
  domain_integrity: boolean;
  normalized_values: boolean;
}
