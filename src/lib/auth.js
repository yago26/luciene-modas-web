import jwt from "jsonwebtoken";

export function verificarToken(cookie) {
  try {
    const token = cookie?.split("token=")[1]?.split(";")[0];
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}
