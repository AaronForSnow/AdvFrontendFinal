import { useAuth } from "react-oidc-context";
import { PlainSpinner } from "../components/PlainSpinner";
import { useIngredientContext } from "../context/useIngredientContextProvider";
import SingleRecipie from "../components/Recipie";
import { Recipie } from "../Data/Recipie";
import { GoTo } from "../components/NavBar";

export function RecipiePage() {
  const { isLoading, recipies } = useIngredientContext();
  const auth = useAuth();
  return (
    <>
        {auth.isAuthenticated && <div className="mx-5 "><div className="m-2 mx-5"><GoTo locString="addRecipie"></GoTo></div></div>}
      <div className="d-flex justify-content-center flex-wrap m-2">
        {isLoading && <PlainSpinner />}
        {!(recipies.length > 0) && (
          <h1>There doesn't seem to be any recipies</h1>
        )}
        {!isLoading && (
          <>
            {recipies.map((recipie: Recipie) => {
              return (
                <div key={recipie.id}>
                  <SingleRecipie recipie={recipie} />
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}
