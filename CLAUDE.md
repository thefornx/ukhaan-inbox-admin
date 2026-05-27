# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start the Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config v9, no extra args needed)

There is no test runner configured.

## Stack and version pins

- **Next.js 16.2.6** with the App Router. This is newer than most training data — APIs and conventions may differ. Before writing Next-specific code, consult `node_modules/next/dist/docs/` (notably `01-app/` and `03-architecture/`) and honor any deprecation notices you see there.
- **React 19.2.4**.
- **TypeScript** with `strict: true`. Path alias `@/*` resolves to the repo root (so `@/app/foo` ≡ `./app/foo`).

## Styling pipeline (non-obvious)

Styling uses **Tailwind CSS v4** with **daisyUI v5**, wired the v4 way — there is no `tailwind.config.{js,ts}` and no `daisyui` entry in `package.json` config. Everything is declared in CSS:

- `postcss.config.mjs` registers `@tailwindcss/postcss` (Tailwind v4's PostCSS plugin).
- `app/globals.css` is the single source of truth: it `@import "tailwindcss"`, loads daisyUI via `@plugin "daisyui"`, defines the custom `light` theme via `@plugin "daisyui/theme"`, and declares Tailwind theme tokens inside `@theme inline { ... }` (binding `--font-sans`/`--font-mono` to the `next/font` CSS variables set on `<html>` in `app/layout.tsx`).

When adding theme tokens, daisyUI themes, or plugins, edit `app/globals.css` — do **not** create a `tailwind.config.*` file.

## ESLint

Flat config (`eslint.config.mjs`) composes `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`, and re-declares the default ignore list (`.next/`, `out/`, `build/`, `next-env.d.ts`) because overriding any of those defaults requires re-passing them through `globalIgnores`.
