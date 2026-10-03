#!/usr/bin/env bash
set -e

echo "Initializing Rotational Prime Ontology (RPO) repo structure..."

# Root docs
mkdir -p docs/architecture docs/domains docs/math docs/governance docs/api docs/diagrams

# Core markdown files
cat > docs/index.md << 'EOF'
# Rotational Prime Ontology (RPO)

See:
- docs/architecture/
- docs/domains/
- docs/math/
- docs/governance/
- docs/api/
- docs/diagrams/
EOF

cat > docs/README.md << 'EOF'
# Rotational Prime Ontology (RPO)

A unified, alignment-safe, multi-domain inference architecture.
EOF

cat > docs/glossary.md << 'EOF'
# RPO Glossary

(Generated glossary content goes here.)
EOF

# Architecture / domains / math / governance / api placeholders
cat > docs/architecture/overview.md << 'EOF'
# RPO Architecture Overview
EOF

cat > docs/domains/cps.md << 'EOF'
# CPS Domain
EOF

cat > docs/domains/financial.md << 'EOF'
# Financial Domain
EOF

cat > docs/domains/crime.md << 'EOF'
# Crime Domain
EOF

cat > docs/math/prime_rotation.md << 'EOF'
# Prime Rotation Mathematics
EOF

cat > docs/governance/governance_layer.md << 'EOF'
# Governance Layer
EOF

cat > docs/api/utils_api.md << 'EOF'
# Utils API
EOF

# Diagrams (SVG placeholders)
cat > docs/diagrams/rpo_architecture.svg << 'EOF'
<!-- RPO Architecture Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/prime_rotation_math.svg << 'EOF'
<!-- Prime Rotation Math Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/domain_embeddings.svg << 'EOF'
<!-- Domain Embeddings Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/tri_domain_engine.svg << 'EOF'
<!-- Tri-Domain Engine Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/integration_domain.svg << 'EOF'
<!-- Integration Domain Fusion Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/alignment_layer.svg << 'EOF'
<!-- Alignment Layer Enforcement Diagram SVG goes here (restyled version). -->
EOF

cat > docs/diagrams/governance_flow.svg << 'EOF'
<!-- Governance Decision Flow Diagram SVG goes here (restyled version). -->
EOF

# src skeleton
mkdir -p src/npc src/embeddings src/rotation src/projection src/fusion src/alignment src/governance src/utils tests/unit tests/integration

echo "RPO repo structure initialized."
