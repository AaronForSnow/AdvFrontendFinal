import { PlainSpinner } from "../components/PlainSpinner";
import { useIngredientContext } from "../context/useIngredientContextProvider";

export function NoPage () {
    const { isLoading } = useIngredientContext();
    return (
        <>
        <div className="d-flex justify-content-center">
                {isLoading && <PlainSpinner />}
                {!isLoading && (
                  <h2>Opps, There doesn't seem to be anything at this page</h2>
                )}
              </div>
        </>
    )
}