import { Pool } from "pg";
// Biblioteca externa q faz a conexão com o banco de dados do postgreSQL
// Instale a biblioteca com "npm i pg"

export default new Pool({
  connectionString: process.env.POSTGRES_URL,
  /* Configurar na área de variáveis de ambiente, todas as aulas teremos q reconfigurar */
  ssl: {
    /* Questão de segurança, S do HTTPS */
    rejectUnauthorized: false,
  },
});
