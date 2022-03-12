interface props {
  type: string;
  value: string;
  label: string;
  name: string;
  checked: boolean;
  disabled: boolean
  htmlFor: string;
  id: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Radios = (props: props) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        disabled={ props.disabled }
      />
      <label className="form-check-label" htmlFor={props.htmlFor}>
        {props.label}
      </label>
    </div>
  );
};
