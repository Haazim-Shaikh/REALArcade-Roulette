import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Player from "@/pages/player";
import Library from "@/pages/library";
import Submit from "@/pages/submit";
import Recommend from "@/pages/recommend";
import Community from "@/pages/community";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/play/:id" component={Player} />
      <Route path="/library" component={Library} />
      <Route path="/submit" component={Submit} />
      <Route path="/recommend" component={Recommend} />
      <Route path="/community" component={Community} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function WrappedApp() {
  return <App />;
}
