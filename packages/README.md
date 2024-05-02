# Vertex Web - Packages

Collection of packages that the monorepo apps rely on.

## Packages

### `eslint-config-custom`

Centralized configuration for ESLint. The naming postfix of `-custom` allow us to do the following:

`extends: ['custom']` in `eslintrc.js` of consumer apps (no idea how this works!)

### `ts-config`

Different `tsconfig.json` files for different use cases.

### `common`

A collection of common utils.

### `data`

Shared context & hooks for interacting with the Vertex SDK. This package assumes that contexts are children of
a `QueryClientProvider` from `react-query`.

### `ui`

Shared package for default Tailwind config and common components.

## Development Notes

**Omitting Dependencies**

Yarn workspaces will [hoist](https://classic.yarnpkg.com/blog/2018/02/15/nohoist/) packages,
meaning that direct dependencies of a package (ex. `ethers` in `data`) don't actually need to be declared as part of the
`package.json` of the package.

To reduce duplication, we don't declare these shared dependencies. This means that individual apps are responsible
for installing the dependencies required by subpackages.

As a guide:

- If consumer apps require direct usage of these dependencies, don't place dependencies in the package, and instead
  enforce them in individual apps
- If consumers don't require direct usage of these dependencies - i.e. they are only used internally by the package -
  then place these dependencies in the package

**Imports**

Imports within packages should be _relative_. If we declare `"baseUrl": "."` in `tsconfig.json` and use absolute
imports,
consumer apps will actually fail to resolve these imports because the apps themselves use `"baseUrl": "."`.

[This](https://github.com/vercel/turbo/discussions/620) is a potential solution, but relative imports generally work out
a bit better.
