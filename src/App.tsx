import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import Events from "./pages/Events";
import MuseTV from "./pages/MuseTV";
import TestForms from "./pages/TestForms";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";
import WebhookSetup from "./pages/WebhookSetup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/events" element={<Events />} />
        <Route path="/muse-tv" element={<MuseTV />} />
        <Route path="/test-forms" element={<TestForms />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/webhook-setup" element={<WebhookSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;