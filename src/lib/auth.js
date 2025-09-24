// import * as jose from "jose";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function gerarToken(payload) {
//   return await new jose.SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime("5h")
//     .sign(secret);
// }

// export async function verificarToken(token) {
//   try {
//     if (!token || typeof token !== "string") {
//       return null;
//     }

//     const { payload } = await jose.jwtVerify(
//       token,
//       secret // precisa estar em Uint8Array
//     );

//     return payload;
//   } catch (error) {
//     console.error("Erro ao verificar token:", error);
//     return null;
//   }
// }
