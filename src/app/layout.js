import Footer from "@/components/Footer";

export const metadata = {
  title: "Luciene Modas",
  description:
    "Luciene Modas consiste em uma loja de roupas e cosméticos voltada para moda, beleza e autocuidado para todos os públicos, desde homens e mulheres até crianças.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
