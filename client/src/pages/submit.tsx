import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, CheckCircle2 } from "lucide-react";
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

const formSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters."),
  creator: z.string().min(2, "Creator name must be at least 2 characters."),
  url: z.string().url("Please enter a valid URL."),
  description: z.string().min(10, "Description must be at least 10 characters."),
});

export default function Submit() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      creator: "",
      url: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would send to backend
    console.log(values);
    toast({
      title: "Game Submitted!",
      description: "Thanks for submitting. Your game is now in the review queue.",
      className: "bg-green-600 text-white border-none",
    });
    form.reset();
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <Card className="w-full max-w-2xl bg-card border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
          
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl font-display font-bold">Submit a Game</CardTitle>
            <CardDescription>
              Are you a developer? Share your creation with the world.
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
                        <FormLabel>Game Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Neon Racer" {...field} className="bg-muted/50 border-white/10 focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="creator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Creator Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Studio X" {...field} className="bg-muted/50 border-white/10 focus:border-primary/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Game URL (Embeddable)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://itch.io/embed/..." {...field} className="bg-muted/50 border-white/10 focus:border-primary/50" />
                      </FormControl>
                      <FormDescription>Must be a direct link to the HTML5 game or embed URL.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about the gameplay..." 
                          className="min-h-[120px] bg-muted/50 border-white/10 focus:border-primary/50" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-primary hover:text-white transition-all">
                  Submit Game
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
