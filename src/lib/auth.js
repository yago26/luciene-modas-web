import jwt from "jsonwebtoken";

export function verificarToken(cookie) {
  try {
    const token = cookie.includes("token=")
      ? cookie?.split("token=")[1]?.split(";")[0]
      : cookie;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
    return null;
  }
}
