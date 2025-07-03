# Karigiri‑Kit — Cross‑Platform Design‑System Blueprint (Versioned Roadmap)

> **Mission:** Deliver a cohesive design‑system that starts with React + React Native (v1.0), expands to native iOS token parity (v1.1), and—when resourcing allows—adds a SwiftUI component library (v2.0).

---

## 🚀  Version Milestones

| Version  | Codename   | Target Consumers                                    | Core Packages                                                                                 | Highlights                                                                                                            |
| -------- | ---------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **v1.0** | **Akira**  | Next.js / React web apps & Expo / React Native apps | `tokens`, `react`, `react-native`, `react-theme`, `tailwind-config`, example & Storybook apps | Dark‑mode‑first components (≥ 30) on web + parity subset on RN. Tokens output: CSS, SCSS, JS/TS, **react-native.ts**. |
| **v1.1** | **Banyan** | Native iOS apps written in Swift/SwiftUI            | `swift-tokens` (Swift Package Manager)                                                        | Adds **auto‑generated Swift tokens** (`KarigiriTokens.swift`) so iOS teams gain visual parity without new UI code.    |
| **v2.0** | **Chakra** | Pure‑SwiftUI product teams                          | `swift-ui` (SwiftUI component library)                                                        | Full native component set mirroring the React library; Xcode Previews as docs; shared tokens + a11y.                  |

---

## v1.0  (Akira) — Initial Scope

### Packages & Paths

| # | Deliverable               | Path                                          | Tech Spec                                                                                                          |
| - | ------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| 1 | **Design Tokens System**  | `packages/tokens`                             | Single `tokens.json` → Style Dictionary builds for `css`, `scss`, `js`, `react-native.ts`. Dark‑mode‑first values. |
| 2 | **Tailwind Config**       | `packages/tailwind-config`                    | Consumes tokens; exposes preset for web Storybook & apps.                                                          |
| 3 | **Web Component Library** | `packages/react`                              | React 18 + TS. shadcn/ui primitives, Tailwind 4. Build with tsup.                                                  |
| 4 | **React Native Library**  | `packages/react-native`                       | Expo‑ready. Styled via **Tamagui** (preferred) or **NativeWind**. Token bridge auto‑injected.                      |
| 5 | **Theming Provider**      | `packages/react-theme`                        | `KarigiriProvider` – dark / light / custom JSON overrides. Both web & RN exports.                                  |
| 6 | **Storybooks**            | `apps/storybook-web`, `apps/storybook-native` | Storybook 8 (vite) & Storybook RN 7. MDX docs, a11y addon.                                                         |
| 7 | **Example Apps**          | `apps/next-example`, `apps/expo-example`      | Playground to validate every component.                                                                            |
| 8 | **Docs Site**             | `apps/docs-site`                              | Next.js 15, MDX, live playground, Algolia DocSearch.                                                               |

### Token Definition Example

```jsonc
{
  "color": {
    "bg": {"DEFAULT": "#181A1B", "surface": "#2B2D30", "subtle": "#E8E9EB"},
    "accent": {"teal": "#2DD4BF", "eco": "#7CB518"}
  },
  "radius": {"sm": 4, "md": 8, "lg": 16, "full": 9999},
  "spacing": {"1": 4, "2": 8, "3": 12, "4": 16, "6": 24, "8": 32, "12": 48},
  "shadow": {"sm": "0 1px 2px rgba(0,0,0,.06)", "md": "0 4px 6px rgba(0,0,0,.1)", "lg": "0 10px 15px rgba(0,0,0,.14)"},
  "font": {"body": "Inter", "display": "Space Grotesk"}
}
```

Build scripts in `packages/tokens`:

```bash
pnpm sd build web   # css, scss
pnpm sd build rn    # react-native.ts
```

> **Note:** A Swift transform is added but NOT published until v1.1.

### v1.0 CI Pipeline (GitHub Actions)

1. **Install** (pnpm), **lint**, **type‑check**.
2. **Unit + a11y tests** (jest-axe, RTL, react-native-testing-library).
3. **Chromatic visual review** for web; **Detox smoke tests** for Expo.
4. **Build & publish** changed packages via Changesets.

---

## v1.1  (Banyan) — Swift Tokens Parity

### New Package: `packages/swift-tokens`

```
Sources/
  KarigiriTokens.swift   # generated file
Package.swift            # exposes module
```

Add **Style Dictionary** config `swift.config.json`:

```json
{
  "platform": "ios",
  "transformGroup": "ios-swift",
  "buildPath": "build/ios/",
  "files": [{
    "destination": "KarigiriTokens.swift",
    "className": "KarigiriTokens",
    "type": "swift"
  }]
}
```

Add `build:swift` script to tokens package and update CI to run it on macOS and commit to the swift‑tokens package.

> **Outcome:** iOS teams can `import KarigiriTokens` and reference `KarigiriTokens.Color.accentTeal`, etc., in SwiftUI.

---

## v2.0  (Chakra) — Native SwiftUI Components

### Package: `packages/swift-ui`

* **Stack:** Swift 5.10, SwiftUI 5.
* **Component Subset:** Button, Card, Modal, Toast, Tabs, Input, DataTable.
* **Theming:** Leverages `KarigiriTokens` via `EnvironmentKey` (`karigiri`), supports dark/light.
* **Docs:** Xcode Preview grid; additional markdown docs under `DocumentationCatalog` for DocC enrichment.
* **A11y:** Use Apple Accessibility Inspector in CI (GitHub runner `macos-14`).

---

## Contribution & Migration Guides

* `docs/roadmap.md` – explains Akira → Banyan → Chakra.
* `docs/migration/from-shadcn.md` – how to migrate existing shadcn usage.
* `CONTRIBUTING.md` – branching, PR checklist, a11y rules.

---

## Next Actions(v1.0)

1. Scaffold Turborepo with pnpm workspaces.
2. Create `packages/tokens` + initial JSON.
3. Init `packages/react` via `npx shadcn-ui@latest init`.
4. Add `packages/react-native` with Tamagui & token hook.
5. Stand up Storybook apps.
6. Push to repo & set up CI.

Once Akira ships, schedule the Banyan sprint to integrate Swift token generation.
