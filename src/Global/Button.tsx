interface props{
    type: "button" | "submit",
    des: string
}

export const Button = (props: props) => {
  return (
    <button className="btn btn-primary" type={ props.type }>
      { props.des }
    </button>
  );
};
