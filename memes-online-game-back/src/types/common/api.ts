import { RequestHandler as ERequestHandler } from "express";
import * as core from "express-serve-static-core";

export type Response<T> = ERequestHandler<core.ParamsDictionary, any, T>;
