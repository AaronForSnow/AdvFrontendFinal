import { useAuth } from "react-oidc-context";


export function LogIn() {
  const auth = useAuth();

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        Hello {auth.user?.profile.sub}{" "}
        <button onClick={() => void auth.removeUser()} className="btn btn-secondary text-light MyLink">Log out</button>
      </div>
    );
  }
  if (!auth.isAuthenticated){
    return <button onClick={() => void auth.signinRedirect()} className="btn btn-secondary text-light MyLink">Log in</button>;
  }
}
