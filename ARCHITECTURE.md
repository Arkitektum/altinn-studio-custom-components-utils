# Architecture

How `@arkitektum/altinn-studio-custom-components-utils` is structured and built, for developers who maintain or extend the package. For what it provides, see the [README](./README.md). For how to contribute, see [CONTRIBUTING](./CONTRIBUTING.md).

## Related repositories

Seven repositories work together. Two families of published packages, each with the applications that use them:

```text
A ──▶ B   A depends on the published package B
A ┄┄▶ B   A calls B over HTTP while running

  altinn-studio-custom-components-docs ───────────────────────────┐
         │                                                        │
         ▼                                                        ▼
  altinn-studio-custom-components ─────────────────▶ altinn-studio-custom-components-utils
     ▲          ┆
     │          ┆ Statistics page
     │          ▼
  Altinn apps   altinn-studio-custom-components-api ──┬──▶ ftpb-app-catalogue    ◀──┬── altinn-studio-api-tools
                                                      └──▶ ftpb-testmotor-client ◀──┘
```

| Repository                              | Published as                                        | Depends on                                                                 | Used by                                                                                                |
| --------------------------------------- | --------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `altinn-studio-custom-components-utils` | `@arkitektum/altinn-studio-custom-components-utils` |                                                                            | `altinn-studio-custom-components` (bundled into its `main.js`), `altinn-studio-custom-components-docs` |
| `altinn-studio-custom-components`       | `@arkitektum/altinn-studio-custom-components`       | `altinn-studio-custom-components-utils`, `@arkitektum/client-logger`       | Altinn apps (copied into `App/wwwroot`), `altinn-studio-custom-components-docs`                        |
| `altinn-studio-custom-components-docs`  | Not published, deployed to GitHub Pages             | `altinn-studio-custom-components`, `altinn-studio-custom-components-utils` |                                                                                                        |
| `altinn-studio-custom-components-api`   | Not published, runs locally                         | `ftpb-app-catalogue`, `ftpb-testmotor-client`                              | The Statistics page in `altinn-studio-custom-components`, over HTTP                                    |
| `altinn-studio-api-tools`               | Not published, runs locally                         | `ftpb-app-catalogue`, `ftpb-testmotor-client`                              |                                                                                                        |
| `ftpb-app-catalogue`                    | `@arkitektum/ftpb-app-catalogue`                    |                                                                            | `altinn-studio-custom-components-api`, `altinn-studio-api-tools`                                       |
| `ftpb-testmotor-client`                 | `@arkitektum/ftpb-testmotor-client`                 |                                                                            | `altinn-studio-custom-components-api`, `altinn-studio-api-tools`                                       |

While running, `altinn-studio-custom-components-api` reads the Altinn apps' files from Altinn Studio and the components package's versions and files from npm, and `altinn-studio-api-tools` posts test data into Altinn apps running in LocalTest. Both read example data from the FtPB testmotor through `ftpb-testmotor-client`.

Every dependency is installed from the registry, so a change that spans repositories is released in dependency order: `altinn-studio-custom-components-utils` before `altinn-studio-custom-components`, both before `altinn-studio-custom-components-docs`, and `ftpb-app-catalogue` or `ftpb-testmotor-client` before the two applications. Each consumer then takes the new version with `yarn up <package>`.

The docs gallery depends on it directly as well as through the components, because its examples build attribute sets of their own. Both render elements through `createCustomElement`, so the tag-name allow-list here decides which custom elements they can render.

## Public API

The package has a single entry point, `src/index.ts`, which re-exports every public value and type. The exports are listed in the README under [What's included](./README.md#whats-included).

## Source layout

```text
src/
├── index.ts                          # Public entry, re-exports everything below
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

The source is TypeScript, compiled by tsup. Relative imports name the `.ts` file they mean, so the sources import in plain Node with nothing built. Tests are colocated as `*.test.ts` next to each module and run through `yarn test`, as they use `jest.mock`.

## The tag-name allow-list

`createCustomElement(tagName, attributes)` calls `isValidTagName(tagName)` and throws `Invalid tag name` unless the name is in `customElementTagNames`. The list is frozen with `Object.freeze`, so it cannot be extended at runtime. Adding a new component anywhere in the ecosystem requires adding its tag name here, releasing a new version of this package, and bumping it in the consumers.

## Build and release

- `yarn build` runs tsup on `src/index.ts` and emits ESM (`dist/index.js`) and CJS (`dist/index.cjs`), with declarations (`index.d.ts`, `index.d.cts`), source maps and tree-shaking, unminified. `package.json#exports` maps `import` to ESM and `require` to CJS.
- `yarn test` runs Jest in jsdom, with coverage written to `coverage/`.
- Only `dist/` is published (`package.json#files`).

CI (`.github/workflows/`):

- `ci.yml`: install, `yarn lint`, `yarn format:check`, `yarn typecheck`, `yarn test`, `yarn build` on push and PR to `main`.
- `eslint.yml`: ESLint scan, uploads SARIF to the GitHub Security tab.
- `build-and-publish-to-npm.yml` and `build-and-publish-to-github.yml`: on GitHub release created, wait for approval in the `release` environment, check that the release tag is `v` plus the `package.json` version, then install, test, build and publish to npm (trusted publishing, `--provenance --access public`) and to GitHub Packages.

Tooling: Node.js 24, Yarn 4 via Corepack (pinned through `packageManager`), TypeScript, tsup, Babel (`@babel/preset-typescript`, so Jest can read the sources), Jest, ESLint (flat config), Prettier.

## Conventions

- Everything consumers use is re-exported from `src/index.ts`, including the types of exported values.
- JSDoc on classes and exported functions.
- Tests import `describe`, `it` and `expect` from `@jest/globals`.
- Formatting and linting via Prettier (`.prettierrc`) and ESLint (`eslint.config.mjs`).
