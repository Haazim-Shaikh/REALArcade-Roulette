import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_GAMES, getRandomGame, Game } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { isGameSaved, saveGame, removeGame } from "@/lib/storage";
import { 
  Heart, Share2, RotateCcw, SkipForward, ThumbsUp, ThumbsDown, Maximize2,
  AlertCircle, Play, Save, Eye, Calendar, Laptop, DollarSign, Tag, MessageSquare,
  Clock, TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAutosave, setIsAutosave] = useState(true);
  const [commentFilter, setCommentFilter] = useState("latest");
  
  const isSkillGame = game?.id === 'clicker' || game?.id === 'jump';

  const [metrics] = useState({
    views: 12450, likes: 842, dislikes: 12, postedDate: "Oct 24, 2025",
    type: "Actual Game", platform: "Web", price: "Free"
  });

  const mockComments = [
    { id: 1, user: "Gamer99", text: "This is amazing! Love the neon vibe.", likes: 24, date: "2h ago" },
    { id: 2, user: "PixelDev", text: "Great mechanics for a demo.", likes: 56, date: "1d ago" },
    { id: 3, user: "NoobMaster", text: "A bit hard but fun.", likes: 5, date: "5m ago" },
  ];

  const sortedComments = [...mockComments].sort((a, b) => 
    commentFilter === "likes" ? b.likes - a.likes : 0
  );

  useEffect(() => {
    if (id) {
      const found = MOCK_GAMES.find(g => g.id === id);
      if (found) { setGame(found); setIsSaved(isGameSaved(found.id)); setIsPlaying(false); }
      else { setLocation(`/play/${getRandomGame().id}`); }
    }
  }, [id, setLocation]);

  const handleNext = () => game && setLocation(`/play/${getRandomGame(game.id).id}`);
  const handleToggleSave = () => {
    if (!game) return;
    if (isSaved) { removeGame(game.id); setIsSaved(false); }
    else { saveGame(game.id); setIsSaved(true); toast({ description: "Saved to Wishlist" }); }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden">
          {isPlaying ? (
            <iframe src={game?.url} className="w-full h-full absolute inset-0 z-10" allow="autoplay; fullscreen" />
          ) : (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
               <img src={game?.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" />
               <Button size="lg" onClick={() => setIsPlaying(true)} className="h-20 px-16 text-2xl font-bold rounded-full bg-white text-black hover:bg-primary hover:text-white z-30">
                 <Play className="w-8 h-8 mr-4 fill-current" /> PLAY DEMO
               </Button>
            </div>
          )}
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            <Button variant="secondary" size="icon" onClick={() => document.querySelector('iframe')?.requestFullscreen()} disabled={!isPlaying} className="rounded-full bg-black/50 border border-white/10 text-white"><Maximize2 className="w-5 h-5" /></Button>
          </div>
        </div>

        <div className="bg-card border-t border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <div className="bg-muted/50 rounded w-12 h-12 overflow-hidden"><img src={game?.thumbnail} className="w-full h-full object-cover" /></div>
             <div>
               <h2 className="font-bold text-lg text-white leading-tight">{game?.title}</h2>
               <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">
                 <span className="bg-primary/20 text-primary px-2 py-0.5 rounded">{metrics.type}</span>
                 <span className="flex items-center gap-1"><Laptop className="w-3 h-3" /> {metrics.platform}</span>
                 <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {metrics.price}</span>
               </div>
             </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-muted/20 p-1 rounded-full border border-white/5">
              <Button variant="ghost" size="icon" className="h-8 w-8"><ThumbsUp className="w-4 h-4" /></Button>
              <div className="w-px h-4 bg-white/10" />
              <Button variant="ghost" size="icon" className="h-8 w-8"><ThumbsDown className="w-4 h-4" /></Button>
            </div>
            <Button onClick={handleNext} className="rounded-full bg-white text-black hover:bg-primary hover:text-white font-bold px-6">NEXT DEMO</Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/30 border-white/5">
              <CardHeader><CardTitle className="text-xl">Description</CardTitle></CardHeader>
              <CardContent className="text-muted-foreground text-sm">{game?.description}</CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Comments</h3>
                <div className="flex gap-2">
                  <Button variant={commentFilter === "latest" ? "secondary" : "ghost"} size="sm" onClick={() => setCommentFilter("latest")}>Latest</Button>
                  <Button variant={commentFilter === "likes" ? "secondary" : "ghost"} size="sm" onClick={() => setCommentFilter("likes")}>Top Rated</Button>
                </div>
              </div>
              <div className="space-y-4">
                {sortedComments.map(c => (
                  <div key={c.id} className="p-4 bg-white/5 rounded-lg border border-white/5">
                    <div className="flex justify-between mb-2"><span className="font-bold text-primary">{c.user}</span><span className="text-[10px] text-muted-foreground">{c.date}</span></div>
                    <p className="text-sm text-white/80">{c.text}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground"><ThumbsUp className="w-3 h-3" /> {c.likes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-card/30 border-white/5">
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><TrendingUp className="w-5 h-5 text-primary" /> Weekly Leaderboard</CardTitle></CardHeader>
              <CardContent>
                <Tabs defaultValue="likes" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-black/40">
                    <TabsTrigger value="likes">Likes</TabsTrigger>
                    <TabsTrigger value="views">Views</TabsTrigger>
                  </TabsList>
                  <TabsContent value="likes" className="space-y-2 mt-4">
                    <div className="p-2 flex justify-between bg-primary/10 rounded"><span>1. {game?.title}</span><span className="text-primary font-bold">842</span></div>
                    <div className="p-2 flex justify-between"><span>2. Cyber Racer</span><span>712</span></div>
                    <div className="p-2 flex justify-between"><span>3. Neon Jump</span><span>590</span></div>
                  </TabsContent>
                </Tabs>
                <div className="mt-6 pt-6 border-t border-white/10">
                   <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Distinguished Users</h4>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-[10px] font-bold rounded border border-yellow-500/20">ELITE CREATOR</span>
                     <span className="px-2 py-1 bg-primary/20 text-primary text-[10px] font-bold rounded border border-primary/20">TOP TESTER</span>
                   </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
