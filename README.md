# Push_rpo.sh
SemanticAlignment Category Specification (Prime 167)
1. Category Identity
Category Name: SemanticAlignment
Prime: 167
Domain: Cross‑domain (applies to all RPO decision contexts)
Source Modules:
NPC Module (Negation–Polarity–Contradiction)
Neural Embedding Alignment Module
SemanticAlignment is the category responsible for capturing linguistic stance, semantic consistency, and contextual alignment between a statement and an action. It is the only category that integrates both symbolic (NPC) and sub‑symbolic (embeddings) evidence.
2. Category Purpose
SemanticAlignment measures whether an action:
aligns with expressed values
contradicts stated positions
is semantically consistent with the narrative
is normatively coherent with declarations, testimony, or policy text
It is not a domain category (like CPS, Financial, Crime). Instead, it is a normative modifier that adjusts adequacy and intrusiveness across all domains.
3. Evidence Sources
SemanticAlignment receives EvidenceItems from two independent channels:
3.1 NPC Evidence
NPCResult → EvidenceItem
Contains:
negation_score
polarity_score
orientation
contradiction_score
similarity
raw_value
stance model output
flags (is_negated, is_contradiction)
3.2 Embedding Evidence
Embedding similarity → EvidenceItem
Contains:
similarity
raw_value
orientation
confidence
Both channels share the same category and prime.
4. Raw Value Definition
Raw value for SemanticAlignment is always derived from cosine similarity:
v
raw
=
sim
+
1
2
Where:
sim = cosine similarity in 
[
−
1
,
1
]
raw_value ∈ 
[
0
,
1
]
NPC and embeddings both use this mapping.
5. Orientation Definition
Orientation is a directional indicator:
o
S
∈
{
−
1
,
0
,
+
1
}
Derived from polarity:
+1 → supportive
0 → neutral
−1 → oppositional
Orientation is stored in metadata and used during projection.
6. Normalization (R1)
SemanticAlignment uses identity normalization:
v
norm
=
v
raw
No domain scaling is applied.
7. Role Alignment (R2)
Role alignment averages actor and subject values:
v
aligned
=
v
actor
+
v
subject
2
If only one role is present, alignment is identity.
8. Bounded Response (R3)
SemanticAlignment uses the standard RPO bounded response:
v
resp
=
min
⁡
(
2
,
max
⁡
(
0
,
v
aligned
)
)
9. Projection
SemanticAlignment uses prime 167:
Φ
SA
=
167
(
v
resp
⋅
ρ
⋅
o
S
)
Where:
v
resp
 = bounded value
ρ
 = role coefficient
o
S
 = orientation
Orientation directly affects projection direction:
Support → increases adequacy
Opposition → decreases adequacy
Neutral → no directional effect
10. Intensity Mapping
SemanticAlignment intensity uses the standard RPO intensity function:
I
SA
=
Φ
SA
Φ
SA
+
k
Recommended 
k
=
50
.
Intensity values typically fall in:
0.05–0.40 for semantic support
0.05–0.40 for semantic opposition
≈0.10 for neutral statements
SemanticAlignment intensity is intentionally weaker than domain intensities. It modifies adequacy but does not dominate domain evidence.
11. Normative Role
SemanticAlignment influences:
11.1 Adequacy
If contradiction is high:
adequacy
intrusive
↓
If polarity is supportive:
adequacy
intrusive
↑
11.2 Intrusiveness Ordering
SemanticAlignment can prevent intrusive actions when:
statements oppose the action
contradiction_score is high
polarity_score is negative
11.3 Consistency
SemanticAlignment ensures decisions are:
value‑aligned
linguistically coherent
semantically consistent
This is essential for administrative law, compliance, and charging decisions.
12. Trace Requirements
Every SemanticAlignment EvidenceItem must include:
similarity
negation_score
polarity_score
contradiction_score
orientation
raw_value
confidence
stance model output
flags
source_type
This ensures full auditability.
13. Category Summary
SemanticAlignment is the RPO category that:
integrates NPC + embeddings
captures semantic stance
detects contradiction
modulates adequacy
ensures normative consistency
uses prime 167
produces bounded intensity values
influences decision intrusiveness
It is the normative backbone of the statement–action alignment system.
