import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer>
        <Link href="/">
          <Image
            src=""
            alt="Logo marca Luciene Modas - Roupas e Cosméticos"
            width={150}
            height={50}
          />
        </Link>
        <div className="contatosRodape">
          <h5>Contatos</h5>
          <p>+55 (83) 98728-4758</p>
          <ul>
            <li>
              <a href="https://www.instagram.com/luciene_modas_lm/">
                <Image src="" alt="Instagram" width={30} height={30} />
              </a>
            </li>
            <li>
              <a href="">
                <Image src="" alt="Whatsapp" width={30} height={30} />
              </a>
            </li>
            <li>
              <a href="">
                <Image src="" alt="Facebook" width={30} height={30} />
              </a>
            </li>
          </ul>
        </div>

        <div className="atendimentoRodape">
          <h5>Atendimento</h5>
          <p>Segunda a Sábado (exceto feriados)</p>
          <ul>
            Horários
            <li>8h até 11h</li>
            <li>14h até 17h</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
