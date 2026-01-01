import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, Github, Globe, Tag, DollarSign, Laptop, Gamepad } from "lucide-react";
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
  title: z.string().min(2),
  creator: z.string().min(2),
  genre: z.string().min(1),
  type: z.string().min(1),
  price: z.string().min(1),
  platform: z.string().min(1),
  url: z.string().url(),
  githubUrl: z.string().url().optional().or(z.literal("")),
  description: z.string().min(10),
});

const GENRES = ["Action", "Adventure", "Puzzle", "Platformer", "RPG", "Strategy", "Rhythm", "Racing", "Shooter"];
const TYPES = ["Just for Fun", "Actual Game", "Tech Demo", "Alpha/Beta"];
const PLATFORMS = ["Web", "PC", "Mobile", "Console", "Cross-Platform"];

export default function Submit() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", creator: "", genre: "", type: "", price: "Free", platform: "Web", url: "", githubUrl: "", description: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({ title: "Demo Published!", description: "Your game demo is now live." });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-2xl bg-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-display font-bold">Creator Portal</CardTitle>
            <CardDescription>Enter all game details for the demo screen.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} className="bg-muted/50 border-white/10" /></FormControl></FormItem>
                  )} />
                  <FormField control={form.control} name="genre" render={({ field }) => (
                    <FormItem><FormLabel>Genre</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="bg-muted/50 border-white/10"><SelectValue /></SelectTrigger></FormControl><SelectContent className="bg-zinc-900 border-white/10 text-white">{GENRES.map(g => (<SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>))}</SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="type" render={({ field }) => (
                    <FormItem><FormLabel>Project Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="bg-muted/50 border-white/10"><SelectValue /></SelectTrigger></FormControl><SelectContent className="bg-zinc-900 border-white/10 text-white">{TYPES.map(t => (<SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>))}</SelectContent></Select></FormItem>
                  )} />
                  <FormField control={form.control} name="platform" render={({ field }) => (
                    <FormItem><FormLabel>Target Platform</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger className="bg-muted/50 border-white/10"><SelectValue /></SelectTrigger></FormControl><SelectContent className="bg-zinc-900 border-white/10 text-white">{PLATFORMS.map(p => (<SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>))}</SelectContent></Select></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem><FormLabel>Estimated Price (e.g. Free, $9.99)</FormLabel><FormControl><Input {...field} className="bg-muted/50 border-white/10" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem><FormLabel>Build URL</FormLabel><FormControl><Input {...field} className="bg-muted/50 border-white/10" /></FormControl></FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem><FormLabel>Full Description</FormLabel><FormControl><Textarea {...field} className="min-h-[120px] bg-muted/50 border-white/10" /></FormControl></FormItem>
                )} />
                <Button type="submit" className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-primary hover:text-white">Publish Demo</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
