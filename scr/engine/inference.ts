import {
  RPOEmbedding,
  Scalar
} from "../utils/types";

import {
  scoreRPO,
  RPOScore
} from "../utils/scoring";

import {
  validateRPO
} from "../utils/validation";

/* ============================================================
   DECISION OUTPUT TYPES
   ============================================================ */

export interface CPSDecision {
  removalJustified: boolean;
  reunificationRecommended: boolean;
  safetyConcern: boolean;
  riskLevel: "low" | "moderate" | "high";
}

export interface BehavioralHealthDecision {
  crisis: boolean;
  needsIntervention: boolean;
  recoveryStable: boolean;
}

export interface CrimeDecision {
  criminalIntent: boolean;
  evidenceSufficient: boolean;
  chargeRecommended: boolean;
}

export interface PlacementSafetyDecision {
  placementSafe: boolean;
  medicationSecurityFailure: boolean;
}

export interface GovernanceDecision {
  interventionValid: boolean;
  removalValid: boolean;
  criminalizationValid: boolean;
}

export interface RPOInference {
  cps: CPSDecision;
  behavioral_health: BehavioralHealthDecision;
  crime: CrimeDecision;
  placement_safety: PlacementSafetyDecision;
  governance: GovernanceDecision;
  scores: RPOScore;
  valid: boolean;
}

/* ============================================================
   THRESHOLDS
   ============================================================ */

const THRESHOLDS = {
  cps: {
    removal: 0.30,       // low safety score → removal considered
    reunification: 0.60, // high safety score → reunification
    riskHigh: 0.70,
    riskModerate: 0.40
  },
  behavioral: {
    crisis: 0.70,
    intervention: 0.50,
    recoveryStable: 0.60
  },
  crime: {
    intent: 0.50,
    evidence: 0.60,
    charge: 0.55
  },
  placement: {
    safe: 0.70,
    medicationSecurity: 0.40
  },
  governance: {
    intervention: 0.50,
    removal: 0.50,
    criminalization: 0.50
  }
};

/* ============================================================
   INFERENCE ENGINE
   ============================================================ */

export function inferRPO(rpo: RPOEmbedding): RPOInference {
  const validation = validateRPO(rpo);
  const scores = scoreRPO(rpo);

  /* ---------------- CPS ---------------- */

  const cpsSafety = scores.cpsSafety;
  const cpsRisk = scores.cpsRisk;

  const cpsDecision: CPSDecision = {
    removalJustified: cpsSafety < THRESHOLDS.cps.removal,
    reunificationRecommended: cpsSafety > THRESHOLDS.cps.reunification,
    safetyConcern: cpsSafety < 0.50,
    riskLevel:
      cpsRisk > THRESHOLDS.cps.riskHigh
        ? "high"
        : cpsRisk > THRESHOLDS.cps.riskModerate
        ? "moderate"
        : "low"
  };

  /* ---------------- Behavioral Health ---------------- */

  const bhDecision: BehavioralHealthDecision = {
    crisis: scores.behavioralRisk > THRESHOLDS.behavioral.crisis,
    needsIntervention: scores.clinicalSeverity > THRESHOLDS.behavioral.intervention,
    recoveryStable: scores.recoveryStability > THRESHOLDS.behavioral.recoveryStable
  };

  /* ---------------- Crime ---------------- */

  const crimeDecision: CrimeDecision = {
    criminalIntent: scores.mensRea > THRESHOLDS.crime.intent,
    evidenceSufficient: scores.evidence > THRESHOLDS.crime.evidence,
    chargeRecommended:
      scores.mensRea > THRESHOLDS.crime.intent &&
      scores.evidence > THRESHOLDS.crime.evidence &&
      scores.crimeImpact > THRESHOLDS.crime.charge
  };

  /* ---------------- Placement Safety ---------------- */

  const psDecision: PlacementSafetyDecision = {
    placementSafe: scores.placementSafety > THRESHOLDS.placement.safe,
    medicationSecurityFailure:
      rpo.placement_safety.MedicationSecurity < THRESHOLDS.placement.medicationSecurity
  };

  /* ---------------- Governance ---------------- */

  const govDecision: GovernanceDecision = {
    interventionValid: scores.governancePredicates > THRESHOLDS.governance.intervention,
    removalValid: scores.governanceDecisions > THRESHOLDS.governance.removal,
    criminalizationValid: scores.governanceDecisions > THRESHOLDS.governance.criminalization
  };

  /* ---------------- Composite ---------------- */

  return {
    cps: cpsDecision,
    behavioral_health: bhDecision,
    crime: crimeDecision,
    placement_safety: psDecision,
    governance: govDecision,
    scores,
    valid: validation.valid
  };
}
