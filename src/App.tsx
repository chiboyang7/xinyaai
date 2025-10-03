import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminSetup from "./pages/AdminSetup";
import NotFound from "./pages/NotFound";
import Jobs from "./pages/Jobs";
import Projects from "./pages/Projects";
import EricaModel from "./pages/EricaModel";
import TestYoung from "./pages/TestYoung";
import TestAdult from "./pages/TestAdult";
import Auth from "./pages/Auth";
import Case from "./pages/Case";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/erica_model" element={<EricaModel />} />
          <Route path="/erica_model/test_young" element={<TestYoung />} />
          <Route path="/erica_model/test_adult" element={<TestAdult />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/case" element={<Case />} />
          <Route path="/admin-setup" element={<AdminSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
