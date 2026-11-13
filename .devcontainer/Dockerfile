FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Chromium für die Karma-Tests (npm run web:test, ChromeHeadless)
RUN apt-get update \
    && apt-get install -y --no-install-recommends chromium \
    && rm -rf /var/lib/apt/lists/*

# Claude Code CLI
RUN npm install -g @anthropic-ai/claude-code

ENV CHROME_BIN=/usr/bin/chromium \
    NG_CLI_ANALYTICS=false
