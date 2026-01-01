import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Layout } from "@/components/layout";
import { MOCK_GAMES, getRandomGame, Game } from "@/lib/games";
import { Button } from "@/components/ui/button";
import { isGameSaved, saveGame, removeGame } from "@/lib/storage";
import { 
  Heart, Share2, SkipForward, ThumbsUp, ThumbsDown, Maximize2,
  AlertCircle, Play, Eye, Calendar, Laptop, DollarSign, MessageSquare,
  TrendingUp, Award, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Player() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [game, setGame] = useState<Game | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [commentFilter, setCommentFilter] = useState("latest");
  const [newComment, setNewComment] = useState("");
  
  // Mock metrics
  const [metrics] = useState({
    views: 12450, likes: 842, dislikes: 12, postedDate: "Oct 24, 2025",
    type: "Actual Game", platform: "Web", price: "Free"
  });

  const [comments, setComments] = useState([
    { id: 1, user: "Gamer99", text: "This is amazing! Love the neon vibe.", likes: 24, date: "2h ago" },
    { id: 2, user: "PixelDev", text: "Great mechanics for a demo.", likes: 56, date: "1d ago" },
    { id: 3, user: "NoobMaster", text: "A bit hard but fun.", likes: 5, date: "5m ago" },
  ]);

  const sortedComments = [...comments].sort((a, b) => 
    commentFilter === "likes" ? b.likes - a.likes : 0
  );

  useEffect(() => {
    if (id) {
      const found = MOCK_GAMES.find(g => g.id === id);
      if (found) { 
        setGame(found); 
        setIsSaved(isGameSaved(found.id)); 
        setIsPlaying(false); 
      } else { 
        setLocation(`/play/${getRandomGame().id}`); 
      }
    }
  }, [id, setLocation]);

  const handleNext = () => game && setLocation(`/play/${getRandomGame(game.id).id}`);
  
  const handleToggleSave = () => {
    if (!game) return;
    if (isSaved) { 
      removeGame(game.id); 
      setIsSaved(false); 
      toast({ description: "Removed from library" });
    } else { 
      saveGame(game.id); 
      setIsSaved(true); 
      toast({ description: "Saved to Wishlist", className: "bg-primary text-white" }); 
    }
  };

  const handlePostComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      user: "You",
      text: newComment,
      likes: 0,
      date: "Just now"
    };
    setComments([comment, ...comments]);
    setNewComment("");
    toast({ description: "Comment posted!" });
  };

  if (!game) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-display">LOADING SYSTEM...</div>;

  return (
    <Layout>
      <div className="flex flex-col">
        {/* Game Area - Forced Playable Height */}
        <div className="h-[60vh] md:h-[75vh] min-h-[400px] bg-black relative flex items-center justify-center overflow-hidden border-b border-white/5">
          {isPlaying ? (
            <iframe 
              src={game.url} 
              className="w-full h-full absolute inset-0 z-10" 
              allow="autoplay; fullscreen; gamepad" 
              title={game.title}
            />
          ) : (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
               <img src={game.thumbnail} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-sm" alt="Thumbnail" />
               <div className="relative z-30 text-center animate-in zoom-in duration-500">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-6 font-display uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                   {game.title}
                 </h1>
                 <Button 
                   size="lg" 
                   onClick={() => setIsPlaying(true)} 
                   className="h-20 px-16 text-2xl font-bold rounded-full bg-white text-black hover:bg-primary hover:text-white transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                 >
                   <Play className="w-8 h-8 mr-4 fill-current" /> PLAY DEMO
                 </Button>
               </div>
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-40 flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={() => document.querySelector('iframe')?.requestFullscreen()} 
              disabled={!isPlaying} 
              className="rounded-full bg-black/50 border border-white/10 text-white hover:bg-primary transition-colors disabled:opacity-30"
            >
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Info Bar */}
        <div className="bg-card/50 backdrop-blur-md border-b border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-16 z-30">
          <div className="flex items-center gap-4">
             <div className="bg-muted/50 rounded-lg w-14 h-14 overflow-hidden border border-white/10">
               <img src={game.thumbnail} className="w-full h-full object-cover" alt="Small Thumb" />
             </div>
             <div>
               <h2 className="font-bold text-xl text-white leading-tight font-display uppercase tracking-tight">{game.title}</h2>
               <div className="flex items-center gap-3 text-[10px] text-muted-foreground mt-1 uppercase font-black tracking-widest">
                 <span className="bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">
                   {game.id === 'clicker' || game.id === 'jump' ? 'Just for Fun' : 'Actual Game'}
                 </span>
                 <span className="flex items-center gap-1"><Laptop className="w-3 h-3" /> {metrics.platform}</span>
                 <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {metrics.price}</span>
               </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-4 hidden md:flex">
               <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground mb-1">
                 <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {metrics.views.toLocaleString()}</span>
                 <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {metrics.postedDate}</span>
               </div>
               <div className="flex items-center gap-1 bg-muted/20 p-1 rounded-full border border-white/5">
                 <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-green-500"><ThumbsUp className="w-4 h-4" /></Button>
                 <div className="w-px h-4 bg-white/10" />
                 <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-500"><ThumbsDown className="w-4 h-4" /></Button>
               </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" onClick={handleToggleSave} className={`rounded-full ${isSaved ? 'bg-primary text-white' : 'bg-muted'}`}>
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
              <Button onClick={handleNext} className="rounded-full bg-white text-black hover:bg-primary hover:text-white font-bold px-8 h-12 shadow-lg shadow-white/5 transition-all">
                NEXT DEMO <SkipForward className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Game Stats Section */}
            <Card className="bg-card/20 border-white/5 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary to-transparent" />
              <CardHeader><CardTitle className="text-xl font-display">Developer Field Report</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                   <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                     <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">Genre</p>
                     <p className="text-sm font-bold text-white uppercase">{game.category[0]}</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                     <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">Type</p>
                     <p className="text-sm font-bold text-white uppercase">{metrics.type}</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                     <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">Platform</p>
                     <p className="text-sm font-bold text-white uppercase">{metrics.platform}</p>
                   </div>
                   <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                     <p className="text-[10px] text-muted-foreground font-bold mb-1 uppercase">Dev Price</p>
                     <p className="text-sm font-bold text-white uppercase">{metrics.price}</p>
                   </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{game.description}</p>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-display font-bold flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-primary" /> 
                  Feedback Hub
                </h3>
                <div className="flex gap-2 p-1 bg-muted/20 rounded-full border border-white/5">
                  <Button 
                    variant={commentFilter === "latest" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="rounded-full text-[10px] font-bold px-4"
                    onClick={() => setCommentFilter("latest")}
                  >
                    LATEST
                  </Button>
                  <Button 
                    variant={commentFilter === "likes" ? "secondary" : "ghost"} 
                    size="sm" 
                    className="rounded-full text-[10px] font-bold px-4"
                    onClick={() => setCommentFilter("likes")}
                  >
                    TOP
                  </Button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 items-end">
                <div className="flex-1 space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground ml-1">YOUR REVIEW</Label>
                  <Input 
                    placeholder="Share your thoughts on the demo..." 
                    className="bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-white/20 p-0 h-auto text-lg"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handlePostComment}
                  size="icon" 
                  className="rounded-full bg-primary hover:bg-primary/80 transition-all shrink-0 h-10 w-10"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {sortedComments.map(c => (
                  <div key={c.id} className="p-6 bg-card/40 rounded-2xl border border-white/5 group hover:border-primary/20 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-xs text-primary">
                          {c.user[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{c.user}</p>
                          <p className="text-[10px] text-muted-foreground font-bold">{c.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground bg-muted/30 px-2 py-1 rounded-full group-hover:text-primary transition-colors">
                        <ThumbsUp className="w-3 h-3" /> {c.likes}
                      </div>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Weekly Rankings */}
            <Card className="bg-card/30 border-white/5 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-display flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" /> 
                  Weekly Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="likes" className="w-full">
                  <TabsList className="grid grid-cols-2 bg-black/40 h-8 p-1 rounded-full mb-6">
                    <TabsTrigger value="likes" className="text-[10px] font-bold rounded-full">WEEKLY LIKES</TabsTrigger>
                    <TabsTrigger value="overall" className="text-[10px] font-bold rounded-full">OVERALL</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="likes" className="space-y-1 animate-in fade-in slide-in-from-right-2">
                    {[
                      { name: game.title, score: "842 LIKES", active: true },
                      { name: "Cyber Racer", score: "712 LIKES" },
                      { name: "Neon Jump", score: "590 LIKES" }
                    ].map((entry, i) => (
                      <div key={i} className={`flex justify-between items-center p-3 rounded-xl transition-all ${entry.active ? 'bg-primary/20 border border-primary/20' : 'hover:bg-white/5'}`}>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${entry.active ? 'text-primary' : 'text-muted-foreground'} w-4`}>{i + 1}.</span>
                          <span className="text-sm font-bold text-white/90">{entry.name}</span>
                        </div>
                        <span className={`text-[10px] font-mono font-bold ${entry.active ? 'text-primary' : 'text-muted-foreground'}`}>{entry.score}</span>
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="overall" className="space-y-1 animate-in fade-in slide-in-from-left-2">
                    {[
                      { name: "Neon Clicker", score: "98% POSITIVE" },
                      { name: "Cyber Jump", score: "94% POSITIVE" },
                      { name: "Void Runner", score: "92% POSITIVE" }
                    ].map((entry, i) => (
                      <div key={i} className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-muted-foreground w-4">{i + 1}.</span>
                          <span className="text-sm font-bold text-white/90">{entry.name}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-green-500">{entry.score}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Distinguished Users */}
            <Card className="bg-card/30 border-white/5 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-display flex items-center gap-3">
                  <Award className="w-5 h-5 text-yellow-500" /> 
                  Hall of Fame
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Top Creators</h4>
                  <div className="space-y-3">
                    {[
                      { name: "PixelMaster", badge: "Elite Creator", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                      { name: "CyberSoft", badge: "Gold Studio", color: "text-primary", bg: "bg-primary/10" },
                      { name: game.creator, badge: "Rising Star", color: "text-secondary", bg: "bg-secondary/10" }
                    ].map((user, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white/80">{user.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase border border-current/20 ${user.color} ${user.bg}`}>
                          {user.badge}
                        </span>
                      </div>
                    ))}
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
