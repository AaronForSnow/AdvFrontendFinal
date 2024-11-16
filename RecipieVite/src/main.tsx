import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./Styles/custom.scss";
import "bootstrap";
import App from "./App.tsx";
import { IngredientContextProvider } from "./context/IngredientContextProvider.tsx";
import { LogIn } from "./components/Authentication/LogIn.tsx";

const oidcConfig = {
  authority: "<your authority>",
  client_id: "<your client id>",
  redirect_uri: "<your redirect uri>",
  // ...
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <IngredientContextProvider>
        <LogIn />
        <App />
      </IngredientContextProvider>
    </AuthProvider>
  </StrictMode>
);


