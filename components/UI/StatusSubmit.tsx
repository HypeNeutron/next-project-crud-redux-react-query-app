import { BiCheck } from "react-icons/bi";

type TStatusSubmitProps = { message: string; type: "success" | "error" };

export default function StatusSubmit({ message, type }: TStatusSubmitProps) {
  const bg =
    type === "success"
      ? "border-green-200 bg-green-100"
      : "border-red-200 bg-red-100 mt-3";
  return (
    <div
      className={`flex justify-center items-center mx-auto border ${bg} text-gray-900 py-2 w-3/6`}
    >
      {message}
      {type === "success" ? <BiCheck size={25} color={"#30b324"} /> : ""}
    </div>
  );
}
