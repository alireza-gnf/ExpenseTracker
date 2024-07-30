import { Response } from "express";
import { HttpError } from "./http-error";
import { ZodError, ZodTypeAny } from "zod";

export const handleExpress = <A>(res: Response, fn: () => A) => {
  try {
    const data = fn();
    res.status(200).send({ data });
  } catch (e) {
    if (e instanceof HttpError) res.status(e.code).send({ message: e.message });

    res.status(500).send({ message: "Internal Server Error!" });
  }
};

export const parseExpress = (
  res: Response,
  dtoSchema: ZodTypeAny,
  dto: any
) => {
  try {
    return dtoSchema.parse(dto);
  } catch (e) {
    if (e instanceof ZodError) {
      res.status(400).send({ message: e.errors });
      return;
    }
    res.status(500).send({ message: "Internal Server Error!" });
  }
};
