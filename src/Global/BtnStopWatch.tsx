import React from "react";

interface props {
  status: number;
  start?: React.MouseEventHandler<HTMLButtonElement>;
  stop?: React.MouseEventHandler<HTMLButtonElement>;
  reset?: React.MouseEventHandler<HTMLButtonElement>;
  resume?: React.MouseEventHandler<HTMLButtonElement>;
}

export const BtnStopWatch = (props: props) => {
  return (
    <div>
      {props.status === 0 ? <button onClick={props.start}>Start</button> : ""}

      {props.status === 1 ? (
        <div>
          <button onClick={props.stop}>Stop</button>
          <button onClick={props.reset}>Reset</button>
        </div>
      ) : (
        ""
      )}

      {props.status === 2 ? (
        <div>
          <button onClick={props.resume}>Resume</button>
          <button onClick={props.reset}>Reset</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
