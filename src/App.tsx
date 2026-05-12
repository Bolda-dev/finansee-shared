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
import IndexD from "./pages/IndexD";
import IndexManual from "./pages/IndexManual";
import AssetsPageManual from "./pages/AssetsPageManual";
import LiabilitiesPageManual from "./pages/LiabilitiesPageManual";
import InsurancePageManual from "./pages/InsurancePageManual";
import PalettesPage from "./pages/PalettesPage";
import InsurancePageC from "./pages/InsurancePageC";
import AssetsPageC from "./pages/AssetsPageC";
import LiabilitiesPageC from "./pages/LiabilitiesPageC";
import InsurancePageD from "./pages/InsurancePageD";
import AssetsPageD from "./pages/AssetsPageD";
import LiabilitiesPageD from "./pages/LiabilitiesPageD";
import IndexLife from "./pages/IndexLife";
import AssetsPageLife from "./pages/AssetsPageLife";
import LiabilitiesPageLife from "./pages/LiabilitiesPageLife";
import InsurancePageLife from "./pages/InsurancePageLife";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { VersionCSettingsProvider } from "./contexts/VersionCSettings";
import { ManualPaletteProvider } from "./contexts/ManualPaletteContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VersionCSettingsProvider>
          <ManualPaletteProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/b" element={<IndexB />} />
              <Route path="/c" element={<IndexC />} />
              <Route path="/d" element={<IndexD />} />
              <Route path="/manual" element={<IndexManual />} />
              <Route path="/manual/assets" element={<AssetsPageManual />} />
              <Route path="/manual/liabilities" element={<LiabilitiesPageManual />} />
              <Route path="/manual/insurance" element={<InsurancePageManual />} />
              <Route path="/palettes" element={<PalettesPage />} />
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
              <Route path="/d/insurance" element={<InsurancePageD />} />
              <Route path="/d/assets" element={<AssetsPageD />} />
              <Route path="/d/liabilities" element={<LiabilitiesPageD />} />
              <Route path="/d/income" element={<IncomePage />} />
              <Route path="/d/expenses" element={<ExpensesPage />} />
              <Route path="/life" element={<IndexLife />} />
              <Route path="/life/assets" element={<AssetsPageLife />} />
              <Route path="/life/liabilities" element={<LiabilitiesPageLife />} />
              <Route path="/life/insurance" element={<InsurancePageLife />} />
              <Route path="/life/income" element={<IncomePage />} />
              <Route path="/life/expenses" element={<ExpensesPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ManualPaletteProvider>
        </VersionCSettingsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
