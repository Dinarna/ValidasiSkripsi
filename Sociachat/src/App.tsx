import { Toaster } from "@/components/ui/toaster";

import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FormProvider } from "./hooks/createProject/projectContext";
import Spinner from "./components/spinner";
import { AuthProvider } from "./hooks/AuthContext";
import { AnalysisProvider } from "./hooks/AnalysisContext";
import BaseRoute from "./routes";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <AnalysisProvider>
          <Suspense fallback={<Spinner />}>
            <Router>
              <BaseRoute />
              <Toaster />
            </Router>
          </Suspense>
        </AnalysisProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
