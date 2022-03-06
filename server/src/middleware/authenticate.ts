import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Token from "../interfaces/Token";

const getRequestToken = (req: Request): string | null => {
  const authorizationHeaderValue = req.get("authorization");
  if (
    authorizationHeaderValue &&
    authorizationHeaderValue.toLowerCase().startsWith("bearer ")
  ) {
    return authorizationHeaderValue.substring(7);
  }
  return null;
};

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = getRequestToken(req);
    if (!token) return res.status(401).json({ error: "missing token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.token = decoded as Token;

    return next();
  } catch (err) {
    return res.status(401).json({
      error: "invalid token",
    });
  }
};

export default authenticate;
