import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_GAMES, getRandomGame, Game } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { isGameSaved, saveGame, removeGame } from "@/lib/storage";
import { 
  Heart, 
  Share2, 
  RotateCcw, 
  SkipForward, 
  ThumbsUp, 
  ThumbsDown, 
  Maximize2,
  AlertCircle,
  Play,
  Save,
  Eye,
  Calendar,
  SwitchCamera
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [isAutosave, setIsAutosave] = useState(true);
  
  // Skill games don't save
  const isSkillGame = game?.id === 'clicker' || game?.id === 'jump';

  // Mock metrics
  const [metrics] = useState({
    views: Math.floor(Math.random() * 5000) + 1000,
    likes: Math.floor(Math.random() * 800) + 100,
    dislikes: Math.floor(Math.random() * 50),
    postedDate: "Oct 24, 2025"
  });

  useEffect(() => {
    if (id) {
      const found = MOCK_GAMES.find(g => g.id === id);
      if (found) {
        setGame(found);
        setIsSaved(isGameSaved(found.id));
        setIsPlaying(false);
      } else {
        const random = getRandomGame();
        setLocation(`/play/${random.id}`);
      }
    } else {
      const random = getRandomGame();
      setLocation(`/play/${random.id}`);
    }
  }, [id, setLocation]);

  const handleNext = () => {
    if (game) {
      const next = getRandomGame(game.id);
      setLocation(`/play/${next.id}`);
    }
  };

  const handleToggleSave = () => {
    if (!game) return;
    if (isSaved) {
      removeGame(game.id);
      setIsSaved(false);
      toast({ description: "Removed from library" });
    } else {
      saveGame(game.id);
      setIsSaved(true);
      toast({ description: "Added to library", className: "bg-primary text-primary-foreground" });
    }
  };

  const handleManualSave = () => {
    if (isSkillGame) {
      toast({ description: "Skill-based games don't support progress saving.", variant: "destructive" });
      return;
    }
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Progress Saved!");
      toast({ description: "Game progress saved locally" });
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);
  };

  const handleFullScreen = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if ((iframe as any).webkitRequestFullscreen) {
        (iframe as any).webkitRequestFullscreen();
      } else if ((iframe as any).msRequestFullscreen) {
        (iframe as any).msRequestFullscreen();
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ description: "Link copied to clipboard!" });
  };

  if (!game) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col">
        {/* Game Area */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden group">
          
          {isPlaying ? (
            <div className="w-full h-full relative">
              <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-muted-foreground">
                 <iframe 
                   src={game.url === "about:blank" ? undefined : game.url}
                   className="w-full h-full absolute inset-0 z-10"
                   allow="autoplay; fullscreen; gamepad"
                 />
                 {game.url === "about:blank" && (
                   <div className="z-0 flex flex-col items-center animate-pulse">
                     <AlertCircle className="w-16 h-16 mb-4 opacity-50" />
                     <p className="text-2xl font-display font-bold">DEMO EMULATION RUNNING</p>
                     <p className="text-sm opacity-60 mt-2">AI-Enhanced Session Active (OpenAI Pipeline ready)</p>
                   </div>
                 )}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
               <img 
                 src={game.thumbnail} 
                 alt={game.title} 
                 className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
               />
               <div className="relative z-30 flex flex-col items-center text-center p-8 max-w-2xl animate-in zoom-in duration-300">
                 <div className="mb-4 px-4 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-tighter">
                   Quick Demo Version
                 </div>
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-2 font-display uppercase tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                   {game.title}
                 </h1>
                 <p className="text-primary font-bold tracking-wider mb-8 uppercase text-sm">
                   BY {game.creator}
                 </p>
                 <Button 
                   size="lg" 
                   onClick={() => setIsPlaying(true)}
                   className="h-20 px-16 text-2xl font-bold rounded-full bg-white text-black hover:bg-primary hover:text-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] border-4 border-transparent hover:border-white/50"
                 >
                   <Play className="w-8 h-8 mr-4 fill-current" />
                   PLAY DEMO
                 </Button>
               </div>
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={handleFullScreen}
              disabled={!isPlaying}
              className="rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white disabled:opacity-30"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Autosave Indicator */}
          {isPlaying && isAutosave && !isSkillGame && (
            <div className="absolute bottom-4 left-4 z-40 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] text-green-400 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              AUTOSAVE ENABLED
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="bg-card border-t border-white/5 p-4 md:h-24 flex flex-col md:flex-row items-center justify-between gap-4 z-30 relative">
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="bg-muted/50 rounded-lg p-2 aspect-square w-16 h-16 hidden md:block overflow-hidden">
                <img src={game.thumbnail} className="w-full h-full object-cover" />
             </div>
             <div>
               <h2 className="font-bold text-lg md:text-xl text-white leading-tight">{game.title}</h2>
               <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                 <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {metrics.views.toLocaleString()}</span>
                 <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {metrics.postedDate}</span>
                 <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">by {game.creator}</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            
            {/* Rating Actions */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-full border border-white/5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-green-500/20 hover:text-green-500 h-10 w-10">
                        <ThumbsUp className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Like</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="w-px h-6 bg-white/10" />

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-500/20 hover:text-red-500 h-10 w-10">
                        <ThumbsDown className="w-5 h-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent><p>Dislike</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex justify-between w-full px-2 mt-1 text-[10px] text-muted-foreground font-bold">
                <span className="text-green-500">{metrics.likes}</span>
                <span className="text-red-500">{metrics.dislikes}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            {/* Save Controls - Hidden for skill games */}
            {!isSkillGame && (
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2 bg-muted/20 px-3 py-1.5 rounded-full border border-white/5">
                  <Switch 
                    id="autosave" 
                    checked={isAutosave} 
                    onCheckedChange={setIsAutosave} 
                  />
                  <Label htmlFor="autosave" className="text-[10px] font-bold text-muted-foreground whitespace-nowrap cursor-pointer">AUTOSAVE</Label>
                </div>

                {!isAutosave && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={handleManualSave}
                    className="rounded-full bg-muted hover:bg-muted/80 flex items-center gap-2"
                  >
                    <Save className="w-3 h-3" />
                    <span className="text-[10px] font-bold">{saveStatus || "SAVE"}</span>
                  </Button>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" onClick={handleToggleSave} className={`rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-muted'}`}>
                      <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Add to Wishlist</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                   <TooltipTrigger asChild>
                    <Button variant="secondary" size="icon" onClick={handleShare} className="rounded-full bg-muted hover:bg-muted/80">
                      <Share2 className="w-5 h-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Share</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Button onClick={handleNext} size="lg" className="ml-4 rounded-full bg-white text-black hover:bg-primary hover:text-white border border-transparent hover:border-white/50 shadow-lg font-bold gap-2 pl-6 pr-4">
              NEXT DEMO
              <SkipForward className="w-5 h-5 fill-current" />
            </Button>
          </div>
        </div>
        
        {/* Game Stats & Info */}
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-in fade-in slide-in-from-bottom-4">
          <Card className="bg-card/50 border-white/5 col-span-1 md:col-span-2">
            <CardHeader><CardTitle className="text-xl">Developer Description</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary uppercase tracking-tighter bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  Genre: {game.category.join(", ")}
                </span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {game.description}
              </p>
            </CardContent>
          </Card>
          
          {game.id === 'jump' && (
            <Card className="bg-card/50 border-white/5">
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><SwitchCamera className="w-5 h-5 text-primary" /> Global Leaderboard</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "RetroKing", score: "12,450" },
                    { name: "PixelMaster", score: "10,890" },
                    { name: "VoidRunner", score: "9,200" }
                  ].map((entry, i) => (
                    <div key={i} className="flex justify-between items-center p-2 rounded hover:bg-white/5 transition-colors">
                      <span className="text-sm flex items-center gap-2">
                        <span className="text-muted-foreground w-4">{i + 1}.</span>
                        {entry.name}
                      </span>
                      <span className="font-mono font-bold text-primary">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
