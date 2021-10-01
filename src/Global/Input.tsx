interface props {
  label: string;
  type: string;
  value: string;
  name: string;
  className: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = (props: props) => {
  return (
    <div>
      <label>{props.label}</label>
      <div className="input-group input-group-lg">
        <input
          className={props.className}
          type={props.type}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
