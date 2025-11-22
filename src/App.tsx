import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import Index from "./pages/Index";
import Events from "./pages/Events";
import MuseTV from "./pages/MuseTV";
import NotFound from "./pages/NotFound";

const Admin = lazy(() => import("./pages/Admin"));
const TestForms = lazy(() => import("./pages/TestForms"));
const Terms = lazy(() => import("./pages/Terms"));
const WebhookSetup = lazy(() => import("./pages/WebhookSetup"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<div style={{background: '#000', minHeight: '100vh'}} />}>
          <Routes>
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
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;