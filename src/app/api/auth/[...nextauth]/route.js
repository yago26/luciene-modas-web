import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import db from "@/lib/db";

async function getConsumidorByEmail(email) {
  // fazer função depois
  try {
    const result = await db.query(
      "SELECT * FROM tb_consumidores WHERE email = $1",
      [email]
    );

    const consumidor = result.rows[0];

    return consumidor || null;
  } catch (error) {
    console.error("Erro ao buscar consumidor por email:", error);
    return null;
  }
}

const authOptions = {
  session: {
    strategy: "jwt", // Usar JWT para gerenciamento de sessão
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        });

        const data = await res.json();

        if (res.ok && data.consumidor) {
          return data.consumidor; // Retorna o usuário autenticado
        }
        return null; // Retorna null se não autenticado
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && profile && !user) {
        const existe = await getConsumidorByEmail(profile.email);

        if (existe) {
          token.id = existe.id;
        } else {
          // chamar API de cadastro de consumidores
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signUp`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nome: "Consumidor",
              email: profile.email,
              cep: "",
              genero: "NULL",
              senha: crypto.randomUUID(),
            }),
          });

          const data = await res.json();

          if (!res.ok) {
            return data.error;
          }
        }
      }

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Página de login customizada
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
export { authOptions }; // Para usar em APIs protegidas
