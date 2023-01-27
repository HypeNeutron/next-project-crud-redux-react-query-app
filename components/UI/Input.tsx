import React from "react";
import { UseFormRegister, ValidationRule } from "react-hook-form";

import { TFormProps } from "../Form";

type InputProps = {
  type?: "text" | "password" | "email";
  placeholder?: string;
  name: keyof TFormProps;
  className?: string;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
  register: UseFormRegister<TFormProps>;
  msg?: string;
  pattern?: ValidationRule<RegExp> | undefined;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLInputElement>;

export default function Input({
  type = "text",
  placeholder,
  name,
  className,
  minLength,
  maxLength,
  register,
  pattern = new RegExp(".*", "i"),
  msg = "this field is required",
  children,
  ...rest
}: InputProps) {
  return (
    <div className="form-control flex items-center">
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...rest}
        {...register(`${name}`, {
          required: msg,
          pattern: pattern,
          minLength: minLength,
          maxLength: maxLength,
        })}
      />
      {children}
    </div>
  );
}
