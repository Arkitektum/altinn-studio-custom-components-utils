# @arkitektum/altinn-studio-custom-components-utils

![CI](https://github.com/Arkitektum/altinn-studio-custom-components-utils/actions/workflows/ci.yml/badge.svg) ![npm version](https://img.shields.io/npm/v/@arkitektum/altinn-studio-custom-components-utils.svg)

Shared functions, classes, and constants used across the **Altinn Studio custom components** ecosystem.
This is the common foundation that the [components](https://github.com/Arkitektum/altinn-studio-custom-components), the [documentation gallery](https://github.com/Arkitektum/altinn-studio-custom-components-docs), and the [statistics API](https://github.com/Arkitektum/altinn-studio-custom-components-api) all build on.

It is published in both **ESM** and **CommonJS** builds, and it owns the **allow-list of valid custom-element tag names** that guards element rendering across the ecosystem.

---

## Installation

```bash
npm install @arkitektum/altinn-studio-custom-components-utils
```

```bash
yarn add @arkitektum/altinn-studio-custom-components-utils
```

---

## Usage

```js
import {
    CustomElementHtmlAttributes,
    createCustomElement,
    getDataForComponent,
    getTextResourcesFromResourceBindings,
    isValidTagName
} from "@arkitektum/altinn-studio-custom-components-utils";

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

---

## What's included

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

## 🧪 Development

```bash
git clone https://github.com/Arkitektum/altinn-studio-custom-components-utils.git
cd altinn-studio-custom-components-utils
corepack enable      # activates the pinned Yarn 4
yarn install
yarn test            # Jest (jsdom) with coverage
yarn build           # tsup → dist/index.js (ESM) + dist/index.cjs (CJS)
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full workflow and [ARCHITECTURE.md](./ARCHITECTURE.md) for how the package is structured.

---

## 🔗 Resources

- [Architecture overview](./ARCHITECTURE.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Custom components](https://github.com/Arkitektum/altinn-studio-custom-components)
- [Component documentation & gallery](https://arkitektum.github.io/altinn-studio-custom-components-docs/)
