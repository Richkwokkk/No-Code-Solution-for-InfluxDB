# Visual Flux Frontend

This is a Next.js project for the Visual Flux front end application.

## Prerequisites

1. Download and install docker on your machine via the official website https://www.docker.com/.

2. Clone this repo and `cd` into it.

```bash
git clone <repo_url>
cd ./visual-flux-frontend
```

## Run and Build

### With Docker (Safer & Easier)

#### Development Build

To run the development build with Docker and hot reload:

```bash
docker compose up visual-flux-frontend-dev --watch
```

Then open the app via `http://localhost:3000` in the browser.

#### Production Build

To run the production build with Docker:

```bash
docker compose up visual-flux-frontend-prod
```

This will run the production build on http://localhost:4000.

### 2. Without Docker

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
pnpm install # or ni
pnpm dev # nr dev
```

The application will be available at http://localhost:3000.

#### Production Build

```bash
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

### What to Test

- Unit Testing / Component Testing
  - Purpose: Test functions and components in isolation
  - Location: Test files are collocated with the tested files in the same directories
- End-to-End Testing:
  - Purpose: Simulate user flow from start to finish
  - Location: Test files are located at `/tests/e2e`
- Integration Testing
  - Purpose: Tests for certain subsets of component or API interacting with each other
  - **NOTE**: Because most integration testing tools are not compatible with NextJS server components, we will only do end-to-end testing

### How to Run Tests

Testing on your own computer requires a [local development / production build without Docker](/###2.-Without-Docker)

If you are using VSCode, please download the official extensions for [Vitest](https://marketplace.visualstudio.com/items?itemName=vitest.explorer) and [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright). They should cover most of the use cases for our testing.

Alternatively, here are all the testing commands you can run manually for more details:

```bash
test:unit
test:unit:watch
test:unit:coverage
pnpm test # or nr test - Run all unit tests with minimal logs
pnpm test:verbose # nr test:verbose - Run all unit tests with verbose logs
pnpm test:ui # nr test:ui - Run all unit tests with a web UI with coverage report
```

For end-to-end testing, first build and run the production version, and then run the tests in the `/tests` folder with Playwright.

```bash
# Install Playwright and its utilities (only need to run for the first time you run e2e tests)
pnpm exec playwright install # nlx playwright install

# Run the production build
docker compose up visual-flux-frontend-prod

# Run all end-to-end tests using playwright
pnpm test:e2e:dev # nr test:e2e:dev
```
