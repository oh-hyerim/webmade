# Working Rules For This Project

## Core policy
- Make the smallest possible change.
- Preserve the current UI, layout, styling, text, spacing, and component structure.
- Do not redesign, refactor, rename files, move files, or split/merge components unless absolutely necessary.
- Do not replace libraries, frameworks, or existing services unless explicitly asked.

## Priority
- First priority is to keep the current visual result unchanged.
- Second priority is to make the project deploy successfully on Vercel.
- Third priority is to fix runtime, API, environment, and integration issues with minimal diff.

## Allowed changes
- Fix build and deployment errors
- Fix import/export issues
- Fix env variable handling for Vercel
- Fix broken API calls or runtime integration issues
- Fix path/alias issues
- Fix image/asset path issues
- Add minimal config only if necessary for deployment
