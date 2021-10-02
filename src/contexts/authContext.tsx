import { createContext, useState, useEffect } from "react";
interface userLogged {
  loggedInUser: any;
  setLoggedInUser: any;
}

const authContext = createContext({} as userLogged);

function AuthContextComponent(props: any) {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    async function fetchUser() {
      try {
        const storedUser = await localStorage.getItem("loggedInUser");

        const loggedInUser = await JSON.parse(storedUser || '""');

          setLoggedInUser({ ...loggedInUser });

      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, []);

  console.log("VALOR ATUAL DO CONTEXT =>", loggedInUser);

  return (
    <authContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </authContext.Provider>
  );
}

export { authContext, AuthContextComponent };
