# Security Policy

## Supported versions

Security fixes are released against the **latest published version** of `@arkitektum/altinn-studio-custom-components-utils` on npm.
Please make sure you can reproduce an issue on the latest release before reporting it, and upgrade to the latest version to receive fixes.

| Version | Supported |
| ------- | --------- |
| Latest release | ✅ |
| Older releases | ❌ (please upgrade) |

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

Instead, report them privately through GitHub's private vulnerability reporting:

1. Go to the repository's **Security** tab: <https://github.com/Arkitektum/altinn-studio-custom-components-utils/security>
2. Click **Report a vulnerability** to open a private advisory.

Please include as much of the following as you can:

- A description of the vulnerability and its potential impact.
- The affected version(s) and how the package is consumed.
- Step-by-step instructions to reproduce, including a minimal proof of concept if possible.
- Any suggested remediation.

### What to expect

- We will acknowledge your report and begin investigating.
- We will keep you informed of progress and let you know when a fix is released.
- Please give us a reasonable amount of time to release a fix before any public disclosure.
  We are happy to credit reporters who wish to be acknowledged.

## Scope and security model

This package is a shared library consumed by the custom components, the docs gallery, and the statistics API.
A few properties are relevant when assessing security:

- **Tag-name allow-list.**
  `createCustomElement` rejects any tag name not present in the `customElementTagNames` allow-list (`src/constants/customElementTagNames.js`).
  This is an intentional guard against arbitrary element injection across every consumer; changes to it — and to `isValidTagName` / `createCustomElement` — deserve extra scrutiny.
- **Untrusted input.**
  The helpers operate on form data and text resources supplied by the host application.
  Treat such input as untrusted and validate/escape appropriately when rendering.
- **No secrets.**
  This package contains no secrets and makes no network calls; it is pure client-side logic.
- **Published surface.**
  Only `dist/` is published to npm.
  Source and tests are not part of the published package.

## Dependencies

The runtime surface has no production dependencies; build/test tooling includes tsup, TypeScript, Babel, and Jest.
If you find a vulnerability in a dependency, please report it to that project as well, and open an advisory here if this package is affected.
