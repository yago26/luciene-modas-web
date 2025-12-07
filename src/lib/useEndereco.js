import { useState, useEffect } from "react";

export function useEndereco(form, setForm) {
  const [cidades, setCidades] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    carregarCidades();
  }, []);

  const carregarCidades = async () => {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/PB/municipios`
    );
    const data = await res.json();
    setCidades(data);
  };

  const buscarCEP = async (cep) => {
    if (!cep || cep.length < 8) return;

    setLoadingCep(true);

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    setLoadingCep(false);

    if (!data || data.erro) {
      setForm((prev) => ({
        ...prev,
        cep: "",
      }));
      return false;
    }

    setForm((prev) => ({
      ...prev,
      cidade: data.localidade || "",
      bairro: data.bairro || "",
      rua: data.logradouro || "",
    }));

    return true;
  };

  return {
    cidades,
    buscarCEP,
    carregarCidades,
    loadingCep,
  };
}
