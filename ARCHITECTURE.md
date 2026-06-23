# Architecture

This document explains what `@arkitektum/altinn-studio-custom-components-utils` provides, how it is built, and how it fits into the wider custom-components ecosystem.
It is aimed at developers who maintain or extend the package.

For how to contribute, see [CONTRIBUTING](./CONTRIBUTING.md).

---

## 1. What this package is

A small **shared library** of functions, classes, and constants used across the custom-components packages.
It is the common foundation that the components, the docs gallery, and the statistics API all build on.

It is published to **npm** and **GitHub Packages** as `@arkitektum/altinn-studio-custom-components-utils`, in both **ESM and CommonJS** builds.

---

## 2. Who depends on it

```text
   @arkitektum/altinn-studio-custom-components-utils  (THIS PACKAGE)
        ▲                 ▲                 ▲
        │                 │                 │
   custom-components   docs gallery   custom-components-api
```

Most importantly, it owns **`createCustomElement`** and the **allow-list of valid custom-element tag names** (`customElementTagNames`).
Because every consumer renders elements through `createCustomElement`, this package is the central guard against rendering arbitrary element names (see [SECURITY.md](./SECURITY.md)).

---

## 3. Public API

The package exposes a single entry point (`src/index.js`):

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
├── index.js                          # Public entry — re-exports everything below
├── classes/
│   └── CustomElementHtmlAttributes.js # Attribute builder for custom elements
├── scripts/
│   ├── dataHelpers.js                # getDataForComponent, hasValue, getValueFromDataKey
│   ├── elementHelpers.js             # createCustomElement, setAttributes, addContainerElement, ...
│   ├── textResourcesHelpers.js       # text-resource lookups
│   └── validators.js                 # isValidTagName, isValidHeaderSize
└── constants/
    ├── customElementTagNames.js      # The tag-name allow-list (security-critical)
    └── validSizeValues.js

dist/                                 # Build output (published): index.js (ESM) + index.cjs (CJS)
```

Tests are colocated as `*.test.js` next to each module.

---

## 5. The tag-name allow-list

`createCustomElement(tagName, attributes)` calls `isValidTagName(tagName)` and **throws `Invalid tag name`** unless the name is present in `customElementTagNames`.
This is intentional: consumers only render through this function, so the allow-list is the single place that decides which custom elements may exist at runtime.

**Adding a new component anywhere in the ecosystem requires adding its tag name here**, then releasing a new version of this package and bumping it in the consumer.

---

## 6. Build & release pipeline

- **Build** with **tsup** (`yarn build`): a single entry (`src/index.js`) emitted as both ESM (`dist/index.js`) and CJS (`dist/index.cjs`), with source maps, tree-shaking, and minification.
  `package.json#exports` maps `import` → ESM and `require` → CJS.
- **Tests** with **Jest** (jsdom environment), with coverage.
- Only `dist/` is published (`package.json#files`).

**CI** (`.github/workflows/`):

- `ci.yml` — install, `yarn test`, `yarn build` on push/PR to `main`.
- `eslint.yml` — ESLint scan, uploads SARIF to the GitHub Security tab.
- `build-and-publish-to-npm.yml` / `build-and-publish-to-github.yml` — on GitHub **release created**: install, test, build, then publish to **npm** (with `--provenance --access public`) and to **GitHub Packages**.

**Tooling:** Node.js 24, Yarn 4 via Corepack (pinned through `packageManager`), tsup, TypeScript (for tsup), Babel, Jest, ESLint (flat config), Prettier.

---

## 7. Conventions

- **Single public entry.** Everything consumers use is re-exported from `src/index.js`; keep the surface deliberate.
- **JSDoc** on classes and exported functions.
- **Tests** colocated as `*.test.js` and run with Jest.
- **Formatting/linting** via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
