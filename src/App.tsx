import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { VersionCSettingsProvider } from "./contexts/VersionCSettings";

const IndexC = lazy(() => import("./pages/IndexC"));
const InsurancePageC = lazy(() => import("./pages/InsurancePageC"));
const AssetsPageC = lazy(() => import("./pages/AssetsPageC"));
const PensionCategoryPage = lazy(() => import("./pages/PensionCategoryPage"));
const PensionProductPage = lazy(() => import("./pages/PensionProductPage"));
const LiabilitiesPageC = lazy(() => import("./pages/LiabilitiesPageC"));
const MortgageInvestmentPage = lazy(() => import("./pages/MortgageInvestmentPage"));
const Signup = lazy(() => import("./pages/Signup"));
const Signup2 = lazy(() => import("./pages/Signup2"));
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
              <Route path="/" element={<IndexC />} />
              <Route path="/insurance" element={<InsurancePageC />} />
              <Route path="/assets" element={<AssetsPageC />} />
              <Route path="/assets/pension" element={<PensionCategoryPage />} />
              <Route path="/assets/pension/:id" element={<PensionProductPage />} />
              <Route path="/liabilities" element={<LiabilitiesPageC />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signup2" element={<Signup2 />} />
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
