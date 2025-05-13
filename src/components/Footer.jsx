import style from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <div className={style.conta}>
          <h5>MINHA CONTA</h5>
          <p className={style.p}>
            <Link href="">Entrar</Link>
          </p>
          <p className={style.p}>
            <Link href="">Cadastrar-se</Link>
          </p>
        </div>
        <div className={style.pagamento}>
          <h5>FORMAS DE PAGAMENTO</h5>
          <p className={style.p}>PIX</p>
          <p className={style.p}>Débito</p>
          <p className={style.p}>Cartão de crédito</p>
        </div>
        <div className={style.midias}>
          <h5>MÍDIAS SOCIAIS</h5>
        </div>
        <div className={style.atendimentoHorario}>
          <h5>HORÁRIO DE ATENDIMENTO</h5>
          <p className={style.p}>Segunda a Sábado</p>
          <p className={style.p}>07:00 às 12:00</p>
          <p className={style.p}>14:00 às 17:00</p>
        </div>
        <div className={style.atendimentoEndereco}>
          <h5>ENDEREÇO</h5>
          <p className={style.p}>Rua São José, Nº XXXX, Bairro Centro</p>
          <p className={style.p}>Areial/PB - CEP: 58140-000</p>
        </div>
        <div className={style.contato}>
          <h5>INFORMAÇÕES DE CONTATO</h5>
          <p className={style.p}>Email: lucieneinp@gmail.com</p>
          <p className={style.p}>Nº de Telefone: +55 (83) 98728-4758</p>
        </div>
      </footer>
    </>
  );
}
