import { RPOInference } from "./inference";

export function visualizeRPO(inf: RPOInference): string {
  const lines: string[] = [];

  lines.push("RPO Decision Pathway");
  lines.push("====================");
  lines.push("");

  lines.push("Validity:");
  lines.push(`  - Embedding valid: ${inf.valid}`);
  lines.push("");

  // CPS
  lines.push("CPS Domain:");
  lines.push(`  - Safety score: ${inf.scores.cpsSafety.toFixed(3)}`);
  lines.push(`  - Risk score:   ${inf.scores.cpsRisk.toFixed(3)}`);
  lines.push(`  - Protective:   ${inf.scores.cpsProtective.toFixed(3)}`);
  lines.push(`  - Removal justified:      ${inf.cps.removalJustified}`);
  lines.push(`  - Reunification recommended: ${inf.cps.reunificationRecommended}`);
  lines.push(`  - Safety concern:         ${inf.cps.safetyConcern}`);
  lines.push(`  - Risk level:             ${inf.cps.riskLevel}`);
  lines.push("");

  // Behavioral Health
  lines.push("Behavioral Health Domain:");
  lines.push(`  - Clinical severity:  ${inf.scores.clinicalSeverity.toFixed(3)}`);
  lines.push(`  - Recovery stability: ${inf.scores.recoveryStability.toFixed(3)}`);
  lines.push(`  - Behavioral risk:    ${inf.scores.behavioralRisk.toFixed(3)}`);
  lines.push(`  - Crisis:             ${inf.behavioral_health.crisis}`);
  lines.push(`  - Needs intervention: ${inf.behavioral_health.needsIntervention}`);
  lines.push(`  - Recovery stable:    ${inf.behavioral_health.recoveryStable}`);
  lines.push("");

  // Crime
  lines.push("Crime Domain:");
  lines.push(`  - Mens rea score:     ${inf.scores.mensRea.toFixed(3)}`);
  lines.push(`  - Evidence score:     ${inf.scores.evidence.toFixed(3)}`);
  lines.push(`  - Impact score:       ${inf.scores.crimeImpact.toFixed(3)}`);
  lines.push(`  - Criminal intent:    ${inf.crime.criminalIntent}`);
  lines.push(`  - Evidence sufficient:${inf.crime.evidenceSufficient}`);
  lines.push(`  - Charge recommended: ${inf.crime.chargeRecommended}`);
  lines.push("");

  // Placement Safety
  lines.push("Placement Safety Domain:");
  lines.push(`  - Placement safety score:   ${inf.scores.placementSafety.toFixed(3)}`);
  lines.push(`  - Placement safe:           ${inf.placement_safety.placementSafe}`);
  lines.push(`  - Medication security failure: ${inf.placement_safety.medicationSecurityFailure}`);
  lines.push("");

  // Governance
  lines.push("Governance Domain:");
  lines.push(`  - Predicate score:   ${inf.scores.governancePredicates.toFixed(3)}`);
  lines.push(`  - Decisions score:   ${inf.scores.governanceDecisions.toFixed(3)}`);
  lines.push(`  - Intervention valid:${inf.governance.interventionValid}`);
  lines.push(`  - Removal valid:     ${inf.governance.removalValid}`);
  lines.push(`  - Criminalization valid: ${inf.governance.criminalizationValid}`);
  lines.push("");

  return lines.join("\n");
}
