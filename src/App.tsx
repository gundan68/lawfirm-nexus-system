
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/Users";
import CasesPage from "./pages/Cases";
import ClientsPage from "./pages/Clients";
import DocumentsPage from "./pages/Documents";
import FeesPage from "./pages/Fees";
import TimePage from "./pages/Time";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/users" element={<MainLayout><UsersPage /></MainLayout>} />
          <Route path="/cases" element={<MainLayout><CasesPage /></MainLayout>} />
          <Route path="/clients" element={<MainLayout><ClientsPage /></MainLayout>} />
          <Route path="/documents" element={<MainLayout><DocumentsPage /></MainLayout>} />
          <Route path="/fees" element={<MainLayout><FeesPage /></MainLayout>} />
          <Route path="/time" element={<MainLayout><TimePage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
