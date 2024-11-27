import { useIngredientContext } from "../context/useIngredientContextProvider"

export function HomePage () {
    const {successToast } = useIngredientContext();
    return (
        <>
            <div>this is the HomePage</div>
            <button onClick={() => successToast("this is visible!!!!")}> make toast</button>
        </>
    )
}