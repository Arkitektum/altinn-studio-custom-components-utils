# @arkitektum/altinn-studio-custom-components-utils

![CI](https://github.com/Arkitektum/altinn-studio-custom-components-utils/actions/workflows/ci.yml/badge.svg) ![npm version](https://img.shields.io/npm/v/@arkitektum/altinn-studio-custom-components-utils.svg)

Shared functions, classes and constants for the Altinn Studio custom components. It is used by the [components](https://github.com/Arkitektum/altinn-studio-custom-components) and the [documentation gallery](https://github.com/Arkitektum/altinn-studio-custom-components-docs), is published as both ESM and CommonJS, and owns the allow-list of valid custom-element tag names that guards element rendering.

## Installation

```bash
npm install @arkitektum/altinn-studio-custom-components-utils
```

```bash
yarn add @arkitektum/altinn-studio-custom-components-utils
```

## Usage

```js
import { CustomElementHtmlAttributes, createCustomElement } from "@arkitektum/altinn-studio-custom-components-utils";

// Build the attribute set for a component and render it.
// createCustomElement throws for any tag name not in the allow-list.
const htmlAttributes = new CustomElementHtmlAttributes(component);
const element = createCustomElement("custom-field", htmlAttributes);
```

Both module systems are supported via the package `exports`:

```js
import { createCustomElement } from "@arkitektum/altinn-studio-custom-components-utils"; // ESM
const { createCustomElement } = require("@arkitektum/altinn-studio-custom-components-utils"); // CJS
```

## What's included

| Export                                                                                                                                                                                     | Kind      | Purpose                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CustomElementHtmlAttributes`                                                                                                                                                              | class     | Builds the attribute set for a custom element from component props.                                                                                                                                                                                                                               |
| `createCustomElement`                                                                                                                                                                      | function  | Creates a custom element, and throws for any tag name not in the allow-list.                                                                                                                                                                                                                      |
| `addContainerElement`, `appendChildren`, `addStyle`, `calculateFlexWidth`, `setAttributes`                                                                                                 | functions | DOM and element helpers.                                                                                                                                                                                                                                                                          |
| `getDataForComponent`, `hasValue`, `getValueFromDataKey`                                                                                                                                   | functions | Data-model helpers.                                                                                                                                                                                                                                                                               |
| `getTextResources`, `getDefaultTextResources`, `getFallbackTextResources`, `getFallbackDefaultTextResources`, `getTextResourceFromResourceBinding`, `getTextResourcesFromResourceBindings` | functions | Text-resource helpers. A binding is looked up in the app's and then the package's texts in the reader's language (`textResources`, `defaultTextResources` on `globalThis`), then the same two in nb (`fallbackTextResources`, `fallbackDefaultTextResources`), and shows its id when none has it. |
| `isValidHeaderSize`, `isValidTagName`                                                                                                                                                      | functions | Validators.                                                                                                                                                                                                                                                                                       |
| `customElementTagNames`                                                                                                                                                                    | constant  | The frozen allow-list of valid custom-element tag names.                                                                                                                                                                                                                                          |
| `validSizeValues`                                                                                                                                                                          | constant  | The frozen list of allowed heading sizes (`h1` to `h6`).                                                                                                                                                                                                                                          |
| `CustomElementProps`, `ComponentWithDataModelBindings`, `DataModel`, `DataModelBinding`, `SelectedFileNames`, `AppendableChild`, `Grid`, `TextResource`, `TextResourceCollection`          | types     | The types the functions and classes above take and return.                                                                                                                                                                                                                                        |

## Development

```bash
git clone https://github.com/Arkitektum/altinn-studio-custom-components-utils.git
cd altinn-studio-custom-components-utils
corepack enable      # activates the pinned Yarn 4
yarn install
yarn test            # Jest (jsdom) with coverage
yarn build           # tsup: dist/index.js (ESM) and dist/index.cjs (CJS)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow and [ARCHITECTURE.md](./ARCHITECTURE.md) for how the package is structured.

## Resources

- [Architecture overview](./ARCHITECTURE.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Custom components](https://github.com/Arkitektum/altinn-studio-custom-components)
- [Component documentation and gallery](https://arkitektum.github.io/altinn-studio-custom-components-docs/)
- [Licence](./LICENSE) (MIT)
