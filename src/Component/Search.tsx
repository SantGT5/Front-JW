import React, { useEffect, useState } from "react";
import api from "../api/api";

import { Input } from "../Global/Input";

interface foundUser {
  name?: any;
  map?: any;
}

export const Search = () => {
  const [status, setStatus] = useState<foundUser>([]);

  console.log("status search -> ", status);

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

        setStatus({ ...response.data });
      } catch (err: any) {
        console.log(err.response);
      }
    }
    fetchSearch();
  }, [status.name]);

  return (
    <div>
      <Input
        label="Buscar"
        type="text"
        value={status.name}
        name="name"
        className="margin form-control"
        onChange={handleChange}
      />
      <ol>
        {status.map((elem: any) => {

            <li>{elem.name}</li>

        })}
      </ol>
    </div>
  );
};
