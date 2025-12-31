import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/layout/Footer";
import "antd/dist/reset.css";
import "./globals.css";

export const metadata = {
  title: "Luciene Modas",
  description:
    "Luciene Modas consiste em uma loja de roupas e cosméticos voltada para moda, beleza e autocuidado para todos os públicos, desde homens e mulheres até crianças.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <NavBar />
        <div style={style.container}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}

const style = {
  container: {
    padding: "calc(18dvh + 10dvh) 10% 10dvh 10%",
    minHeight: "100vh",
  },
};
