/**
 * Scalar values are normalized 0–1.
 */
export type Scalar = number;

/**
 * Base embedding interface for all domains.
 */
export interface Embedding {
  [key: string]: Scalar;
}

/* ============================================================
   CPS DOMAIN
   ============================================================ */

export interface CPSEmbedding extends Embedding {
  // Safety
  ImmediateDanger: Scalar;
  Supervision: Scalar;
  BasicNeeds: Scalar;
  CaregiverFunctioning: Scalar;
  EnvironmentalSafety: Scalar;

  // Risk
  CaregiverMentalHealthRisk: Scalar;
  SubstanceUseRisk: Scalar;
  HousingRisk: Scalar;
  ParentingStressRisk: Scalar;
  ChildVulnerabilityRisk: Scalar;

  // Protective Factors
  HelpSeeking: Scalar;
  AttachmentBonding: Scalar;
  ParentalInsight: Scalar;
  SobrietyHistory: Scalar;
  EmploymentHistory: Scalar;
  CaregivingCapacity: Scalar;

  // System Actions (state indicators)
  Investigation: Scalar;
  InHomeServices: Scalar;
  Removal: Scalar;
  Placement: Scalar;
  Reunification: Scalar;
  CaseClosure: Scalar;
}

/* ============================================================
   BEHAVIORAL HEALTH DOMAIN
   ============================================================ */

export interface BehavioralHealthEmbedding extends Embedding {
  // Clinical State
  PTSDSeverity: Scalar;
  DepressionSeverity: Scalar;
  AnxietySeverity: Scalar;
  PsychosisIndicators: Scalar;

  // Addiction & Recovery
  AddictionSeverity: Scalar;
  RecoveryStability: Scalar;
  RelapseEvents: Scalar;
  SupportEngagement: Scalar;

  // Behavioral Risk
  SelfHarmRisk: Scalar;
  OtherHarmRisk: Scalar;
  FunctionalImpairment: Scalar;
  CrisisState: Scalar;

  // System Interface
  CPSImpact: Scalar;
  CriminalLegalImpact: Scalar;
  MedicalSystemImpact: Scalar;
}

/* ============================================================
   CRIME DOMAIN
   ============================================================ */

export interface CrimeEmbedding extends Embedding {
  // Conduct
  ActusReus: Scalar;
  Omissions: Scalar;
  CommunicationPatterns: Scalar;

  // Mental State
  Intent: Scalar;
  Knowledge: Scalar;
  Recklessness: Scalar;
  Negligence: Scalar;

  // Evidence
  EvidenceStrength: Scalar;
  CorroborationLevel: Scalar;
  ReliabilityConcerns: Scalar;

  // Impact
  VictimHarm: Scalar;
  PublicSafetyImpact: Scalar;
  SystemInducedHarm: Scalar;
}

/* ============================================================
   PLACEMENT SAFETY DOMAIN
   ============================================================ */

export interface PlacementSafetyEmbedding extends Embedding {
  // Environment
  PhysicalSafety: Scalar;
  MedicationSecurity: Scalar;
  SupervisionQuality: Scalar;

  // Monitoring
  SafetyChecks: Scalar;
  IncidentReporting: Scalar;
  ResponseTimeliness: Scalar;
}

/* ============================================================
   GOVERNANCE DOMAIN
   ============================================================ */

export interface GovernanceEmbedding extends Embedding {
  // Predicates
  Adequacy: Scalar;
  MinimalIntrusion: Scalar;
  Safety: Scalar;
  PolicyCompliance: Scalar;
  Accountability: Scalar;

  // Decisions
  InterventionJustification: Scalar;
  RemovalJustification: Scalar;
  CriminalizationJustification: Scalar;
}

/* ============================================================
   FULL RPO EMBEDDING (COMPOSITE)
   ============================================================ */

export interface RPOEmbedding {
  cps: CPSEmbedding;
  behavioral_health: BehavioralHealthEmbedding;
  crime: CrimeEmbedding;
  placement_safety: PlacementSafetyEmbedding;
  governance: GovernanceEmbedding;
}
