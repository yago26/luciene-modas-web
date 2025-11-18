import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import bcrypt from "bcryptjs"; // Necessário para a lógica de Credenciais, se não usar API externa

// --- FUNÇÕES DE BANCO DE DADOS MODULARIZADAS ---

async function getConsumidorByEmail(email) {
  try {
    const result = await db.query(
      "SELECT id, nome, email, role, senha FROM tb_consumidores WHERE email = $1",
      [email]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error("Erro ao buscar consumidor por email:", error);
    return null;
  }
}

async function createNewConsumidor(profile) {
  try {
    const idConsumidor = uuidv4();
    const senhaAleatoria = crypto.randomUUID(); // Usa o bcrypt, que é a biblioteca que sua API de cadastro original usava
    const senha_hash = await bcrypt.hash(senhaAleatoria, 12);
    const role = "cliente"; // 1. INSERIR CONSUMIDOR
    await db.query(
      "INSERT INTO tb_consumidores (id, nome, email, cep, genero, senha, role) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        idConsumidor,
        profile.name || "Consumidor",
        profile.email,
        "00000000",
        "Outro", // Valor padrão
        senha_hash,
        role,
      ]
    ); // 2. INSERIR CARRINHO ASSOCIADO

    const idCarrinho = uuidv4();
    await db.query(
      "INSERT INTO tb_carrinhos (id, id_consumidor) VALUES ($1, $2)",
      [idCarrinho, idConsumidor]
    ); // Retorna o objeto formatado para ser usado no JWT

    return {
      id: idConsumidor,
      name: profile.name,
      email: profile.email,
      role: role,
    };
  } catch (error) {
    console.error("Erro ao criar novo consumidor:", error);
    throw new Error("Falha no cadastro do usuário.");
  }
}

// --- OPÇÕES DE AUTENTICAÇÃO NEXTAUTH ---

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Usamos o PROFILE callback para tratar o cadastro Social de forma eficiente
      async profile(profile) {
        let consumidor = await getConsumidorByEmail(profile.email);
        if (!consumidor) {
          // Se não existe, cria a conta no DB e obtém os dados formatados
          consumidor = await createNewConsumidor(profile);
        } // Retorna o objeto de usuário que será passado ao callback JWT no parâmetro 'user'

        return {
          id: consumidor.id,
          name: consumidor.nome || profile.name,
          email: consumidor.email,
          role: consumidor.role,
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
        // Mantenho a lógica original de chamar a API /api/login, mas o ideal seria
        // incorporar a lógica de verificação de senha (com bcrypt.compare) aqui
        // para máxima eficiência, eliminando o fetch.
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        });
        const data = await res.json();
        return res.ok && data.consumidor ? data.consumidor : null;
      },
    }),
  ],
  callbacks: {
    // O 'user' agora vem populado e formatado do 'profile' ou 'authorize'
    async jwt({ token, user }) {
      if (user) {
        // Adiciona o ID e a ROLE gerados/buscados do DB ao token JWT
        token.id = user.id;
        token.role = user.role; // Outras propriedades úteis (e.g., nome, email)
      }
      return token;
    },
    async session({ session, token }) {
      // Injeta as propriedades do token na sessão do usuário
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
