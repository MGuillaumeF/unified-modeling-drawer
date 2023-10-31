import React, { HTMLProps } from "react";
import style from "./BasicInput.scss";

type Props = {
  containerProperties?: HTMLProps<HTMLDivElement>;
  id: string;
  inputProperties?: HTMLProps<HTMLInputElement>;
  label: string;
  labelProperties?: HTMLProps<HTMLLabelElement>;
  name: string;
  type: "email" | "text" | "password" | "number" | "file";
};

const BasicInput = (props: Readonly<Props>) => {
  return (
    <div className={style.BasicInput} {...props.containerProperties}>
      <label htmlFor={props.id} {...props.labelProperties}>
        {props.label}
      </label>
      <input
        name={props.name}
        id={props.id}
        placeholder={props.name}
        type={props.type}
        {...props.inputProperties}
      />
    </div>
  );
};

export default BasicInput;
