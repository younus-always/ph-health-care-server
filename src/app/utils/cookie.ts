import { Response } from "express";

interface ITokenInfo {
      cookieName: string;
      accessToken?: string;
      refreshToken?: string
}

export const setAuthCookie = (res: Response, tokenInfo: ITokenInfo) => {
      if (tokenInfo.cookieName === "accessToken") {
            res.cookie("accessToken", tokenInfo.accessToken, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                  maxAge: 1000 * 60 * 60
            });
      }
      if (tokenInfo.cookieName === "refreshToken") {
            res.cookie("refreshToken", tokenInfo.refreshToken, {
                  httpOnly: true,
                  secure: true,
                  sameSite: "none",
                  maxAge: 1000 * 60 * 60 * 24 * 90
            });
      }
}