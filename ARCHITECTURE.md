# Architecture

This document explains what `@arkitektum/altinn-studio-custom-components-utils` provides, how it is built, and how it fits into the wider custom-components ecosystem.
It is aimed at developers who maintain or extend the package.

For how to contribute, see [CONTRIBUTING](./CONTRIBUTING.md).

---

## 1. What this package is

A small **shared library** of functions, classes, and constants used across the custom-components packages.
It is the common foundation that the components and the docs gallery build on.

It is published to **npm** and **GitHub Packages** as `@arkitektum/altinn-studio-custom-components-utils`, in both **ESM and CommonJS** builds.

---

## 2. Who depends on it

```text
   @arkitektum/altinn-studio-custom-components-utils  (THIS PACKAGE)
        ▲                       ▲
        │                       │
   custom-components       docs gallery
```

The docs gallery depends on it directly as well as through the components, because its examples build attribute sets of their own.

The statistics API (`altinn-studio-custom-components-api`) used to depend on this package and no longer does: nothing there ever imported it. The two shared packages that API does use, `@arkitektum/ftpb-testmotor-client` and `@arkitektum/ftpb-app-catalogue`, are unrelated to this one.

Most importantly, it owns **`createCustomElement`** and the **allow-list of valid custom-element tag names** (`customElementTagNames`).
Because every consumer renders elements through `createCustomElement`, this package is the central guard against rendering arbitrary element names (see [SECURITY.md](./SECURITY.md)).

---

## 3. Public API

The package exposes a single entry point (`src/index.ts`), and publishes types alongside the values:

| Export | Kind | Purpose |
| ------ | ---- | ------- |
| `CustomElementHtmlAttributes` | class | Builds the attribute set for a custom element from component props. |
| `createCustomElement` | function | Creates a custom element — **throws for any tag name not in the allow-list**. |
| `addContainerElement`, `appendChildren`, `addStyle`, `calculateFlexWidth`, `setAttributes` | functions | DOM/element helpers. |
| `getDataForComponent`, `hasValue`, `getValueFromDataKey` | functions | Data-model helpers. |
| `getTextResources`, `getDefaultTextResources`, `getTextResourceFromResourceBinding`, `getTextResourcesFromResourceBindings` | functions | Text-resource (i18n) helpers. |
| `isValidHeaderSize`, `isValidTagName` | functions | Validators. |
| `customElementTagNames` | constant | The allow-list of valid custom-element tag names. |
| `validSizeValues` | constant | Allowed size values. |

---

## 4. Source layout

```text
src/
├── index.ts                          # Public entry — re-exports everything below
├── classes/
│   └── CustomElementHtmlAttributes.ts # Attribute builder for custom elements
├── scripts/
│   ├── dataHelpers.ts                # getDataForComponent, hasValue, getValueFromDataKey
│   ├── elementHelpers.ts             # createCustomElement, setAttributes, addContainerElement, ...
│   ├── textResourcesHelpers.ts       # text-resource lookups
│   └── validators.ts                 # isValidTagName, isValidHeaderSize
└── constants/
    ├── customElementTagNames.ts      # The tag-name allow-list (security-critical)
    └── validSizeValues.ts

dist/                                 # Build output (published): index.js (ESM), index.cjs (CJS),
                                      # and the declarations consumers type against
```

The source is TypeScript as of 2.0.0, compiled by tsup. Relative imports name the `.ts` file they mean, so the sources run under `node --test` with nothing built. Tests are colocated as `*.test.ts` next to each module.

---

## 5. The tag-name allow-list

`createCustomElement(tagName, attributes)` calls `isValidTagName(tagName)` and **throws `Invalid tag name`** unless the name is present in `customElementTagNames`.
This is intentional: consumers only render through this function, so the allow-list is the single place that decides which custom elements may exist at runtime.

**Adding a new component anywhere in the ecosystem requires adding its tag name here**, then releasing a new version of this package and bumping it in the consumer.

---

## 6. Build & release pipeline

- **Build** with **tsup** (`yarn build`): a single entry (`src/index.ts`) emitted as both ESM (`dist/index.js`) and CJS (`dist/index.cjs`), with declarations, source maps and tree-shaking. Deliberately **not** minified: a library that minifies itself only makes the stack traces and bundle analysis in the consuming application harder to read.
  `package.json#exports` maps `import` → ESM and `require` → CJS.
- **Tests** with **Jest** (jsdom environment), with coverage.
- Only `dist/` is published (`package.json#files`).

**CI** (`.github/workflows/`):

- `ci.yml` — install, `yarn test`, `yarn build` on push/PR to `main`.
- `eslint.yml` — ESLint scan, uploads SARIF to the GitHub Security tab.
- `build-and-publish-to-npm.yml` / `build-and-publish-to-github.yml` — on GitHub **release created**: install, test, build, then publish to **npm** (with `--provenance --access public`) and to **GitHub Packages**.

**Tooling:** Node.js 24, Yarn 4 via Corepack (pinned through `packageManager`), TypeScript, tsup, Babel (`@babel/preset-typescript`, so Jest can read the sources), Jest, ESLint (flat config), Prettier.

---

## 7. Conventions

- **Single public entry.** Everything consumers use is re-exported from `src/index.ts`; keep the surface deliberate. Types are part of that surface, so an exported value whose type is not also exported is an oversight.
- **JSDoc** on classes and exported functions.
- **Tests** colocated as `*.test.ts` and run with Jest. They import `describe`/`it`/`expect` from `@jest/globals`, which types them without `@types/jest`.
- **Formatting/linting** via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
