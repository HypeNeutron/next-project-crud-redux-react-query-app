import Image from "next/image";

import NotFound from "../../assets/image/404.png";
import NetWorkError from "../../assets/image/500.png";

type TError = { type: "offline"; message?: never };
type TOffline = { type: "error"; message: string };
type TErrorMsg = TError | TOffline;

export default function ShowError({ type, message }: TErrorMsg) {
  return (
    <div className="flex flex-col justify-center text-center my-24 mx-auto w-full ">
      {type === "offline" ? (
        <Image
          src={NetWorkError}
          className="mx-auto sm:w-[25vw]"
          alt="Network or Server Error"
        />
      ) : (
        type === "error" && (
          <Image
            src={NotFound}
            className="mx-auto sm:w-[25vw]"
            alt="404 Not Found"
          />
        )
      )}
      <h3 className="text-xl m-0 mr-10 leading-5 text-indigo-800">
        {message ||
          "Your is offline please check your connection and try again"}
      </h3>
    </div>
  );
}
