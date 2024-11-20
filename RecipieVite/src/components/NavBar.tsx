import { useNavigate } from "react-router-dom";
 

 export function NavBar () {
    return (
        <>
           <GoTo locString="Ingredients"/>
           <GoTo locString=""/>
        </>
    )
}

export const GoTo = ({
    locString
  }: {
    locString: string;
  }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
      navigate("/" + locString.replace(/ /g, ""));
    };
    return (
      <button className="btn btn-primary" onClick={() => handleRedirect()}>
        {locString ? locString : "Home page"}
      </button>
    );
  };