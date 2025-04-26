# Vertex Web Monorepo

## Getting Started

**Public Repo Setup**

Public snapshots of the Vertex frontend have the following additional steps:

- Populate necessary API keys & IDs in `sensitiveData.ts` for the `trade` app
- Obtain a license to TradingView's [Advanced Charts](https://www.tradingview.com/charting-library-docs/) and put the
  build files in `public/charting_library`. The type declarations have been left as-is for typecheck to work.
- _Optional:_ Populate the `gtmId` for marketing sites.

**Dependencies**

- Install dependencies using `yarn install`.
- For usage of a _local_ Vertex SDK (useful if you're testing SDK changes / unpublished SDK functionality):

    - Setup a state where the frontend code points to a local SDK build:
        - run `yarn link-local` in `vertex-typescript-sdk`,
        - then `yarn link-local-sdk` in the root of this repo.
          > To reverse this (i.e. unlink packages for remote SDK), run `yarn unlink-local-sdk` in the root of this repo.
    - Run `yarn build` in the SDK repo when any code changes are made to the SDK. You will also need to build the
      SDK
      when setting up the integration for the first time

**Setup environment:**

For apps where a `.env` file is required, there is a `.env.local.example` file in the root of the app directory.
Copy this file to `.env.local` and fill in the necessary environment variables.

**Run**

```shell
yarn run dev # Runs app at the appropriate port
```

## Other Considerations

**[Trade App] Switching Brand**

To switch the "brand" of the trade app, use the available options for `NEXT_PUBLIC_BRAND_NAME`. Unfortunately,
Next.js + Tailwind JIT
do not trigger full reloads of the Tailwind configuration on changes of `.env.local`, so you will need to make a dummy
code change in `tailwind.config.ts` for the new brand to take effect. This could be as simple as changing a newline
then saving the file.

**[Trade App] Run against local nodes / custom contract addresses**

- You must have the app running against a local SDK build, see `Getting Started`
- Ensure the local SDK has the correct contract addresses and endpoints, see `createClientContext`
- Switch your `.env.local` to point to a local deployment: `NEXT_PUBLIC_DATA_ENV=local`
- Update token addresses in `tokens.ts` for the local environment. All addresses **must** be lowercase

**[Trade App] Bundle Analyzer **

- To run the bundle analyzer, run `yarn analyze` in the trade app directory. This will generate reports you can view
  at `.next/analyze/client.html` and `.next/analyze/server.html`.
