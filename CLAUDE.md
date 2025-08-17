# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

```bash
npm install         # Install dependencies
npm run dev        # Start Raycast extension development server
npm run build      # Build extension for production
npm run lint       # Run ESLint checks
npm run fix-lint   # Auto-fix linting issues
npm run publish    # Publish extension to Raycast store
```

## Project Architecture

This is a Raycast extension that searches and displays AI models from OpenRouter's API.

### Core Components

**API Layer (`src/api.ts`)**
- Fetches model data from `https://openrouter.ai/api/v1/models`
- No authentication required for public API endpoint
- Token formatting logic: intelligently displays as B (billion), M (million), or K (thousand) tokens
- Price formatting: converts to per-million token pricing

**UI Layer (`src/find-models.tsx`)**
- Single command entry point: `find-models`
- Real-time filtering on both model ID and model name fields
- Sorting: newest models first (by `created` timestamp)
- Three actions per model:
  1. Copy Model ID (default action on Enter)
  2. Copy Model Name
  3. View on OpenRouter (opens browser)

### Data Flow

1. On mount: `fetchOpenRouterModels()` fetches all models from OpenRouter API
2. User types in search bar → filters models by ID or name (case-insensitive)
3. Filtered results sorted by creation date (newest first)
4. User selects action → copies to clipboard or opens browser

### Raycast Extension Configuration

- **Command name**: `find-models` (must match filename in src/)
- **Icon**: `icon.png` in root directory
- **Version**: Follows semantic versioning in package.json
- **CHANGELOG.md**: Uses `{PR_MERGE_DATE}` placeholder for automatic date replacement

### Known Raycast Linting Warnings

- Title Case warning for "OpenRouter" can be ignored (it's a proper noun)
- Action titles "Copy Model Id" and "View on Openrouter" may trigger Title Case warnings