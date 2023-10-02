import React from "react";
import { Toaster } from "react-hot-toast";
import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
 import { ReactQueryDevtools } from 'react-query/devtools'
import "./index.css";
import ModalToggleContextProvider from "./context/ConfirmationModal.context.jsx";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 10000 }}
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <ModalToggleContextProvider>
          <App />
        </ModalToggleContextProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-left"/>
    </QueryClientProvider>
    <Toaster />
    </HashRouter>
  </React.StrictMode>
);
