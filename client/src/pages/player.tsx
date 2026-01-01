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
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

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
    setSaveStatus("Saving...");
    setTimeout(() => {
      setSaveStatus("Progress Saved!");
      toast({ description: "Game progress saved locally" });
      setTimeout(() => setSaveStatus(null), 2000);
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ description: "Link copied to clipboard!" });
  };

  if (!game) return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;

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
            <Button variant="secondary" size="icon" className="rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white">
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-card border-t border-white/5 p-4 md:h-24 flex flex-col md:flex-row items-center justify-between gap-4 z-30 relative">
          
          <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="bg-muted/50 rounded-lg p-2 aspect-square w-16 h-16 hidden md:block overflow-hidden">
                <img src={game.thumbnail} className="w-full h-full object-cover" />
             </div>
             <div>
               <h2 className="font-bold text-lg md:text-xl text-white leading-tight">{game.title}</h2>
               <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                 <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full border border-primary/20">{game.category[0]}</span>
                 <span>Demo Mode</span>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            
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

            <div className="h-8 w-px bg-white/10 hidden md:block" />

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="secondary" 
                      onClick={handleManualSave}
                      className="rounded-full bg-muted hover:bg-muted/80 flex items-center gap-2 px-4"
                    >
                      <Save className="w-4 h-4" />
                      <span className="text-xs font-bold">{saveStatus || "Save Progress"}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Save your demo progress</p></TooltipContent>
                </Tooltip>
              </TooltipProvider>

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
      </div>
    </Layout>
  );
}
