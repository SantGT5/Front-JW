interface props{
    type: "button" | "submit",
    des: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button = (props: props) => {
  return (
    <button className="btn btn-primary" type={ props.type } onClick={ props.onClick }>
      { props.des }
    </button>
  );
};
