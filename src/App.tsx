import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { VersionCSettingsProvider } from "./contexts/VersionCSettings";

const Index = lazy(() => import("./pages/Index"));
const IncomePage = lazy(() => import("./pages/IncomePage"));
const ExpensesPage = lazy(() => import("./pages/ExpensesPage"));
const InsurancePage = lazy(() => import("./pages/InsurancePage"));
const AssetsPage = lazy(() => import("./pages/AssetsPage"));
const LiabilitiesPage = lazy(() => import("./pages/LiabilitiesPage"));
const IndexB = lazy(() => import("./pages/IndexB"));
const IndexC = lazy(() => import("./pages/IndexC"));
const IndexD = lazy(() => import("./pages/IndexD"));
const InsurancePageC = lazy(() => import("./pages/InsurancePageC"));
const AssetsPageC = lazy(() => import("./pages/AssetsPageC"));
const LiabilitiesPageC = lazy(() => import("./pages/LiabilitiesPageC"));
const InsurancePageD = lazy(() => import("./pages/InsurancePageD"));
const AssetsPageD = lazy(() => import("./pages/AssetsPageD"));
const LiabilitiesPageD = lazy(() => import("./pages/LiabilitiesPageD"));
const Signup = lazy(() => import("./pages/Signup"));
const AhaDashboard = lazy(() => import("./pages/AhaDashboard"));
const AhaDashboard2 = lazy(() => import("./pages/AhaDashboard2"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <VersionCSettingsProvider>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/b" element={<IndexB />} />
              <Route path="/c" element={<IndexC />} />
              <Route path="/d" element={<IndexD />} />
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
              <Route path="/signup" element={<Signup />} />
              <Route path="/aha" element={<AhaDashboard />} />
              <Route path="/aha2" element={<AhaDashboard2 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </VersionCSettingsProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
