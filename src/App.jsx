import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const Main = React.lazy(() => import("./Global/Main"));
import ErrorBoundary from "./ErrorBoundary";
import WhatsAppButton from "./Components/WhatsappFloatingBtn";
import { CityProvider } from "./Context/SelectedCity";
import Loading from "./Components/Loading";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 80000,
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        {" "}
        <CityProvider>
          <Suspense fallback={<Loading />}> 
            <Main />
          </Suspense>
        </CityProvider>
        <WhatsAppButton />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
