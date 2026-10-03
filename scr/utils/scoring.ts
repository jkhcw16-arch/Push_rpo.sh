import {
  CPSEmbedding,
  BehavioralHealthEmbedding,
  CrimeEmbedding,
  PlacementSafetyEmbedding,
  GovernanceEmbedding,
  RPOEmbedding,
  Scalar
} from "./types";

/* ============================================================
   HELPER
   ============================================================ */

function avg(values: Scalar[]): Scalar {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

/* ============================================================
   CPS SCORING
   ============================================================ */

export function scoreCPSSafety(cps: CPSEmbedding): Scalar {
  return avg([
    1 - cps.ImmediateDanger,
    cps.Supervision,
    cps.BasicNeeds,
    cps.CaregiverFunctioning,
    cps.EnvironmentalSafety
  ]);
}

export function scoreCPSRisk(cps: CPSEmbedding): Scalar {
  return avg([
    cps.CaregiverMentalHealthRisk,
    cps.SubstanceUseRisk,
    cps.HousingRisk,
    cps.ParentingStressRisk,
    cps.ChildVulnerabilityRisk
  ]);
}

export function scoreCPSProtective(cps: CPSEmbedding): Scalar {
  return avg([
    cps.HelpSeeking,
    cps.AttachmentBonding,
    cps.ParentalInsight,
    cps.SobrietyHistory,
    cps.EmploymentHistory,
    cps.CaregivingCapacity
  ]);
}

/* ============================================================
   BEHAVIORAL HEALTH SCORING
   ============================================================ */

export function scoreClinicalSeverity(bh: BehavioralHealthEmbedding): Scalar {
  return avg([
    bh.PTSDSeverity,
    bh.DepressionSeverity,
    bh.AnxietySeverity,
    bh.PsychosisIndicators
  ]);
}

export function scoreRecoveryStability(bh: BehavioralHealthEmbedding): Scalar {
  return avg([
    1 - bh.AddictionSeverity,
    bh.RecoveryStability,
    1 - bh.RelapseEvents,
    bh.SupportEngagement
  ]);
}

export function scoreBehavioralRisk(bh: BehavioralHealthEmbedding): Scalar {
  return avg([
    bh.SelfHarmRisk,
    bh.OtherHarmRisk,
    bh.FunctionalImpairment,
    bh.CrisisState
  ]);
}

/* ============================================================
   CRIME SCORING
   ============================================================ */

export function scoreMensRea(crime: CrimeEmbedding): Scalar {
  return avg([
    crime.Intent,
    crime.Knowledge,
    crime.Recklessness,
    crime.Negligence
  ]);
}

export function scoreEvidence(crime: CrimeEmbedding): Scalar {
  return avg([
    crime.EvidenceStrength,
    crime.CorroborationLevel,
    1 - crime.ReliabilityConcerns
  ]);
}

export function scoreCrimeImpact(crime: CrimeEmbedding): Scalar {
  return avg([
    crime.VictimHarm,
    crime.PublicSafetyImpact,
    crime.SystemInducedHarm
  ]);
}

/* ============================================================
   PLACEMENT SAFETY SCORING
   ============================================================ */

export function scorePlacementSafety(ps: PlacementSafetyEmbedding): Scalar {
  return avg([
    ps.PhysicalSafety,
    ps.MedicationSecurity,
    ps.SupervisionQuality,
    ps.SafetyChecks,
    ps.IncidentReporting,
    ps.ResponseTimeliness
  ]);
}

/* ============================================================
   GOVERNANCE SCORING
   ============================================================ */

export function scoreGovernancePredicates(gov: GovernanceEmbedding): Scalar {
  return avg([
    gov.Adequacy,
    gov.MinimalIntrusion,
    gov.Safety,
    gov.PolicyCompliance,
    gov.Accountability
  ]);
}

export function scoreGovernanceDecisions(gov: GovernanceEmbedding): Scalar {
  return avg([
    gov.InterventionJustification,
    gov.RemovalJustification,
    gov.CriminalizationJustification
  ]);
}

/* ============================================================
   COMPOSITE RPO SCORING
   ============================================================ */

export interface RPOScore {
  cpsSafety: Scalar;
  cpsRisk: Scalar;
  cpsProtective: Scalar;
  clinicalSeverity: Scalar;
  recoveryStability: Scalar;
  behavioralRisk: Scalar;
  mensRea: Scalar;
  evidence: Scalar;
  crimeImpact: Scalar;
  placementSafety: Scalar;
  governancePredicates: Scalar;
  governanceDecisions: Scalar;
}

export function scoreRPO(rpo: RPOEmbedding): RPOScore {
  return {
    cpsSafety: scoreCPSSafety(rpo.cps),
    cpsRisk: scoreCPSRisk(rpo.cps),
    cpsProtective: scoreCPSProtective(rpo.cps),

    clinicalSeverity: scoreClinicalSeverity(rpo.behavioral_health),
    recoveryStability: scoreRecoveryStability(rpo.behavioral_health),
    behavioralRisk: scoreBehavioralRisk(rpo.behavioral_health),

    mensRea: scoreMensRea(rpo.crime),
    evidence: scoreEvidence(rpo.crime),
    crimeImpact: scoreCrimeImpact(rpo.crime),

    placementSafety: scorePlacementSafety(rpo.placement_safety),

    governancePredicates: scoreGovernancePredicates(rpo.governance),
    governanceDecisions: scoreGovernanceDecisions(rpo.governance)
  };
}
