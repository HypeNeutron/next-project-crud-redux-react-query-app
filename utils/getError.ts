type DataRes = { error?: { message: string }; message: string };
type Err = { response?: { data: DataRes }; message: string } & Error;

type TypePropError =
  | { err: Err | string | null | undefined; res?: never }
  | { err: Err; res: Err & DataRes };

export const getError = ({ err, res }: TypePropError) => {
  let message: string | undefined;
  if (typeof err === "string") return (message = err);

  let dataRes = res?.response?.data;
  if (!res) dataRes = err?.response?.data;
  if (dataRes?.error && dataRes.error.message) message = dataRes.error.message;
  if (dataRes?.message) message = dataRes.message;

  if (!res && err?.message) message = err.message;
  if (res && res?.message) message = res.message;

  // if (typeof dataRes === 'string') return (message = dataRes); // debug only
  if (typeof message === "string" && message.includes("Network Error"))
    message =
      "Something went wrong, Please check your Network connection and try again";
  return message || "Something went wrong, Please try again";
};
