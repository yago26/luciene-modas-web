// import db from "@/lib/db";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//   const { email, senha } = await req.json();

//   try {
//     const result = await db.query(
//       "SELECT * FROM tb_consumidores WHERE email = $1",
//       [email]
//     );

//     const user = result.rows[0];

//     if (!user || !(await bcrypt.compare(senha, user.senha))) {
//       // Erro! Usuário não existe ou Senha incorreta
//       console.log("Credenciais inválidas!");
//       return NextResponse.json(
//         { error: "Credenciais inválidas!" },
//         { status: 401 }
//       );
//     }

//     const token = jwt.sign(
//       {
//         id: user.id,
//         nome: user.nome,
//         email: user.email,
//         cep: user.cep,
//         genero: user.genero,
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: "5h" }
//     );

//     return NextResponse.json(
//       {
//         token,
//         mensagem: "Login feito com sucesso!",
//         usuario: {
//           nome: user.nome,
//           email: user.email,
//           cep: user.cep,
//           genero: user.genero,
//         },
//       },
//       {
//         status: 200,
//         headers: {
//           "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`,
//         },
//       }
//     );
//   } catch (error) {
//     console.log(
//       "Erro ao autenticar um usuário. Provavelmente a aplicação não está conectada ao Banco de Dados do sistema."
//     );
//     return NextResponse.json(
//       { error: "Erro ao autenticar um usuário." },
//       { status: 500 }
//     );
//   }
// }

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, senha } = await req.json();

  try {
    const result = await db.query(
      "SELECT * FROM tb_consumidores WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      console.log("Credenciais inválidas!");
      return NextResponse.json(
        { error: "Credenciais inválidas!" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cep: user.cep,
        genero: user.genero,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    const res = NextResponse.json({
      mensagem: "Login feito com sucesso!",
      usuario: {
        nome: user.nome,
        email: user.email,
        cep: user.cep,
        genero: user.genero,
      },
    });

    // 🔑 jeito correto de setar cookie no Next
    res.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // em dev fica false
      path: "/",
      maxAge: 60 * 60 * 5, // 5 horas (igual ao JWT)
    });

    return res;
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    return NextResponse.json(
      { error: "Erro ao autenticar um usuário." },
      { status: 500 }
    );
  }
}
