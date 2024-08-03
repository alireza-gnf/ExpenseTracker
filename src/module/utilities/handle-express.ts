import { Response } from "express";
import { HttpError } from "./http-error";

export const handleExpress = async <A>(
  res: Response,
  code: number,
  fn: () => Promise<A>
) => {
  try {
    const data = await fn();
    res.status(code).send({ data });
  } catch (e) {
    if (e instanceof HttpError) res.status(e.code).send(e.message);
  }
};
