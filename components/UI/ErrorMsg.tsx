import { FieldError, Merge } from "react-hook-form";

export default function ErrorMsg({
  errors,
}: {
  errors: FieldError | Merge<FieldError, FieldError>;
}) {
  return <div className="text-red-500 w-1/2 ">{errors.message}</div>;
}
