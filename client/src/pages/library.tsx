import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_GAMES, Game } from "@/lib/games";
import { getSavedGames } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Library() {
  const [savedGames, setSavedGames] = useState<Game[]>([]);

  useEffect(() => {
    const savedIds = getSavedGames();
    const games = MOCK_GAMES.filter(g => savedIds.includes(g.id));
    setSavedGames(games);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8">
           <div className="bg-primary/20 p-3 rounded-xl">
             <Heart className="w-8 h-8 text-primary fill-current" />
           </div>
           <div>
             <h1 className="text-4xl font-display font-bold text-white">Your Library</h1>
             <p className="text-muted-foreground">{savedGames.length} saved games</p>
           </div>
        </div>

        {savedGames.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-3xl bg-white/5">
            <Ghost className="w-20 h-20 text-muted-foreground mb-6 opacity-50" />
            <h3 className="text-2xl font-bold text-white mb-2">No games saved yet</h3>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Start playing and click the heart icon to build your collection of favorites.
            </p>
            <Link href="/">
              <Button size="lg" className="rounded-full font-bold">Discover Games</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {savedGames.map((game) => (
              <Link key={game.id} href={`/play/${game.id}`}>
                <Card className="group bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-all cursor-pointer h-full hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                  <CardContent className="p-0 relative aspect-[4/3]">
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white border border-white/10">
                      {game.category[0]}
                    </div>
                  </CardContent>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1 font-display truncate">{game.title}</h3>
                    <p className="text-sm text-muted-foreground truncate">by {game.creator}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
