import { ArrowBackIosRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { Input } from "../Global/Input";

interface dateUpdate {
  now: "" | {};
}

interface inputArr {
  name: string;
  timer: number;
}

export const Meeting = () => {
  const [date, setDate] = useState<dateUpdate>({ now: "" });

  const [arr, setArr] = useState<inputArr[] | any>([]);

  console.log(arr);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArr({ ...arr, [event.currentTarget.name]: event.currentTarget.value });
  };

  return (
    <div>
      {date.now ? (
        <h4 className="date">{date.now}</h4>
      ) : (
        <div className="loader"></div>
      )}
      <h4 className="date">test</h4>

      <Input
        label="name"
        type="text"
        value={arr.name}
        name="name"
        className="margin form-control"
        autocomplete="off"
        onChange={handleChange}
      />
      <Input
        label="Tiempo"
        type="number"
        value={arr.timer}
        name="timer"
        className="margin form-control"
        autocomplete="off"
        onChange={handleChange}
      />
    </div>
  );
};
