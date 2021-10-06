import React, { useState } from "react";

import { Timer } from "../Component/Timer";

interface dateUpdate {
  now: "" | {};
}

export const Meeting = () => {
  const [date, setDate] = useState<dateUpdate>({ now: "" });

  function display_ct6() {
    const x = new Date();
    const ampm = x.getHours() >= 12 ? " PM" : " AM";
    const hours = x.getHours() % 12;
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
  setTimeout(display_ct6, 1000);

  return (
    <div>
      {date.now ? (
        <h4 className="date">{date.now}</h4>
      ) : (
        <div className="loader"></div>
      )}

<Timer/>
    </div>
  );
};
