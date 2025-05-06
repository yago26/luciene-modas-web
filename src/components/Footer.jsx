import style from "./footer.module.css";

export function Footer() {
  return (
    <>
      <footer>
        <div className={style.conta}>
          <h5>Minha Conta</h5>
        </div>
        <div className={style.pagamento}>
          <h5>Formas de Pagamento</h5>
        </div>
        <div className={style.midias}>
          <h5>Mídias Sociais</h5>
        </div>
        <div className={style.atendimentoHorario}>
          <h5>Horário de atendimento</h5>
          <p>Segunda a Sábado</p>
          <p>07:00 às 12:00</p>
          <p>14:00 às 17:00</p>
        </div>
        <div className={style.atendimentoEndereco}>
          <h5>Endereço</h5>
          <p>Rua São José, Nº XXXX, Centro</p>
          <p>Areial/PB - CEP: 58140-000</p>
        </div>
      </footer>
    </>
  );
}
