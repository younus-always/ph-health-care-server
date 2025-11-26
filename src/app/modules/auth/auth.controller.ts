import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";
import { setAuthCookie } from "../../utils/cookie";

const login = catchAsync(async (req: Request, res: Response) => {
      const result = await AuthService.login(req.body);
      const { accessToken, refreshToken, needPasswordChange } = result;

      setAuthCookie(res, {
            cookieName: "accessToken",
            accessToken
      });
      setAuthCookie(res, {
            cookieName: "refreshToken",
            refreshToken
      });

      sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User logged in successfully",
            data: { needPasswordChange }
      })
});


export const AuthController = {
      login
};