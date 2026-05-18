#!/bin/bash

# Package the AI Autopilot Kit for distribution
# Creates a clean .zip file ready for delivery

set -e

KIT_NAME="ai-autopilot-kit"
VERSION="${1:-1.0}"
OUTPUT_DIR="dist"
ZIP_NAME="${KIT_NAME}-v${VERSION}.zip"

echo "Packaging AI Autopilot Kit v${VERSION}..."

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

mkdir -p "${SCRIPT_DIR}/${OUTPUT_DIR}"

cd "${SCRIPT_DIR}"

zip -r "${OUTPUT_DIR}/${ZIP_NAME}" \
  README.md \
  00-QUICK-START.md \
  systems/ \
  prompts/ \
  templates/ \
  dashboard/ \
  bonuses/ \
  -x "*.DS_Store" \
  -x "__MACOSX/*" \
  -x "dist/*" \
  -x "launch/*" \
  -x "sales-page/*" \
  -x "package.sh" \
  -x ".git/*"

FILE_SIZE=$(du -h "${OUTPUT_DIR}/${ZIP_NAME}" | cut -f1)

echo ""
echo "Package created: ${OUTPUT_DIR}/${ZIP_NAME} (${FILE_SIZE})"
echo ""
echo "Contents:"
unzip -l "${OUTPUT_DIR}/${ZIP_NAME}" | tail -1
echo ""
echo "Excluded from package (internal only):"
echo "  - launch/          (distribution plan)"
echo "  - sales-page/      (sales page)"
echo "  - package.sh       (this script)"
