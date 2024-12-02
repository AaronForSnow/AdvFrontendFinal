import { useAuth } from "react-oidc-context";
import { PlainSpinner } from "../components/PlainSpinner";
import { useIngredientContext } from "../context/useIngredientContextProvider";

export function RecipiePage() {
  const { isLoading, customer } = useIngredientContext();
  const auth = useAuth();
  if (auth.isLoading) {
    return <PlainSpinner />;
  }
  if (!auth.isAuthenticated) {
    return (
      <div className="d-flex justify-content-center">
        <p>Please Sign in to access this page</p>
      </div>
    );
  }
  if (auth.isAuthenticated) {
    return (
      <>
        <div className="d-flex justify-content-center">
          {isLoading && <PlainSpinner />}
          {!isLoading && (
            <>
              <h2>Opps, Recipie page</h2>
              <h2>{customer?.username}</h2>
              <h2>{customer?.email}</h2>
            </>
          )}
        </div>
      </>
    );
  }
}
