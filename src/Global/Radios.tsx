interface props {
  type: string;
  value: string;
  label: string;
  name: string
  checked: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const Radios = (props: props) => {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type={props.type}
        name={ props.name }
        id="flexRadioDefault1"
        value={props.value}
        onChange={props.onChange}
        checked= { props.checked }
      />
      <label className="form-check-label" htmlFor="flexRadioDefault1">
        {props.label}
      </label>
    </div>
  );
};
