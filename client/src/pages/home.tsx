import { useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroBg from "@assets/generated_images/neon_arcade_synthwave_background.png";
import { MOCK_GAMES, getRandomGame } from "@/lib/games";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [, setLocation] = useLocation();

  const handlePlayRandom = () => {
    const game = getRandomGame();
    setLocation(`/play/${game.id}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Neon Arcade Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center container mx-auto px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="w-3 h-3" />
            INSTANT PLAY ENGINE
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 neon-text drop-shadow-2xl">
            NEXT LEVEL<br />RANDOMNESS
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Discover your next obsession. Play thousands of curated mini-games instantly.
          </p>

          <Button 
            onClick={handlePlayRandom}
            size="lg" 
            className="h-16 px-12 text-xl font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)] transition-all transform hover:scale-105 animate-in fade-in zoom-in duration-500 delay-300 border-2 border-white/20"
          >
            <Play className="w-6 h-6 mr-3 fill-current" />
            PLAY RANDOM GAME
          </Button>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full block" />
            TRENDING NOW
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_GAMES.map((game) => (
            <Card 
              key={game.id} 
              className="group bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => setLocation(`/play/${game.id}`)}
            >
              <CardContent className="p-0 relative aspect-video">
                <img 
                  src={game.thumbnail} 
                  alt={game.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1 font-display">{game.title}</h3>
                  <p className="text-sm text-primary">{game.category.join(" • ")}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
}
