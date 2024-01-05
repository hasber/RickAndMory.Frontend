import React, { ReactNode } from "react";
import "./title.css";

type TTitleProps = {
  variant: "h1" | "h2" | "h3";
  children?: ReactNode;
};

const Title = (props: TTitleProps) => {
  return (
    <props.variant className={props.variant}>{props.children}</props.variant>
  );
};

export default Title;
