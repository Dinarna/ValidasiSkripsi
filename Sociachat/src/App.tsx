import { Toaster } from "@/components/ui/toaster";

import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FormProvider } from "./hooks/createProject/projectContext";
import Spinner from "./components/spinner";
import { AuthProvider } from "./hooks/AuthContext";
import { AnalysisProvider } from "./hooks/AnalysisContext";
import BaseRoute from "./routes";
import { FormKuesionerProvider } from "./hooks/kuesionerContext";

function App() {
  return (
    <AuthProvider>
      <FormProvider>
        <AnalysisProvider>
          <FormKuesionerProvider>
            <Suspense fallback={<Spinner />}>
              <Router>
                <BaseRoute />
                <Toaster />
              </Router>
            </Suspense>
          </FormKuesionerProvider>
        </AnalysisProvider>
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
