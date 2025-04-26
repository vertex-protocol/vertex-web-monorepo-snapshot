#!/bin/bash
PACKAGES=(
"viem"
"@vertex-protocol/utils"
"@vertex-protocol/contracts"
"@vertex-protocol/engine-client"
"@vertex-protocol/indexer-client"
"@vertex-protocol/trigger-client"
"@vertex-protocol/client"
)

# Check UNLINK env var as a quick way to use a "flag"
if [ "$UNLINK" ]; then YARN_CMD="yarn unlink"; else YARN_CMD="yarn link"; fi

for PACKAGE in "${PACKAGES[@]}"; do
  $YARN_CMD "$PACKAGE"
done

yarn install --force
