# Contributing to Karigiri Kit

We follow a **craftsman's pipeline** to ensure quality and consistency across our design system.

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git

### Installation

```bash
git clone https://github.com/your-org/karigiri-kit.git
cd karigiri-kit
pnpm install
pnpm tokens:build
```

### Development Commands

```bash
# Development
pnpm dev              # Start all packages in watch mode
pnpm build            # Build all packages
pnpm tokens:build     # Build design tokens

# Quality
pnpm lint             # Lint all packages
pnpm type-check       # TypeScript type checking
pnpm test             # Run all tests
pnpm test:a11y        # Run accessibility tests

# Examples
pnpm dev --filter next-example       # Start Next.js example
pnpm dev --filter expo-example       # Start Expo example
pnpm dev --filter storybook-web      # Start Web Storybook
```

## 📋 Contribution Process

### 1. Issue Creation
- Open an issue describing the new component or design change
- Include use cases, design requirements, and accessibility considerations
- Tag with appropriate labels (`component`, `enhancement`, `bug`, etc.)

### 2. Design Review
- Design review in Figma + Storybook comments
- Ensure alignment with design tokens and brand guidelines
- Get approval from design team before development

### 3. Development Spike
- Create a feature branch: `git checkout -b feature/component-name`
- Dev spike on the feature branch with:
  - Accessible component implementation
  - Unit tests with jest-axe
  - Storybook stories with controls
  - TypeScript definitions

### 4. Quality Checks
- All tests pass (`pnpm test`)
- Accessibility tests pass (`pnpm test:a11y`)
- No TypeScript errors (`pnpm type-check`)
- Lint passes (`pnpm lint`)

### 5. Pull Request
- Create PR with clear description
- Include screenshots/videos for UI changes
- Link to related issue
- Request review from maintainers

### 6. Visual Review
- Chromatic visual diff review
- Storybook deployment preview
- Cross-browser testing

### 7. Release
- Semantic release via Changesets
- NPM package publication
- Documentation updates

## 🎨 Design Guidelines

### Accessibility First
- WCAG 2.2 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast validation

### Token-Driven
- Use design tokens for all styling
- No hardcoded values
- Consistent spacing, colors, typography
- Support for dark/light themes

### Component API
- Consistent prop patterns
- Polymorphic components where appropriate
- Controlled/uncontrolled patterns
- Composition over configuration

## 🧪 Testing Standards

### Unit Tests
- Test component behavior, not implementation
- Test accessibility with jest-axe
- Test keyboard interactions
- Test theme variations

### Visual Tests
- Chromatic for visual regression
- Storybook stories for all variants
- Cross-browser compatibility

### Example Test Structure
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

## 📦 Package Structure

```
packages/
├── tokens/           # Design tokens (JSON → CSS/SCSS/JS/RN)
├── react/            # React components
├── react-native/     # React Native components
├── react-theme/      # Theme provider
└── tailwind-config/  # Tailwind preset

apps/
├── next-example/     # Next.js playground
├── expo-example/     # React Native playground
├── storybook-web/    # Web Storybook
├── storybook-native/ # React Native Storybook
└── docs-site/        # Documentation site
```

## 🚀 Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management:

1. Create changeset: `pnpm changeset`
2. Choose change type: `patch`, `minor`, `major`
3. Describe changes in generated markdown
4. Commit changeset file
5. PR gets merged → automated release

## 📚 Documentation

- Component props and examples in Storybook
- Usage guidelines in docs site
- API reference auto-generated from TypeScript
- Migration guides for breaking changes

## 🤝 Community

- Be respectful and inclusive
- Ask questions in GitHub Discussions
- Share feedback and suggestions
- Help others learn and grow

---

Thank you for contributing to Karigiri Kit! Your craftsmanship helps make this design system better for everyone. 🙏 