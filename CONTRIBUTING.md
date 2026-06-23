# Contributing

Thanks for contributing to `@arkitektum/altinn-studio-custom-components-utils` — the shared library used by the custom components, the docs gallery, and the statistics API.

For an overview of the public API and how the package is built, read [ARCHITECTURE.md](./ARCHITECTURE.md) first.

---

## Prerequisites

- **Node.js 24**
- **Yarn 4**, managed via [Corepack](https://nodejs.org/api/corepack.html). Enable it once:

  ```bash
  corepack enable
  ```

  The correct Yarn version is then activated automatically from the `packageManager` field in `package.json`.

---

## Getting started

1. **Clone and install**

   ```bash
   git clone https://github.com/Arkitektum/altinn-studio-custom-components-utils.git
   cd altinn-studio-custom-components-utils
   yarn install
   ```

2. **Run the tests**

   ```bash
   yarn test
   ```

3. **Build**

   ```bash
   yarn build
   ```

   This emits the ESM (`dist/index.js`) and CJS (`dist/index.cjs`) bundles via tsup.

---

## Everyday commands

| Command | What it does |
| ------- | ------------ |
| `yarn test` | Run the Jest unit tests (with coverage). |
| `yarn build` | Build the publishable ESM + CJS bundles into `dist/`. |
| `npx eslint .` | Lint the source (ESLint flat config in `eslint.config.mjs`). |

Before opening a pull request, make sure `yarn test` and `yarn build` pass — CI runs the same checks.

---

## Adding or changing functionality

1. **Add the code** under the right folder:
   - `src/classes/` for classes,
   - `src/scripts/` for helper functions,
   - `src/constants/` for shared constants.

2. **Export it** from `src/index.js`.
   The single entry point is the package's public API — anything not re-exported there is internal.

3. **Add tests** as a colocated `*.test.js` next to the module, and cover the behavior with Jest (jsdom).

4. **Mind backward compatibility.**
   Many packages depend on this one.
   Avoid breaking existing exports; if a breaking change is unavoidable, call it out in the PR and bump the major version.

### Adding a custom-element tag name

The allow-list in `src/constants/customElementTagNames.js` is **security-critical**: `createCustomElement` throws for any tag name not in it.
When a new component is added anywhere in the ecosystem, add its tag name here, then release a new version of this package and bump it in the consumer.

---

## Coding conventions

- **ES modules** throughout; the public surface is `src/index.js`.
- **JSDoc** on classes and exported functions.
- **Formatting & linting** via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
- **Tests** colocated as `*.test.js` and run with Jest.

---

## Pull requests

1. Branch off `main`.
2. Keep changes focused; update or add tests.
3. Ensure `yarn test` and `yarn build` pass locally.
4. Open a PR against `main`. CI (`ci.yml` and the ESLint scan) must be green before merge.

---

## Versioning & releases

- Releases are **triggered by creating a GitHub Release**.
  The publish workflows then install, test, build, and publish to **npm** (with provenance) and to **GitHub Packages**.
- Bump the version in `package.json` as part of the change that warrants a release, following semantic versioning.
- After a release, bump the dependency in the consuming packages (`altinn-studio-custom-components`, the docs site, the API) to pick up the change.

> Only maintainers can publish releases.
