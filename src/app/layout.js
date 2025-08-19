import NavBar from "@/components/geral/NavBar";
import Footer from "@/components/geral/Footer";
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
        <div style={{ padding: "12% 10% 5% 10%" }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
