import { useState, useEffect } from "react";

export function useEndereco(form, setForm) {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loadingCep, setLoadingCep] = useState(false);

  // Carrega todos os estados do IBGE
  useEffect(() => {
    fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
      .then((res) => res.json())
      .then((data) => setEstados(data));
  }, []);

  // Quando o estado mudar, carregar cidades
  const carregarCidades = async (uf) => {
    const res = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
    const data = await res.json();
    setCidades(data);
  };

  // Auto-preenchimento via CEP
  const buscarCEP = async (cep) => {
    if (cep.length < 9) return;

    setLoadingCep(true);

    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();

    setLoadingCep(false);

    if (data.erro) return;

    setForm({
      ...form,
      cep,
      estado: data.uf,
      cidade: data.localidade,
      bairro: data.bairro || "",
      rua: data.logradouro || "",
    });

    carregarCidades(data.uf);
  };

  // Busca um CEP válido baseado no Estado e Cidade
  const buscarCEPporCidade = async (estado, cidade) => {
    if (!estado || !cidade) return;

    try {
      const res = await fetch(
        `https://viacep.com.br/ws/${estado}/${cidade}/json/`
      );
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const cepEncontrado = data[0].cep;

        setForm({
          ...form,
          cep: cepEncontrado,
        });
      }
    } catch (error) {
      console.log("Erro ao buscar CEP por cidade:", error);
    }
  };

  return {
    estados,
    cidades,
    buscarCEP,
    carregarCidades,
    buscarCEPporCidade,
    loadingCep,
  };
}
