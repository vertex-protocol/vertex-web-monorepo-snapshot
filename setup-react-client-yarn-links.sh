#!/bin/bash

# These libraries require a singular source of truth for library code, so having multiple instances
# will break local development of web-related packages. This must be run BEFORE running the related script in the SDK repo
DIRECTORIES=(
  "node_modules/react"
  "node_modules/@tanstack/react-query"
  "node_modules/wagmi"
)

# Check UNLINK env var as a quick way to use a "flag"
if [ "$UNLINK" ]; then YARN_CMD="yarn unlink"; else YARN_CMD="yarn link"; fi

for DIR in "${DIRECTORIES[@]}"; do
  # Change to the directory
  cd "$DIR"
  # Run yarn link/unlink
  $YARN_CMD
  # Go back to the original directory
  cd -
done