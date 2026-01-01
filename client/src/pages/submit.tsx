import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, Github, Globe, Save, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  creator: z.string().min(2, "Creator name must be at least 2 characters."),
  genre: z.string().min(1, "Please select a genre."),
  url: z.string().url("Please enter a valid URL."),
  githubUrl: z.string().url("Please enter a valid GitHub URL.").optional().or(z.literal("")),
  description: z.string().min(10, "Please provide a detailed description of your game."),
});

const GENRES = ["Action", "Adventure", "Puzzle", "Platformer", "RPG", "Strategy", "Rhythm", "Racing", "Shooter"];

export default function Submit() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      creator: "",
      genre: "",
      url: "",
      githubUrl: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Demo Published!",
      description: "Your game demo is now live for testing.",
      className: "bg-primary text-white border-none",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-2xl bg-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 border border-primary/20">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display font-bold">Creator Demo Portal</CardTitle>
            <CardDescription>
              Submit your game demo and let players test your creation.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Demo Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Cyber Quest" {...field} className="bg-muted/50 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Game Genre</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-muted/50 border-white/10">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10 text-white">
                            {GENRES.map(genre => (
                              <SelectItem key={genre} value={genre.toLowerCase()}>{genre}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="creator"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Developer / Studio Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Indie Studio" {...field} className="bg-muted/50 border-white/10" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="w-4 h-4" /> Build URL
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} className="bg-muted/50 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="githubUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Github className="w-4 h-4" /> GitHub Repository (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://github.com/..." {...field} className="bg-muted/50 border-white/10" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Write exactly what your game is about, the mechanics, and what players should look for in this demo..." 
                          className="min-h-[150px] bg-muted/50 border-white/10" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>Explain the core loop and demo scope.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-primary hover:text-white transition-all">
                  Launch Demo
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
