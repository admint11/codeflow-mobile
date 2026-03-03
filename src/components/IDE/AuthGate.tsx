import { useBlinkAuth } from '@blinkdotnew/react'
import { blink } from '@/lib/blink'
import { Button } from '@/components/ui/button'
import { Laptop, Rocket, Zap, Sparkles } from 'lucide-react'

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useBlinkAuth()

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  return <>{children}</>
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-primary/30">
      {/* Hero */}
      <div className="relative overflow-hidden pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Mobile-First IDE</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              Build <span className="text-primary italic">Anything</span> <br />
              Anywhere.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
              The first truly mobile-first cloud IDE powered by an autonomous AI agent. 
              Edit, run, and deploy production-grade apps from your phone or tablet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-lg h-14 px-8" 
                onClick={() => blink.auth.login(window.location.href)}
              >
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Rocket, title: "Cloud Sandboxes", desc: "Instant development environments with zero setup. Everything runs in the cloud." },
          { icon: Zap, title: "AI Assistant", desc: "An autonomous agent that writes code, runs commands, and helps you build faster." },
          { icon: Laptop, title: "Multi-Platform", desc: "Seamless experience across mobile, tablet, and desktop. Your code follows you." }
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-colors group">
            <f.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
