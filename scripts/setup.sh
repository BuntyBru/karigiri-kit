#!/bin/bash

# Karigiri Kit v1.0 (Akira) Setup Script
# This script sets up your development environment for Karigiri Kit

set -e

echo "🎨 Setting up Karigiri Kit v1.0 (Akira)..."
echo "================================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm@8"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2)
REQUIRED_VERSION="18.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to v18+"
    exit 1
fi

echo "✅ Node.js v$NODE_VERSION detected"
echo "✅ pnpm $(pnpm --version) detected"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Build design tokens
echo ""
echo "🎨 Building design tokens..."
pnpm tokens:build

# Run type checking
echo ""
echo "🔍 Running type check..."
pnpm type-check

echo ""
echo "🚀 Setup complete! You can now:"
echo ""
echo "  📋 Development commands:"
echo "    pnpm dev              # Start all packages in watch mode"
echo "    pnpm build            # Build all packages"
echo "    pnpm tokens:build     # Rebuild design tokens"
echo ""
echo "  🎮 Try the examples:"
echo "    pnpm dev --filter next-example    # Next.js example"
echo "    pnpm dev --filter expo-example    # React Native example"
echo ""
echo "  📚 Documentation:"
echo "    pnpm dev --filter storybook-web   # Web Storybook"
echo "    pnpm dev --filter docs-site       # Documentation site"
echo ""
echo "  🧪 Quality checks:"
echo "    pnpm lint             # Lint all packages"
echo "    pnpm test             # Run all tests"
echo "    pnpm test:a11y        # Run accessibility tests"
echo ""
echo "🎉 Welcome to Karigiri Kit! Start crafting beautiful interfaces."
echo "📖 Read CONTRIBUTING.md for contribution guidelines." 