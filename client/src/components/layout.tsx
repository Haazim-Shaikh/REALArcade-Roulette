import { Link, useLocation } from "wouter";
import { Gamepad2, Heart, Plus, User, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Scanline effect overlay */}
      <div className="scanline" />

      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/50 blur-lg group-hover:bg-primary/80 transition-all rounded-full" />
                <Gamepad2 className="w-8 h-8 text-primary relative z-10" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
                ARCADE<span className="text-primary">ROULETTE</span>
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/recommend" className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${location === '/recommend' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Sparkles className="w-4 h-4" />
              AI Recommender
            </Link>
            <Link href="/library" className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${location === '/library' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Heart className="w-4 h-4" />
              Wishlist
            </Link>
            <Link href="/submit" className={`text-sm font-medium hover:text-primary transition-colors flex items-center gap-2 ${location === '/submit' ? 'text-primary' : 'text-muted-foreground'}`}>
              <Plus className="w-4 h-4" />
              Creator Portal
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex border-primary/50 text-primary hover:bg-primary hover:text-white transition-all shadow-[0_0_10px_rgba(139,92,246,0.2)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              Connect with GitHub
            </Button>
             <Button variant="ghost" size="icon" className="sm:hidden text-muted-foreground">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-8 mt-auto relative z-10">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="font-display mb-2">BUILT FOR GAMERS & CREATORS</p>
          <p>© 2024 ArcadeRoulette. Powered by AI Demos.</p>
        </div>
      </footer>
    </div>
  );
}
