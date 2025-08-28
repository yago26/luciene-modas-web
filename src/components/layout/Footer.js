import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <div>
          <Link href="/">
            <Image
              src="/favicon/fundo-vinho/android-chrome-192x192.png"
              alt="Logo marca Luciene Modas - Roupas e Cosméticos"
              width={96}
              height={96}
            />
          </Link>
          <div className={style.contatosRodape}>
            <h5>Contatos</h5>
            <p>+55 (83) 98728-4758</p>
            <ul>
              <li>
                <a href="https://www.instagram.com/luciene_modas_lm/">
                  <img
                    src="/footer/instagram.svg"
                    alt="Instagram"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    src="/footer/whatsapp.svg"
                    alt="Whatsapp"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
              <li>
                <a href="/">
                  <img
                    style={{ backgroundColor: "white", borderRadius: "5px" }}
                    src="/footer/facebook.svg"
                    alt="Facebook"
                    width={30}
                    height={30}
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={style.divRodape}>
          <h5>Informações da empresa</h5>
          <ul>
            <li>Sobre a empresa</li>
            <li>Conheça a dona</li>
            <li>Localidade</li>
          </ul>
        </div>

        <div className={style.divRodape}>
          <h5>Ajuda e suporte</h5>
          <ul>
            <li>
              <a href="/">Sobre sua conta</a>
            </li>
            <li>
              <a href="/">Dúvidas mais frequentes</a>
            </li>
          </ul>
        </div>

        <div id={style.atendimentoRodape} className={style.divRodape}>
          <h5>Atendimento ao cliente</h5>
          <ul>
            <p>Localidade</p>
            <li>- Areial-PB, Brasil</li>
            <li>- Rua São José, nº 949, Bairro Centro</li>
          </ul>

          <ul>
            <p>Horários</p>
            <li>Funcionamento: Segunda a Sábado (exceto feriados)</li>
            <li>- Manhã: 8h até 11h</li>
            <li>- Tarde: 14h até 17h</li>
          </ul>
        </div>

        <div className={style.divRodape}>
          <h5>Formas de pagamento</h5>
          <ul>
            <li>PIX</li>
            <li>Cartão de crédito</li>
            <li>Débito</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
