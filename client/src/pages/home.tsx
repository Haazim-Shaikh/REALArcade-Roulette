import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_GAMES, getRandomGame } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, TrendingUp, Gamepad2, Rocket, Zap, Clock, 
  ShieldAlert, CheckCircle2, ChevronDown, ArrowRight 
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export default function Home() {
  const [, setLocation] = useLocation();
  const [showGate, setShowGate] = useState(false);
  const [agreed, setAgreed] = useState(false);
  
  useEffect(() => {
    const hasAgreed = localStorage.getItem("arcade-agreed");
    if (!hasAgreed) setShowGate(true);
  }, []);

  const handleEnter = () => {
    if (agreed) {
      localStorage.setItem("arcade-agreed", "true");
      setShowGate(false);
    }
  };

  const sections = [
    { 
      title: "AI Recommendations", 
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      description: "Based on your playstyle",
      games: MOCK_GAMES.slice(0, 3) 
    },
    { 
      title: "Trending Now", 
      icon: <TrendingUp className="w-5 h-5 text-secondary" />,
      description: "What the community is playing",
      games: [MOCK_GAMES[2], MOCK_GAMES[0], MOCK_GAMES[1]] 
    },
    { 
      title: "New Releases", 
      icon: <Rocket className="w-5 h-5 text-orange-500" />,
      description: "Freshly published demos",
      games: MOCK_GAMES.slice(1, 4) 
    },
    { 
      title: "Action & Arcade", 
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      description: "Fast-paced excitement",
      games: MOCK_GAMES.filter(g => g.category.includes('Action')).slice(0, 3) 
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        
        <div className="w-full relative z-10 flex flex-col items-center justify-center text-center space-y-8 py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-1000">
            <Sparkles className="w-4 h-4" />
            DISCOVER THE NEXT BIG HIT
          </div>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white font-display uppercase leading-tight w-full text-center px-4">
              Arcade<span className="text-primary">Roulette</span>
            </h1>
          </div>
          <p className="max-w-2xl text-muted-foreground text-lg md:text-xl font-medium mx-auto">
            The ultimate launchpad for indie game demos. Play, test, and influence the future of gaming.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => setLocation(`/play/${MOCK_GAMES[0].id}`)}
              className="h-14 px-10 text-lg font-bold rounded-full group"
            >
              PLAY RANDOM <Gamepad2 className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Link href="/community">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold rounded-full border-white/10 hover:bg-white/5">
                COMMUNITY HUB <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <ChevronDown className="absolute bottom-8 left-1/2 -translate-x-1/2 w-8 h-8 text-muted-foreground animate-bounce" />
        </div>
      </section>

      {/* Dynamic Sections */}
      <div className="py-20 space-y-32">
        {sections.map((section, idx) => (
          <section key={idx} className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-12">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  {section.icon}
                  <h2 className="text-3xl font-display font-bold text-white uppercase tracking-tight">{section.title}</h2>
                </div>
                <p className="text-muted-foreground font-medium">{section.description}</p>
              </div>
              <Button variant="link" className="text-primary font-bold hidden sm:flex">VIEW ALL <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.games.map((game) => (
                <div key={game.id} onClick={() => setLocation(`/play/${game.id}`)} className="cursor-pointer group">
                  <div className="aspect-video rounded-xl overflow-hidden border border-white/5 group-hover:border-primary/50 transition-all mb-4">
                    <img src={game.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={game.title} />
                  </div>
                  <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{game.title}</h3>
                  <p className="text-xs text-muted-foreground uppercase font-black tracking-widest">{game.category.join(' • ')}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Community Gating Dialog */}
      <Dialog open={showGate} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display font-bold flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-primary" />
              PLAYER CONDUCT
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-4">
              To keep ArcadeRoulette a safe place for creators and players, you must agree to our community standards.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
              <p className="text-xs font-bold text-primary uppercase">The "No-Go" List:</p>
              <ul className="text-xs space-y-2 text-white/80 list-disc ml-4">
                <li>No toxic behavior or harassment in comments.</li>
                <li>No posting of offensive images or videos in the community.</li>
                <li>No creating games with hate speech or discriminatory content.</li>
                <li>No spamming or self-promotion in other creators' feeds.</li>
                <li>Respect intellectual property and original designs.</li>
              </ul>
            </div>
            <div className="flex items-start space-x-3 pt-2">
              <Checkbox 
                id="terms" 
                checked={agreed} 
                onCheckedChange={(checked) => setAgreed(checked as boolean)}
                className="mt-1 border-primary data-[state=checked]:bg-primary"
              />
              <label htmlFor="terms" className="text-sm font-medium leading-none cursor-pointer select-none">
                I promise to be a cool human and follow these rules.
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              disabled={!agreed} 
              onClick={handleEnter}
              className="w-full h-12 text-lg font-bold transition-all disabled:opacity-50"
            >
              ENTER ARCADE <CheckCircle2 className="ml-2 w-5 h-5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
