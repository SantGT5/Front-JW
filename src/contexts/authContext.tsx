import { createContext, useState, useEffect } from "react";

interface userLogged{
  loggedInUser: any,
  setLoggedInUser: any
}

const authContext = createContext({} as userLogged);

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = useState({ user: {}, token: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const loggedInUser = JSON.parse(storedUser || '""');

    if (loggedInUser.user) {
      setLoggedInUser({ ...loggedInUser });
    }
  }, []);

  console.log("VALOR ATUAL DO CONTEXT =>", loggedInUser);

  return (
    <authContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthContextComponent };
