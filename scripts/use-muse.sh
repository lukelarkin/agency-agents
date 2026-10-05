#!/usr/bin/env bash
#
# use-muse.sh -- Point Claude Code at Meta's Muse Spark via the Model API.
#
# Meta Model API exposes an Anthropic-compatible Messages endpoint at
# https://api.meta.ai/v1/messages, so Claude Code can run The Agency's agents
# on Muse Spark with only environment variables changed.
#
# Usage (source it, don't execute it, so the exports land in your shell):
#   source scripts/use-muse.sh          # then run: claude
#   MUSE_MODEL=muse-spark-1.3 source scripts/use-muse.sh
#
# The API key is read from MODEL_API_KEY, or from a .env file next to the repo
# root (see .env.example). The key is never written to disk by this script.
#
# Requirements:
#   - A Meta Model API key: https://dev.meta.ai/api-keys/
#   - Billing configured on the Model API dashboard; without it every request
#     returns HTTP 402 "Billing verification failed".

_muse_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -z "${MODEL_API_KEY:-}" ] && [ -f "$_muse_root/.env" ]; then
  # shellcheck disable=SC1091
  set -a; . "$_muse_root/.env"; set +a
fi

if [ -z "${MODEL_API_KEY:-}" ]; then
  echo "use-muse.sh: MODEL_API_KEY is not set. Export it or add it to $_muse_root/.env (see .env.example)." >&2
  return 1 2>/dev/null || exit 1
fi

MUSE_MODEL="${MUSE_MODEL:-muse-spark-1.3-contributor}"

export ANTHROPIC_BASE_URL="https://api.meta.ai"
export ANTHROPIC_AUTH_TOKEN="$MODEL_API_KEY"
export ANTHROPIC_MODEL="$MUSE_MODEL"
export ANTHROPIC_DEFAULT_OPUS_MODEL="$MUSE_MODEL"
export ANTHROPIC_DEFAULT_SONNET_MODEL="$MUSE_MODEL"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="$MUSE_MODEL"
export CLAUDE_CODE_SUBAGENT_MODEL="$MUSE_MODEL"
export ENABLE_TOOL_SEARCH="true"

echo "use-muse.sh: Claude Code now targets $MUSE_MODEL at $ANTHROPIC_BASE_URL (key from MODEL_API_KEY)."
unset _muse_root
