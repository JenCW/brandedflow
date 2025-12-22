import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Placeholder from "./pages/Placeholder";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services">
          <Placeholder title="Services" />
        </Route>
        <Route path="/services/foreign-national">
          <Placeholder title="Foreign National Loans" />
        </Route>
        <Route path="/services/first-time-buyer">
          <Placeholder title="First-Time Buyer" />
        </Route>
        <Route path="/services/va-loans">
          <Placeholder title="VA Loans" />
        </Route>
        <Route path="/services/refinance">
          <Placeholder title="Refinance" />
        </Route>
        <Route path="/services/cash-out-refinance">
          <Placeholder title="Cash-Out Refinance" />
        </Route>
        <Route path="/services/emergency-cash">
          <Placeholder title="Emergency Cash" />
        </Route>
        <Route path="/landing/foreign-national">
          <Placeholder title="Foreign National Landing" />
        </Route>
        <Route path="/landing/first-time-buyer">
          <Placeholder title="First-Time Buyer Landing" />
        </Route>
        <Route path="/landing/cash-out">
          <Placeholder title="Cash-Out Landing" />
        </Route>
        <Route path="/landing/refinance">
          <Placeholder title="Refinance Landing" />
        </Route>
        <Route path="/landing/emergency-cash">
          <Placeholder title="Emergency Cash Landing" />
        </Route>
        <Route path="/tools/home-valuation">
          <Placeholder title="Home Valuation" />
        </Route>
        <Route path="/locations">
          <Placeholder title="Locations" />
        </Route>
        <Route path="/locations/santa-ana">
          <Placeholder title="Santa Ana Office" />
        </Route>
        <Route path="/locations/irvine">
          <Placeholder title="Irvine Office" />
        </Route>
        <Route path="/locations/newport-beach">
          <Placeholder title="Newport Beach Office" />
        </Route>
        <Route path="/locations/anaheim">
          <Placeholder title="Anaheim Office" />
        </Route>
        <Route path="/apply">
          <Placeholder title="Apply" />
        </Route>
        <Route path="/contact">
          <Placeholder title="Contact" />
        </Route>
        <Route path="/about">
          <Placeholder title="About" />
        </Route>
        <Route path="/privacy">
          <Placeholder title="Privacy Policy" />
        </Route>
        <Route>
          <Placeholder title="404 - Page Not Found" />
        </Route>
      </Switch>
    </Layout>
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

export default App;
