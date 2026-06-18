# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **Salla Twilight bundle** — a package of theme components for the Salla e-commerce platform, authored in Arabic (RTL). It is **not** a generic Lit/web-component project despite what `README.md` says. `README.md` is unmodified starter-kit boilerplate; its LitElement examples do **not** reflect how components in this repo are actually written. Trust the actual source files over the README.

## Commands

```bash
pnpm install          # install deps (uses pnpm; pnpm-lock.yaml is gitignored)
pnpm run dev          # vite dev server with a demo page + HMR
pnpm run build        # build each component to dist/<component-name>.js
pnpm run preview      # preview the production build

pnpm tw-create-component <name>   # scaffold a new component (kebab-case) + add it to twilight-bundle.json
pnpm tw-delete-component <name>   # remove a component folder + its twilight-bundle.json entry
```

There is no test runner or linter configured.

## Architecture

A component is a **pair** of artifacts that must stay in sync:

1. **Definition** — an entry in `twilight-bundle.json` under `components[]`. This declares the merchant-facing config UI (fields, types, default values, Arabic labels). The entry's `name` (e.g. `special-categories`) must equal the component's folder name.
2. **Template** — `<components-dir>/<name>/index.ts`. Despite the `.ts` extension, this file is a **Twilight server-side template** (Twig/Nunjucks-style): `{{ expression }}` for output, `{% ... %}` for control flow, Tailwind utility classes for styling. It is rendered server-side by Salla, not compiled as TypeScript.

### Field → template binding (the key contract)

Each field `id` in `twilight-bundle.json` is exposed in the template as `component.<id>`. Example: field `enhanced_cat_1_main_title` → `{{ component.enhanced_cat_1_main_title }}`.

`collection`-type fields (e.g. `t_category`) are repeatable lists. Iterate them and access subfields by their short name (the part after the dot):

```
{% for category in component.t_category %}
  {{ category.title }}      {# from field id "t_category.title" #}
{% endfor %}
```

Other template globals available: `theme` (e.g. `theme.is_rtl` for RTL/LTR branching), and `loop` inside `{% for %}` (`loop.index`, `loop.index0`).

When adding or renaming a field, update **both** the `twilight-bundle.json` entry and every `{{ component.* }}` / `{{ category.* }}` reference in the template.

## Important: folder name mismatch

This repo's component folder is misspelled **`scr/`** (the real component lives at `scr/components/special-categories/index.ts`). The Salla tooling — both the Vite plugins (`sallaTransformPlugin`, `sallaBuildPlugin`, `sallaDemoPlugin` in `vite.config.ts`) and the `tw-create-component` / `tw-delete-component` CLIs — hard-code **`src/components`**. As-is, `pnpm run dev`/`build` will find no components and the CLIs won't see the existing one. Rename `scr/` → `src/` before relying on the standard workflow (and prefer `src/` for any new components).
