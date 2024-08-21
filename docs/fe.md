# Visual Flux Frontend

This is a Next.js project for the Visual Flux front end application.

## Prerequisites

1. Make sure you have Docker installed. Download and install docker on your machine via the official website https://www.docker.com/.

2. Clone this repo

```bash
git clone https://github.cs.adelaide.edu.au/INFLUXUI-ATYSYS/InfluxUI-PG02.git
```

## Run and Build

### With Docker (Safer & Easier)

#### Development Build

To run the development build with Docker and hot reload:

```bash
docker compose -f containerisation/docker-compose.yaml up visual-flux-frontend-dev --watch
```

Then open the app via `http://localhost:3000` in the browser.

#### Production Build

To run the production build with Docker:

```bash
docker compose -f containerisation/docker-compose.yaml up visual-flux-frontend-prod
```

This will run the production build on http://localhost:4000.

### Without Docker

#### Prerequisites: Install `pnpm`

For this project, we use `pnpm` instead of `npm` to manage packages. `pnpm` is a package manager more efficient than `npm`. It will significantly speed up your package management.

```bash
npm i -g pnpm
```

> Optionally, you can install another handy tool called `ni`, which will automatically detect the package manager you specify for a project and save you a lot of headache in case you use a wrong package manager. For more details on its usage, go to `https://github.com/antfu-collective/ni`.
>
> ```bash
> npm i -g @antfu/ni
> ```

#### Development Build

```bash
cd frontend # cd into the /frontend directory from the root directory
pnpm install # you can also use ni with @antfu/ni
pnpm dev # nr dev
```

The application will be available at http://localhost:3000.

#### Production Build

```bash
cd frontend
pnpm install # ni
pnpm build # nr build
pnpm start # nr start
```

The application will be available at http://localhost:4000.

## Styling

### CSS

[TailwindCSS](https://tailwindcss.com/) for the win. Still just CSS but more sensible.

We recommend to install [the official tailwind extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) on vscode.

### Component Library

[shadcn/ui](https://ui.shadcn.com/): Compatible with Tailwind and easily customizable.

Recommended extensions:

- [shadcn/ui](https://marketplace.visualstudio.com/items?itemName=SuhelMakkad.shadcn-ui): for quickly add components to your codebase.
- [shadcn Color Preview](https://marketplace.visualstudio.com/items?itemName=dexxiez.shadcn-color-preview): for previewing hsl color variables in `global.css`.

## Testing

### How to write tests?

- Unit Testing / Component Testing
  - Purpose: Test functions and components in isolation
  - Location: Test files are collocated with the tested files in the same directories
- End-to-End Testing:
  - Purpose: Simulate user flow from start to finish
  - Location: Test files are located at `/tests/e2e`
- Integration Testing
  - Purpose: Tests for certain subsets of component or API interacting with each other
  - _**NOTE**: Because most integration testing tools are not compatible with NextJS server components, we will only do end-to-end testing_

For unit tests and component tests combined, we encourage a test coverage of 80% for your feature implementations. Achieving this level of coverage helps ensure the quality and reliability of your code, and increases the likelihood of your changes being merged smoothly.

For details on how to write tests, please visit

- Vitest documentation
- React testing library documentation
- Playwright documentation

### How to Run Tests

Testing on your own computer requires a [local development / production build without Docker](#without-docker)

If you are using VSCode, please download the official extensions for [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) and [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright). They should cover most of the use cases for our testing.

Alternatively, here are all the testing commands you can run manually for more details:

```bash
test:unit # nr test - Run all unit tests and component tests once
test:unit:watch # nr test:ui - Run all unit tests with a web UI with code coverage
test:unit:coverage # nr test:unit:coverage - Run all unit tests once with code coverage
```

For end-to-end testing, first build and run the production version, and then run the tests in the `/tests` folder with Playwright.

```bash
# Install Playwright and its utilities (only need to run for the first time you run e2e tests)
pnpm exec playwright install # nlx playwright install

# From the root directory, run the production build
docker compose -f containerisation/docker-compose.yaml up visual-flux-frontend-prod

cd frontend

# Run all end-to-end tests using playwright
pnpm test:e2e # nr test:e2e
# Run all end-to-end tests using playwright with a web UI
pnpm test:e2e:watch # nr test:e2e:watch
```
