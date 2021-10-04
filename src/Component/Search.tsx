import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { Button } from "../Global/Button";

import { Input } from "../Global/Input";

interface foundUser {
  name?: any;
  map?: any;
}

interface user {
  data: [];
}

export const Search = () => {
  const [status, setStatus] = useState<foundUser>({});
  const [user, setUser] = useState<user[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus({
      ...status,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    async function fetchSearch() {
      try {
        const response: any = await api.post("/search", { name: status.name });

        setUser([...response.data]);
      } catch (err: any) {
        console.log(err.response);
      }
    }
    fetchSearch();
  }, [status]);

  return (
    <div>
      <div className="center fit editeSIZE">
        <Input
          autocomplete="off"
          label="Buscar perfiles"
          type="text"
          value={status.name}
          name="name"
          className="margin form-control"
          onChange={handleChange}
        />

        {user.length && status.name !== "" ? (
          <ol style={{ padding: "0em", marginTop: "0.5em" }}>
            {user.map((elem: any, i) => {
              return (
                <li className="between textDecoration marginBottom" key={i}>
                  {elem.name}
                  <Link to={ `/edite/${ elem._id }` } type="button">
                    <Button type="button" des="Detalles" />
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
