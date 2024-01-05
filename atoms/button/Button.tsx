import React from "react";
import "./button.css"

const Button = (props: any) => {
  return (
    <button className="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
