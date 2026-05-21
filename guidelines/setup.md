# Project Setup

## App Styles

The app imports the Astra token layer through `src/main.tsx`:

```tsx
import './styles/globals.css'
```

`src/styles/globals.css` defines the design tokens, Tailwind v4 theme mapping, and light/dark mode values. `src/styles/figma-tokens.css` remains in the repo as the Figma token reference layer.

## Theme Provider

Wrap the app root with `ThemeProvider`. This is required for dark mode support and theme persistence.

```tsx
import { ThemeProvider } from './ThemeProvider'

function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}
```

`ThemeProvider` reads `localStorage('astra-theme')` on mount and falls back to `prefers-color-scheme`. It manages the `.dark` class on `<html>` automatically.

## Build Configuration

This repo is a private Vite app, not an npm package. The root `vite.config.ts` is the only build config and must retain the `figma:asset/*` aliases used by imported Figma image assets.

```tsx
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## Figma Code Connect

Code Connect is configured for the CLI parserless template-file workflow. Template files should live next to their code components and use the `.figma.ts` extension:

```text
src/AstraLibraryKit/components/button.figma.ts
src/AstraLibraryKit/components/badge.figma.ts
```

Template files should import `figma` from `figma` and emit snippets that use the local design-system barrel:

```ts
import figma from 'figma'

export default {
  imports: ['import { Button } from "@/index"'],
  id: 'button',
  example: figma.code`<Button>Label</Button>`,
}
```

Use these scripts while working:

```sh
npm run code-connect:parse
npm run code-connect:preview
npm run code-connect:publish
```

## Rules

- Keep Figma asset aliases and `src/figma-assets.d.ts` when working with imported Figma images.
- Keep `src/styles/figma-tokens.css` as the Figma token reference layer.
- Keep Code Connect templates parserless unless there is a specific reason to opt into framework parser files.
- `ThemeProvider` is required at the app root for dark mode to work.
- All styling uses design system tokens mapped via `@theme inline`; prefer token-backed Tailwind classes such as `bg-brand-tertiary` over arbitrary values.
