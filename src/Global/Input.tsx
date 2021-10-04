interface props {
  label: string;
  type: string;
  value: string;
  name: string;
  className: string;
  autocomplete?: string
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
          autoComplete={ props.autocomplete }
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};
