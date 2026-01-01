import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, MessageSquare, Reply, Image as ImageIcon, Video, 
  Heart, Share2, Plus, BarChart3, MoreHorizontal, UserPlus 
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Community() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("feed");

  const mockCreators = [
    { id: 1, name: "PixelWiz", followers: "12.4K", avatar: "P", status: "Online" },
    { id: 2, name: "CyberNode", followers: "8.2K", avatar: "C", status: "In Engine" },
    { id: 3, name: "RetroGamer", followers: "5.1K", avatar: "R", status: "Modeling" },
  ];

  const handleFollow = (name: string) => {
    toast({ title: `Followed ${name}`, description: "You'll see their posts in your feed." });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-display">Creators to Follow</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCreators.map((creator) => (
                  <div key={creator.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-white/10 group-hover:border-primary transition-colors">
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">{creator.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-white">{creator.name}</p>
                        <p className="text-[10px] text-muted-foreground">{creator.followers} followers</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleFollow(creator.name)} className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <UserPlus className="h-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card className="bg-card/50 border-white/5 p-4">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-muted">ME</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Input placeholder="What are you building?" className="bg-white/5 border-none focus-visible:ring-1 focus-visible:ring-primary/50" />
                  <div className="flex items-center justify-between border-t border-white/5 pt-3">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="text-xs gap-2 text-muted-foreground hover:text-primary"><ImageIcon className="h-4 w-4" /> Image</Button>
                      <Button variant="ghost" size="sm" className="text-xs gap-2 text-muted-foreground hover:text-primary"><Video className="h-4 w-4" /> Video</Button>
                      <Button variant="ghost" size="sm" className="text-xs gap-2 text-muted-foreground hover:text-primary"><BarChart3 className="h-4 w-4" /> Poll</Button>
                    </div>
                    <Button size="sm" className="px-6 rounded-full font-bold">POST</Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Feed Items */}
            <div className="space-y-6">
              {/* Poll Example */}
              <Card className="bg-card/50 border-white/5">
                <CardHeader className="flex flex-row items-center gap-3 pb-4">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary">PW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold">PixelWiz <span className="text-[10px] text-primary/60 ml-2">POLL</span></p>
                    <p className="text-[10px] text-muted-foreground">2 hours ago</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">Which art style should I use for my next rogue-like?</p>
                  <div className="space-y-2">
                    {[
                      { option: "Cyberpunk Pixel Art", votes: "45%" },
                      { option: "Hand-drawn Ghibli", votes: "30%" },
                      { option: "Minimalist Vector", votes: "25%" }
                    ].map((opt, i) => (
                      <Button key={i} variant="outline" className="w-full justify-between bg-white/5 border-white/10 hover:border-primary/50">
                        <span>{opt.option}</span>
                        <span className="text-[10px] font-mono text-primary">{opt.votes}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 pt-2 text-muted-foreground">
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"><Heart className="h-4 w-4" /> 234</button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"><MessageSquare className="h-4 w-4" /> 45</button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors ml-auto"><Share2 className="h-4 w-4" /></button>
                  </div>
                </CardContent>
              </Card>

              {/* Media Post Example */}
              <Card className="bg-card/50 border-white/5 overflow-hidden">
                <CardHeader className="flex flex-row items-center gap-3 pb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-secondary/20 text-secondary">CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-bold">CyberNode</p>
                    <p className="text-[10px] text-muted-foreground">5 hours ago</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-0">
                  <p className="px-6 text-sm">Testing the new volumetric lighting in the tech demo. Thoughts?</p>
                  <div className="aspect-video bg-muted relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs font-bold text-white uppercase tracking-widest">Click to Play Demo</p>
                    </div>
                    <img src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1000" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex items-center gap-6 p-6 pt-0 text-muted-foreground">
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"><Heart className="h-4 w-4 fill-primary text-primary" /> 1.2K</button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors"><MessageSquare className="h-4 w-4" /> 89</button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-primary transition-colors ml-auto"><Share2 className="h-4 w-4" /></button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-6">
            <Card className="bg-card/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-display">Live Feedback</CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-tighter">Real-time tester activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { user: "TesterA", action: "voted on PixelWiz poll", time: "2m" },
                  { user: "DevX", action: "posted a new tech demo", time: "15m" },
                  { user: "Player1", action: "reached Wave 50 in Neon Jump", time: "22m" }
                ].map((act, i) => (
                  <div key={i} className="text-xs border-l border-primary/20 pl-3 py-1">
                    <p><span className="font-bold text-primary">{act.user}</span> {act.action}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{act.time} ago</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
