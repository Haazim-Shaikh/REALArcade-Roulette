import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Gamepad2, Users, Clock, Smile, Search } from "lucide-react";
import { useLocation } from "wouter";
import { getRandomGame } from "@/lib/games";

export default function Recommend() {
  const [, setLocation] = useLocation();
  const [playtime, setPlaytime] = useState([15]);
  const [genre, setGenre] = useState<string[]>([]);
  const [style, setStyle] = useState<string>("");

  const genres = ["Arcade", "Action", "Puzzle", "RPG", "Strategy", "Rhythm"];
  const styles = ["Single Player", "Multiplayer", "Local Co-op", "MMO"];

  const handleRecommend = () => {
    const game = getRandomGame();
    setLocation(`/play/${game.id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">AI Recommender</h1>
          <p className="text-muted-foreground">Tailor your random session to your current vibe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-card border-white/5 h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <Label className="text-white font-bold">Favorite Genres (Pick 1+)</Label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <Button
                      key={g}
                      variant={genre.includes(g) ? "default" : "outline"}
                      size="sm"
                      onClick={() => setGenre(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])}
                      className="rounded-full"
                    >
                      {g}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-white font-bold">Play Style</Label>
                <div className="flex flex-wrap gap-2">
                  {styles.map((s) => (
                    <Button
                      key={s}
                      variant={style === s ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setStyle(s)}
                      className="rounded-full"
                    >
                      {s}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between">
                  <Label className="text-white font-bold flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Available Playtime
                  </Label>
                  <span className="text-primary font-bold">{playtime[0]} min</span>
                </div>
                <Slider
                  value={playtime}
                  onValueChange={setPlaytime}
                  max={60}
                  step={5}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/5 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smile className="w-5 h-5 text-secondary" />
                Current Mood
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
               <div className="grid grid-cols-2 gap-4">
                 {["Chill", "High Energy", "Competitive", "Brainy"].map((mood) => (
                   <Button key={mood} variant="outline" className="h-20 flex flex-col gap-2 hover:border-primary/50">
                     <Sparkles className="w-4 h-4 text-primary opacity-50" />
                     {mood}
                   </Button>
                 ))}
               </div>

               <div className="mt-auto pt-8">
                 <Button 
                   onClick={handleRecommend}
                   className="w-full h-16 text-xl font-bold bg-primary hover:bg-primary/90 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                 >
                   <Search className="w-5 h-5 mr-2" />
                   FIND MY GAME
                 </Button>
                 <p className="text-center text-xs text-muted-foreground mt-4">
                   Powered by OpenAI Recommendation Pipeline
                 </p>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
