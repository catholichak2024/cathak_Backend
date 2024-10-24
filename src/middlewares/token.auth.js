import jwt from "jsonwebtoken";
import { response } from "../response.js";
import { status } from "../response.status.js";

export const tokenAuth = (req, res, next) => {
    try {
        const header = req.headers["authorization"] || req.headers["Authorization"];
        const token = header && header.split(" ")[1];

        if (token == null) {
        return res.send(response(status.EMPTY_TOKEN));
        }

        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            console.log("req", req);
            console.log("req.user", req.user);
            if (error) {
                return res.send(response(status.FORBIDDEN));
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.log(error);
    }
};

export const generateJWTToken = (userId) => {
    console.log("유저아이디", userId);
    return jwt.sign({ userId: userId, provider: "EveryGrade" }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3h",
    });
  };