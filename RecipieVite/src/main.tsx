import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "react-oidc-context";
import "./Styles/custom.scss";
import "bootstrap";
import App from "./App.tsx";
import { IngredientContextProvider } from "./context/IngredientContextProvider.tsx";

const oidcConfig = {
  authority: "https://auth.snowse.duckdns.org/realms/advanced-frontend/",
  client_id: "aaron-final",
  redirect_uri: import.meta.env.VITE_REDIRECT_URL,
  onSigninCallback: (user)=> {
    console.log(user)
    window.history.replaceState({}, document.title, window.location.pathname)
  },
  // ...
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider {...oidcConfig}>
      <IngredientContextProvider>
        <App />
      </IngredientContextProvider>
    </AuthProvider>
  </StrictMode>
);


