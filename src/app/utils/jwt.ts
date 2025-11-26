import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken =  (payload: { email: string, role: string }, secret: string, expiresIn: string) => {
      const token = jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn
      } as SignOptions);
      return token;
};