# Karigari Kit (Work in Progress)

*A hand-crafted design system stitched for speed, consistency, and dark-mode delight.*

---

## ✨ Why Karigari Kit?

**Karigari (कारीगरी)** means *craftsmanship* in Hindi.  
Like a master artisan, this kit weaves design tokens, accessible components, and opinionated guidelines into one reliable source of truth—whether you're prototyping a feature or polishing production apps.

| Trait | What it means for you |
|-------|-----------------------|
| **Dark-mode-first** | Colours, elevation, and motion tuned for low-light UIs by default—easily themed to light or high-contrast. |
| **Token-driven** | Colour, typography, spacing, radius, and shadow live as platform-agnostic JSON tokens, ready for Tailwind, SCSS, React Native, or Flutter. |
| **Batteries included** | Button, Input, Card, Modal, Toast, Data Table, and 30 + composable React components. |
| **Accessible by design** | WCAG 2.2 AA contrast, focus outlines, ARIA roles, RTL support, and automated a11y checks in CI. |
| **Docs you'll actually read** | Interactive Storybook, usage guidelines, and copy-tone tips—searchable in dark or light mode. |

---

## 🏗️ Installation

```bash
# with pnpm
pnpm add karigari-kit

# or with npm
npm install karigari-kit
```

## 🚀 Quick start
	
```javascript
import { Button, KarigariProvider, themeDark } from "karigari-kit";

function App() {
  return (
    <KarigariProvider theme={themeDark}>
      <Button intent="primary">Namaste World</Button>
    </KarigariProvider>
  );
}
```

1. Wrap your app with KarigariProvider.
2. Pick a theme (themeDark, themeLight, or create your own with tokens).
3. Drop components and ship. ✈️

---

## 📚 Documentation & examples

Full docs live at https://karigari-kit.dev
(Storybook, design-tokens JSON, Figma library, migration guides, and contribution handbook).

---

## 🤝 Contributing

We follow a craftsman's pipeline:
1. Open an issue describing the new component or design change.
2. Design review in Figma + Storybook comments.
3. Dev spike on a feature branch with a11y & unit tests.
4. PR → Chromatic visual diff → semantic release.

See CONTRIBUTING.md for the full workflow.

---

## 📜 License

Karigari Kit is released under the MIT License—free for personal and commercial projects, with attribution.
