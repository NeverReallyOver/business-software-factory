# features/dashboard/

Reusable authenticated app shell: responsive sidebar navigation, mobile drawer,
and header with the signed-in user and sign-out.

## Contents

- `components/sidebar-nav.tsx` — vertical nav with active-route highlighting
  (used by both the desktop sidebar and the mobile drawer).
- `components/mobile-nav.tsx` — hamburger + slide-in drawer for small screens.

The shell layout lives at `src/app/(app)/layout.tsx` and renders every page in
the `(app)` route group. It enforces auth server-side via `requireUser`
(defense in depth beyond `middleware.ts`).

## Usage

Add a dashboard page by creating `src/app/(app)/<route>/page.tsx`. Register it in
navigation via `src/config/navigation.ts` (`navItems`); items can be restricted
by role. App name/branding is in `src/config/app.ts`.
