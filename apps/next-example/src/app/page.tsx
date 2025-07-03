'use client'

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input } from '@karigiri-kit/react'
import { KarigiriProvider, themeDark } from '@karigiri-kit/react-theme'

export default function Home() {
  return (
    <KarigiriProvider theme={undefined as any} customTheme={undefined as any}>
      <main className="min-h-screen bg-bg-DEFAULT p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-text-primary font-display">
              Karigari Kit
            </h1>
            <p className="text-text-secondary text-lg">
              A hand-crafted design system stitched for speed, consistency, and dark-mode delight.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Components</CardTitle>
                <CardDescription>
                  Beautiful, accessible components built with tokens
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Button variant="primary" className="w-full">
                    Primary Button
                  </Button>
                  <Button variant="secondary" className="w-full">
                    Secondary Button
                  </Button>
                  <Button variant="outline" className="w-full">
                    Outline Button
                  </Button>
                </div>
                <Input placeholder="Type something..." />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dark Mode First</CardTitle>
                <CardDescription>
                  Designed with dark themes in mind
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-accent-teal"></div>
                    <span className="text-text-primary">Accent Teal</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-accent-eco"></div>
                    <span className="text-text-primary">Accent Eco</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-semantic-success"></div>
                    <span className="text-text-primary">Success Green</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-semantic-error"></div>
                    <span className="text-text-primary">Error Red</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Install Karigari Kit in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-bg-muted rounded p-4 font-mono text-sm text-text-primary">
                <div>pnpm add karigari-kit</div>
                <div className="mt-2 text-text-muted"># or with npm</div>
                <div>npm install karigari-kit</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </KarigiriProvider>
  )
} 