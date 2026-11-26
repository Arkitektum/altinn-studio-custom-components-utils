# Contributing

Set up as described under Development in the [README](./README.md): Node.js 24 and Yarn 4 via [Corepack](https://nodejs.org/api/corepack.html), which activates the Yarn version in `package.json#packageManager`. For how the package is structured and built, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Commands

| Command             | What it does                                            |
| ------------------- | ------------------------------------------------------- |
| `yarn test`         | Run the Jest unit tests (with coverage).                |
| `yarn build`        | Build the publishable ESM and CJS bundles into `dist/`. |
| `yarn lint`         | Lint with ESLint (flat config in `eslint.config.mjs`).  |
| `yarn format`       | Format with Prettier.                                   |
| `yarn format:check` | Check formatting with Prettier.                         |
| `yarn typecheck`    | Type-check with `tsc --noEmit`.                         |

## Adding or changing functionality

1. Add the code under the right folder: `src/classes/` for classes, `src/scripts/` for helper functions, `src/constants/` for shared constants.

2. Export it from `src/index.ts`, together with any type it introduces. Anything not re-exported there is internal.

3. Add tests as a colocated `*.test.ts` next to the module.

4. Mind backward compatibility. The custom components and the docs gallery depend on this package. Avoid breaking existing exports, and if a breaking change is unavoidable, call it out in the PR and bump the major version.

### Adding a custom-element tag name

When a new component is added anywhere in the ecosystem, add its tag name to `src/constants/customElementTagNames.ts`, then release a new version of this package and bump it in the consumers. `createCustomElement` throws for any tag name not in the list, so changes to it deserve extra review (see [SECURITY.md](./SECURITY.md)).

## Pull requests

1. Branch off `main`.
2. Keep changes focused, and update or add tests.
3. Make sure `yarn lint`, `yarn format:check`, `yarn typecheck`, `yarn test` and `yarn build` pass locally.
4. Open a PR against `main`. CI (`ci.yml` and the ESLint scan) must be green before merge.

## Versioning and releases

1. Bump the version in `package.json` as part of the change that warrants a release, following semantic versioning.
2. Create a GitHub Release tagged `v` plus that version (for example `v2.1.0`). The publish workflows stop if the tag does not match `package.json`.
3. A reviewer approves the `release` environment, and the workflows test, build and publish to npm (with provenance) and to GitHub Packages.
4. Bump the dependency in `altinn-studio-custom-components` and `altinn-studio-custom-components-docs`. The docs site pins both this package and the components, so a change that reaches the gallery usually needs both bumped.

Only maintainers can publish releases.
