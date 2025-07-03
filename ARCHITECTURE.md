# 🏗️ Karigiri Kit Architecture Documentation

> A comprehensive guide to understanding the Karigiri Kit design system architecture, components, and workflows.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Design System Foundation](#design-system-foundation)
3. [Package Architecture](#package-architecture)
4. [Development Infrastructure](#development-infrastructure)
5. [Build System & Monorepo](#build-system--monorepo)
6. [Contribution Workflow](#contribution-workflow)
7. [Version Strategy](#version-strategy)
8. [Key Files Explained](#key-files-explained)

---

## 🎯 Overview

**Karigiri Kit** is a hand-crafted, dark-mode-first design system built with a **token-driven architecture** that supports multiple platforms:
- **Web**: React components with Tailwind CSS
- **Mobile**: React Native components with Tamagui
- **Future**: Native iOS (Swift) and SwiftUI components

### Core Philosophy
- 🌙 **Dark-mode first**: Designed for modern apps with dark themes
- 🎨 **Token-driven**: Single source of truth for all design decisions
- ♿ **Accessibility-first**: WCAG 2.2 AA compliance built-in
- 🔧 **Craftsman's pipeline**: Quality-focused development process
- 📱 **Cross-platform**: One design system, multiple platforms

---

## 🏛️ Design System Foundation

### 1. Design Tokens System (`packages/tokens/`)

#### What it does:
The **single source of truth** for all design decisions. Every color, spacing, typography, and styling value is defined here.

#### Key Files:
- **`tokens.json`**: The master definition file containing 120+ design tokens
- **`config/web.config.json`**: Style Dictionary configuration for web outputs
- **`config/rn.config.json`**: Style Dictionary configuration for React Native
- **`src/index.ts`**: TypeScript exports for programmatic access

#### Token Structure Example:
```json
{
  "color": {
    "bg": {
      "DEFAULT": { "value": "#181A1B", "type": "color" },
      "surface": { "value": "#2B2D30", "type": "color" },
      "subtle": { "value": "#E8E9EB", "type": "color" }
    },
    "accent": {
      "teal": { "value": "#2DD4BF", "type": "color" },
      "eco": { "value": "#7CB518", "type": "color" }
    }
  },
  "spacing": {
    "1": { "value": "4px", "type": "spacing" },
    "2": { "value": "8px", "type": "spacing" },
    "4": { "value": "16px", "type": "spacing" }
  }
}
```

#### Build Process:
1. **Input**: `tokens.json` (single source)
2. **Processor**: Style Dictionary
3. **Outputs**: 
   - `build/web/tokens.css` - CSS custom properties
   - `build/web/tokens.scss` - SCSS variables
   - `build/rn/tokens.ts` - React Native StyleSheet
   - `dist/index.js` - TypeScript/JavaScript objects

#### Usage Examples:
```css
/* CSS */
background-color: var(--karigiri-color-bg-surface);
```

```javascript
// JavaScript
import { tokens } from '@karigiri-kit/tokens'
const bgColor = tokens.color.bg.surface.value // "#2B2D30"
```

---

## 📦 Package Architecture

### 2. Tailwind Configuration (`packages/tailwind-config/`)

#### What it does:
Converts design tokens into a Tailwind CSS preset that can be used across all web applications.

#### Key Files:
- **`src/index.ts`**: Main preset configuration
- **`package.json`**: Defines dependency on `@karigiri-kit/tokens`

#### How it works:
```typescript
import { tokens } from '@karigiri-kit/tokens'

const karigiriPreset = {
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: tokens.color.bg.DEFAULT.value,
          surface: tokens.color.bg.surface.value,
        },
        accent: {
          teal: tokens.color.accent.teal.value,
          eco: tokens.color.accent.eco.value,
        }
      }
    }
  }
}
```

#### Usage in Applications:
```javascript
// tailwind.config.js
module.exports = {
  presets: [require('@karigiri-kit/tailwind-config')],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
}
```

### 3. React Theme Provider (`packages/react-theme/`)

#### What it does:
Provides theme context and management for React applications, supporting dark/light/system modes.

#### Key Files:
- **`src/provider.tsx`**: Main theme provider component
- **`src/themes.ts`**: Theme definitions and utilities
- **`src/types.ts`**: TypeScript interfaces

#### Components:
- **`KarigiriProvider`**: Root theme provider
- **`useKarigiriTheme`**: Hook for accessing theme state
- **`themeDark`**: Default dark theme
- **`themeLight`**: Light theme variant

#### Usage Example:
```typescript
import { KarigiriProvider, useKarigiriTheme } from '@karigiri-kit/react-theme'

function App() {
  return (
    <KarigiriProvider mode="dark">
      <MyComponent />
    </KarigiriProvider>
  )
}

function MyComponent() {
  const { mode, setMode, resolvedTheme } = useKarigiriTheme()
  
  return (
    <div style={{ backgroundColor: resolvedTheme.colors.bg.DEFAULT }}>
      <button onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
    </div>
  )
}
```

### 4. React Components (`packages/react/`)

#### What it does:
Provides accessible, styled React components following shadcn/ui patterns.

#### Key Files:
- **`src/components/Button.tsx`**: Button component with variants
- **`src/components/Card.tsx`**: Card layout component
- **`src/components/Input.tsx`**: Form input component
- **`src/index.ts`**: Main exports
- **`src/utils/cn.ts`**: Class name utility (clsx + tailwind-merge)

#### Component Structure:
```typescript
import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-accent-teal text-white hover:bg-accent-teal/90",
        outline: "border border-border bg-transparent hover:bg-bg-hover",
        ghost: "hover:bg-bg-hover hover:text-text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
```

### 5. React Native Components (`packages/react-native/`)

#### What it does:
Provides React Native components with consistent styling using Tamagui.

#### Key Files:
- **`src/components/Button.tsx`**: Native button component
- **`src/components/Card.tsx`**: Native card component
- **`src/components/Input.tsx`**: Native input component
- **`src/hooks/useKarigiriTokens.ts`**: Hook for accessing tokens
- **`src/provider/KarigiriProvider.tsx`**: Native theme provider
- **`src/types.ts`**: TypeScript definitions

#### Native Implementation:
```typescript
import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { useKarigiriTokens } from '../hooks/useKarigiriTokens'

export interface ButtonProps {
  title: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  onPress?: () => void
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'default',
  size = 'default',
  onPress,
  disabled,
}) => {
  const tokens = useKarigiriTokens()
  
  const buttonStyles = StyleSheet.create({
    default: {
      backgroundColor: tokens.color.accent.teal.value,
      paddingHorizontal: tokens.spacing[4].value,
      paddingVertical: tokens.spacing[2].value,
      borderRadius: tokens.radius.md.value,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: tokens.color.border.DEFAULT.value,
      paddingHorizontal: tokens.spacing[4].value,
      paddingVertical: tokens.spacing[2].value,
      borderRadius: tokens.radius.md.value,
    },
  })
  
  return (
    <Pressable
      style={buttonStyles[variant]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text>{title}</Text>
    </Pressable>
  )
}
```

---

## 🛠️ Development Infrastructure

### Why Monorepo?

The Karigiri Kit uses a **monorepo architecture** with the following benefits:

1. **Shared Dependencies**: All packages share the same versions of core dependencies
2. **Unified Build System**: Single build pipeline for all packages
3. **Atomic Changes**: Changes across multiple packages can be made in a single commit
4. **Simplified Testing**: Run tests for all packages together
5. **Version Synchronization**: Packages can be versioned together or independently

### Package Manager: pnpm

**Why pnpm over npm/yarn?**
- **Disk Efficiency**: Shared dependency storage across projects
- **Faster Installs**: Parallel installation and symlinking
- **Workspace Support**: Built-in monorepo support
- **Strict**: Prevents phantom dependencies

#### pnpm-workspace.yaml
```yaml
packages:
  - "packages/*"  # All packages under packages/
  - "apps/*"      # All apps under apps/

catalogs:
  react18:
    react: ^18.2.0
    react-dom: ^18.2.0
    "@types/react": ^18.2.45
    "@types/react-dom": ^18.2.18
```

### Build System: Turbo

**What is Turbo?**
Turbo is a high-performance build system for JavaScript and TypeScript codebases. It provides:
- **Parallel Execution**: Run tasks across packages simultaneously
- **Incremental Builds**: Only rebuild what changed
- **Caching**: Cache build outputs locally and remotely
- **Task Orchestration**: Define task dependencies

#### turbo.json Breakdown:
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": {
      "cache": false,           // Don't cache dev mode
      "persistent": true        // Keep running (watch mode)
    },
    "build": {
      "dependsOn": ["^build"],  // Wait for dependencies to build first
      "outputs": [
        "dist/**",              // Cache these output directories
        "build/**",
        ".next/**",
        "!.next/cache/**",
        "storybook-static/**"
      ]
    },
    "tokens:build": {
      "outputs": ["build/**", "dist/**"]
    }
  }
}
```

#### Task Execution Flow:
1. `pnpm dev` → `turbo dev` → Runs dev script in all packages
2. `pnpm build` → `turbo build` → Builds packages in dependency order
3. `pnpm tokens:build` → Builds tokens first, then dependent packages

---

## 🔄 Contribution Workflow

### The Craftsman's Pipeline

The **CONTRIBUTING.md** defines a quality-focused development process:

#### 1. Issue Creation
- **Purpose**: Track all changes and enhancements
- **Process**: 
  - Create GitHub issue with detailed description
  - Include use cases and accessibility requirements
  - Tag with appropriate labels (`component`, `enhancement`, `bug`)

#### 2. Design Review
- **Purpose**: Ensure design consistency before development
- **Process**:
  - Design review in Figma
  - Storybook component documentation
  - Alignment with design tokens
  - Design team approval

#### 3. Development Spike
- **Purpose**: Implement the feature with quality standards
- **Process**:
  - Create feature branch: `git checkout -b feature/component-name`
  - Implement accessible component
  - Write unit tests with jest-axe
  - Create Storybook stories
  - Add TypeScript definitions

#### 4. Quality Checks
- **Purpose**: Ensure code quality and accessibility
- **Checks**:
  - `pnpm test` - All tests pass
  - `pnpm test:a11y` - Accessibility tests pass
  - `pnpm type-check` - No TypeScript errors
  - `pnpm lint` - Code style compliance

#### 5. Pull Request
- **Purpose**: Code review and collaboration
- **Requirements**:
  - Clear description with screenshots
  - Link to related issue
  - Maintainer review

#### 6. Visual Review
- **Purpose**: Catch visual regressions
- **Tools**:
  - Chromatic for visual diff review
  - Storybook deployment preview
  - Cross-browser testing

#### 7. Release
- **Purpose**: Publish changes to users
- **Process**:
  - Semantic release via Changesets
  - NPM package publication
  - Documentation updates

### Testing Standards

#### Unit Testing
```typescript
describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('passes accessibility tests', async () => {
    const { container } = render(<Button>Click me</Button>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('handles keyboard interactions', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' })
    expect(handleClick).toHaveBeenCalled()
  })
})
```

#### Accessibility Testing
- **Tool**: jest-axe (automated accessibility testing)
- **Standards**: WCAG 2.2 AA compliance
- **Coverage**: 
  - Keyboard navigation
  - Screen reader compatibility
  - Focus management
  - Color contrast
  - ARIA attributes

---

## 🚀 Version Strategy

### Current: v1.0 (Akira)

**Focus**: React + React Native with design tokens

**Deliverables**:
- ✅ Design tokens system (120+ tokens)
- ✅ React component library (Button, Card, Input)
- ✅ React Native components with Tamagui
- ✅ Theme provider with dark/light/system modes
- ✅ Tailwind CSS preset
- ✅ Example applications
- ✅ Storybook documentation

### Future: v1.1 (Banyan)

**Focus**: Native iOS token parity

**Deliverables**:
- Swift Package Manager integration
- Auto-generated `KarigiriTokens.swift`
- iOS teams can use tokens in SwiftUI
- Visual parity without component library

### Future: v2.0 (Chakra)

**Focus**: Full SwiftUI component library

**Deliverables**:
- Complete SwiftUI component set
- Native iOS components mirroring React library
- Xcode Previews for documentation
- Shared accessibility standards

---

## 🗂️ Key Files Explained

### Root Configuration Files

#### `package.json` (Root)
```json
{
  "name": "karigiri-kit",
  "private": true,
  "scripts": {
    "dev": "turbo dev",           // Start all packages in dev mode
    "build": "turbo build",       // Build all packages
    "tokens:build": "turbo tokens:build"  // Build tokens first
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.1", // Version management
    "turbo": "^1.11.2"            // Build system
  }
}
```

#### `pnpm-workspace.yaml`
- **Purpose**: Defines which directories contain packages
- **Catalogs**: Shared dependency versions across packages
- **Workspace**: Enables `pnpm install` to link local packages

#### `turbo.json`
- **Purpose**: Defines build pipeline and task dependencies
- **Pipeline**: Specifies how tasks relate to each other
- **Caching**: Optimizes builds by caching outputs
- **Outputs**: Tells Turbo what files to cache

### Development Files

#### `CONTRIBUTING.md`
- **Purpose**: Development guidelines and contribution process
- **Covers**: Setup, quality standards, testing, release process
- **Audience**: Contributors and maintainers

#### `strategy.md`
- **Purpose**: Product roadmap and versioning strategy
- **Covers**: v1.0 (Akira), v1.1 (Banyan), v2.0 (Chakra)
- **Audience**: Product managers and stakeholders

#### `.github/workflows/`
- **Purpose**: CI/CD automation
- **Includes**: Testing, building, visual regression, releases
- **Integration**: GitHub Actions with Chromatic

### Build Outputs

#### `packages/tokens/build/`
- **`web/tokens.css`**: CSS custom properties for web
- **`web/tokens.scss`**: SCSS variables for styling
- **`rn/tokens.ts`**: React Native compatible tokens

#### `packages/*/dist/`
- **`index.js`**: Built JavaScript for Node.js (CommonJS)
- **`index.mjs`**: Built JavaScript for ES modules
- **`index.d.ts`**: TypeScript definitions

---

## 🎯 Data Flow Example

### Token Usage Flow

1. **Design Decision**: Designer updates color in Figma
2. **Token Update**: Update `packages/tokens/tokens.json`
3. **Build Process**: Run `pnpm tokens:build`
4. **Style Dictionary**: Generates platform-specific files
5. **Package Updates**: Tailwind config auto-updates with new tokens
6. **Component Usage**: Components use new tokens automatically
7. **Application**: All apps reflect the design change

### Component Creation Flow

1. **Issue Creation**: GitHub issue for new component
2. **Design Review**: Figma design with token usage
3. **Development**: 
   - Create component in `packages/react/src/components/`
   - Add React Native version in `packages/react-native/src/components/`
   - Write tests with accessibility checks
   - Create Storybook stories
4. **Quality Checks**: Tests, linting, type checking
5. **Visual Review**: Chromatic visual regression testing
6. **Release**: Changeset → Version bump → NPM publish

---

## 🔧 Development Commands

### Token Management
```bash
pnpm tokens:build          # Build all token outputs
pnpm tokens:build:web      # Build web tokens (CSS, SCSS)
pnpm tokens:build:rn       # Build React Native tokens
```

### Development
```bash
pnpm dev                   # Start all packages in watch mode
pnpm dev --filter next-example  # Start specific app
pnpm build                 # Build all packages
pnpm clean                 # Clean all build outputs
```

### Quality Assurance
```bash
pnpm test                  # Run all tests
pnpm test:a11y             # Run accessibility tests
pnpm type-check            # TypeScript type checking
pnpm lint                  # Code style checking
```

### Release Management
```bash
pnpm changeset             # Create a changeset
pnpm version-packages      # Update package versions
pnpm release               # Build and publish to NPM
```

---

## 📈 Performance Optimizations

### Build Performance
- **Turbo Caching**: Incremental builds save 60-80% build time
- **Parallel Tasks**: Multiple packages build simultaneously
- **Dependency Optimization**: Only rebuild what changed

### Runtime Performance
- **Tree Shaking**: Only import used components
- **CSS Optimization**: Purged unused styles
- **Token Efficiency**: Compile-time token resolution

### Developer Experience
- **Hot Reload**: Instant updates during development
- **Type Safety**: Full TypeScript support
- **IntelliSense**: Auto-completion for all tokens and components

---

This architecture enables Karigiri Kit to scale from a simple design system to a comprehensive multi-platform solution while maintaining quality, consistency, and developer experience. The token-driven approach ensures that design changes propagate automatically across all platforms, making it easy to maintain visual consistency as the system grows. 