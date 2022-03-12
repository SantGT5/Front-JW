import React, { useState } from "react";

import { Input } from "../Global/Input";
import { Timer } from "../Component/Timer";

interface dateUpdate {
  now: {};
}

export const Meeting = () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const [date, setDate] = useState<dateUpdate>({ now: "" });

  function display_ct6() {
    const x = new Date();
    const ampm = x.getHours() >= 12 ? " PM" : " AM";
    const hours = x.getHours();
    const x1 = +x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
    const result =
      x1 +
      " - " +
      hours +
      ":" +
      x.getMinutes() +
      ":" +
      x.getSeconds() +
      ":" +
      ampm;

    setDate({ now: result });
  }
  // setTimeout(display_ct6, 1000);

  return (
    <div>
      {date.now ? (
        <div className="date between">
          <h4>{date.now}</h4>

          <Input
            label="Responsable"
            type="text"
            value={loggedInUser.user.name}
            name=""
            className="margin form-control"
            autocomplete="off"
          />
        </div>
      ) : (
        <div className="loader"></div>
      )}

      <Timer />
    </div>
  );
};
