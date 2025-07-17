
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import PhotoJournal from "./pages/PhotoJournal";
import IphoneSketches from "./pages/IphoneSketches";
import Sketches from "./pages/Sketches";
import Photos from "./pages/Photos";
import Paintings from "./pages/Paintings";
import WorldMap from "./pages/WorldMap";
import Writings from "./pages/Writings";
import NotFound from "./pages/NotFound";
import YouTubeShorts from "./pages/YouTubeShorts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <HelmetProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/photo-journal" element={<PhotoJournal />} />
            <Route path="/iphone-sketches" element={<IphoneSketches />} />
            <Route path="/sketches" element={<Sketches />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/paintings" element={<Paintings />} />
            <Route path="/world-map" element={<WorldMap />} />
            <Route path="/writings" element={<Writings />} />
            <Route path="/writings/:postId" element={<Writings />} />
            <Route path="/youtube-shorts-article" element={<YouTubeShorts />} />
            <Route path="/youtube-shorts" element={<YouTubeShorts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
