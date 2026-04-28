import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IncomePage from "./pages/IncomePage";
import ExpensesPage from "./pages/ExpensesPage";
import InsurancePage from "./pages/InsurancePage";
import AssetsPage from "./pages/AssetsPage";
import LiabilitiesPage from "./pages/LiabilitiesPage";
import IndexB from "./pages/IndexB";
import IndexC from "./pages/IndexC";
import InsurancePageC from "./pages/InsurancePageC";
import AssetsPageC from "./pages/AssetsPageC";
import LiabilitiesPageC from "./pages/LiabilitiesPageC";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/b" element={<IndexB />} />
          <Route path="/c" element={<IndexC />} />
          <Route path="/income" element={<IncomePage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/assets" element={<AssetsPage />} />
          <Route path="/liabilities" element={<LiabilitiesPage />} />
          <Route path="/c/insurance" element={<InsurancePageC />} />
          <Route path="/c/assets" element={<AssetsPageC />} />
          <Route path="/c/liabilities" element={<LiabilitiesPageC />} />
          <Route path="/c/income" element={<IncomePage />} />
          <Route path="/c/expenses" element={<ExpensesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
