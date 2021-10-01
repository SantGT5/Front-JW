interface props {
  des: string;
  className: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = (props: props) => {
  return (
    <div className="form-check form-switch">
      <input
        className={props.className}
        type="checkbox"
        id="flexSwitchCheckChecked"
        onChange={props.onChange}
        checked={props.checked}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
        {props.des}
      </label>
    </div>
  );
};
