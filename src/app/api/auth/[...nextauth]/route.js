import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import bcrypt from "bcryptjs"; // Necessário para a lógica de Credenciais, se não usar API externa

// --- FUNÇÕES DE BANCO DE DADOS MODULARIZADAS ---

async function getUsuarioByEmail(email) {
  try {
    const result = await db.query(
      "SELECT id, nome, email, role, senha FROM usuarios WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar usuário por email:", error);
    return null;
  }
}

async function createNewUsuario(profile) {
  try {
    const idUsuario = uuidv4();
    const senhaAleatoria = crypto.randomUUID(); // Usa o bcrypt, que é a biblioteca que sua API de cadastro original usava
    const senha_hash = await bcrypt.hash(senhaAleatoria, 12);
    const role = "consumidor";
    await db.query(
      "INSERT INTO usuarios (id, nome, email, senha, role) VALUES ($1, $2, $3, $4, $5)",
      [idUsuario, profile.name || "Consumidor", profile.email, senha_hash, role]
    ); // 2. INSERIR CARRINHO ASSOCIADO

    const idCarrinho = uuidv4();
    await db.query("INSERT INTO carrinhos (id, id_usuario) VALUES ($1, $2)", [
      idCarrinho,
      idUsuario,
    ]); // Retorna o objeto formatado para ser usado no JWT

    return {
      id: idUsuario,
      name: profile.name,
      email: profile.email,
      role: role,
    };
  } catch (error) {
    console.error("Erro ao criar novo usuário:", error);
    throw new Error("Falha no cadastro do usuário.");
  }
}

// --- OPÇÕES DE AUTENTICAÇÃO NEXTAUTH ---

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60,
    updateAge: 20 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Usamos o PROFILE callback para tratar o cadastro Social de forma eficiente
      async profile(profile) {
        let usuario = await getUsuarioByEmail(profile.email);
        if (!usuario) {
          // Se não existe, cria a conta no DB e obtém os dados formatados
          usuario = await createNewUsuario(profile);
        } // Retorna o objeto de usuário que será passado ao callback JWT no parâmetro 'user'

        return {
          id: usuario.id,
          name: usuario.nome || profile.name,
          email: usuario.email,
          role: usuario.role,
        };
      },
    }),

    CredentialsProvider({
      name: "Luciene Modas",
      credentials: {
        email: { label: "E-mail", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        });
        const data = await res.json();
        return res.ok && data.usuario ? data.usuario : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions };
