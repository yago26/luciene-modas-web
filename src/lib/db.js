import { Pool } from "pg";
// Biblioteca externas q faz conexão com o banco de dados do postgres
// Instale a biblioteca com "npm i pg"

export default new Pool({
  connectionString: process.env.POSTGRES_URL,
  /* Configurar na área de variáveis de ambiente, todas as aulas teremos q reconfigurar */
  ssl: {
    /* Questão de segurança, S do HTTPS */
    rejectUnauthorized: false,
  },
});
