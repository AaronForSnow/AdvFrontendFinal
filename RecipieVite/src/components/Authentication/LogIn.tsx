import { useAuth } from "react-oidc-context";
import { PlainSpinner } from "../PlainSpinner";


export function LogIn() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <PlainSpinner/>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
        <button onClick={() => void auth.removeUser()} className="btn btn-secondary text-light MyLink"> Log out</button>
    );
  }
  if (!auth.isAuthenticated){
    return (
      <button onClick={() => void auth.signinRedirect()} className="btn btn-secondary text-light MyLink">Log in</button>
    );
  }
}
