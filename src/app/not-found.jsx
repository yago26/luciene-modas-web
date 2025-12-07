import NotFound from "@/components/layout/NotFound";

export default () => {
  return (
    <>
      <NotFound
        titulo="Página não encontrada"
        mensagem="Essa página não existe, volte para a tela inicial."
        caminho="/"
      />
    </>
  );
};
