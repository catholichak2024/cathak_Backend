import jwt from "jsonwebtoken";
import { response } from "../response.js";
import { status } from "../response.status.js";

export const tokenAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (token == null) {
            return res.send(response(status.EMPTY_TOKEN));
        }
        console.log(token);
        req.decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        next();
    } catch (error) {
        console.log(error);
    }
};

export const generateJWTToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY,
        { expiresIn: "1h",
    });
    return token;
};